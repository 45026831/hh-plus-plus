/* global Hero, HHTimers, GT, server_now_ts */
import CoreModule from '../CoreModule'
import Helpers from '../../common/Helpers'
import I18n from '../../i18n'

import styles from './styles.lazy.scss'
import Sheet from '../../common/Sheet'
import { lsKeys } from '../../common/Constants'
import AvailableFeatures from '../../common/AvailableFeatures'

const {$} = Helpers

const MODULE_KEY = 'resourceBars'

const makeEnergyBarHTML = ({type, timeForSinglePoint, timeOnLoad, iconClass, currentVal, max, shortcutLink, fullIn}, label) => {
    let tooltip
    if (fullIn > 0) {
        const fullAt = server_now_ts + fullIn
        const formattedDate = `<span class=&quot;orange&quot;>${new Date(fullAt * 1000).toLocaleTimeString(I18n.getLang(), {hour: '2-digit', minute: '2-digit'})}</span>`
        tooltip = label('fullAt', {time: formattedDate})
    } else {
        tooltip = `<span class=&quot;orange&quot;>${GT.design.Full}</span>`
    }
    return `
        <div class="energy_counter" type="${type}" id="canvas_${type}_energy">
            <div class="energy_counter_bar">
                <div class="energy_counter_icon"><span generic-tooltip="${tooltip}" class="${iconClass}"></span></div>
                <a href="${shortcutLink}">
                    <div class="bar-wrapper">
                        <div class="bar red" style="width:${100*Math.min(currentVal,max)/max}%"></div>
                        <div class="over">
                            <div class="energy_counter_amount">
                                <span energy>${currentVal}</span>/<span rel="max">${max}</span>
                            </div>
                            <span rel="count_txt" timeforsinglepoint="${timeForSinglePoint}" ${currentVal >= max ? 'style="display:none;"' : `timeonload="${timeOnLoad}"`}>
                                ${GT.design.more_in} <span rel="count"></span>
                            </span>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    `
}

const CIRCULAR_THRESHOLDS = {
    1: 'green',
    0.5: 'yellow',
    0.2: 'red'
}

class ResourceBarsModule extends CoreModule {
    constructor () {
        super({
            baseKey: MODULE_KEY,
            label: I18n.getModuleLabel('config', MODULE_KEY),
            default: true
        })
        this.label = I18n.getModuleLabel.bind(this, MODULE_KEY)

        this.activeBoosters = {}
    }

    shouldRun () {
        return true
    }

    run () {
        if (this.hasRun || !this.shouldRun()) {return}

        styles.use()

        Helpers.defer(() => {
            this.injectCSSVars()
            this.forceTimerInterval()
            this.addEnergyBarShortcut()
            this.addQuestAndFightTooltips()
            this.addAdditionalBars()
            this.addPoPTimer()
            this.addBoosterStatus()
        })

        this.hasRun = true
    }

    injectCSSVars () {
        Sheet.registerVar('challenge-token-icon', `url("${Helpers.getCDNHost()}/league_points.png")`)
    }

    forceTimerInterval () {
        HHTimers.thresholdSec = 24*60*60
        HHTimers.thresholdTenSec = 36*30*60

        const existingTimers = [...HHTimers.timersListMin, ...HHTimers.timersListTenSec]
        HHTimers.timersListMin = []
        HHTimers.timersListTenSec = []

        HHTimers.timersListSec.push(...existingTimers)
    }

    addEnergyBarShortcut () {
        let shortcutLink

        const questLink = Hero.infos.questing.current_url
        const sidequestStatus = Helpers.lsGet(lsKeys.SIDEQUEST_STATUS)
        if (questLink.includes('quest')) {
            shortcutLink = questLink
        } else if (sidequestStatus && sidequestStatus.energySpendAvailable && sidequestStatus.continueLink) {
            shortcutLink = sidequestStatus.continueLink
        } else if (sidequestStatus && sidequestStatus.energySpendAvailable) {
            shortcutLink = '/side-quests.html'
        } else {
            shortcutLink = '/champions-help.html'
        }

        $('.energy_counter[type=quest] .bar-wrapper').wrap(`<a href="${shortcutLink}"></a>`)
    }

    addQuestAndFightTooltips () {
        Object.entries({
            quest: 'hudEnergy_mix_icn',
            fight: 'hudBattlePts_mix_icn'
        }).forEach(([type, mixin]) => {
            const {recharge_time} = Hero.energies[type]

            let label
            if (recharge_time > 0) {
                const fullAt = recharge_time + server_now_ts
                const formattedDate = `<span class="orange">${new Date(fullAt * 1000).toLocaleTimeString(I18n.getLang(), {hour: '2-digit', minute: '2-digit'})}</span>`
                label = this.label('fullAt', {time: formattedDate})
            } else {
                label = `<span class="orange">${GT.design.Full}</span>`
            }
            $(`header .energy_counter[type=${type}] .${mixin}`).attr('generic-tooltip', label)
        })
    }

    addAdditionalBars () {
        const barTypes = [
            {type: 'kiss', feature: 'seasons', iconClass: 'hudKiss_mix_icn', shortcutLink: '/season-arena.html'},
            {type: 'challenge', feature: 'leagues', iconClass: 'hudChallenge_mix_icn', shortcutLink: '/tower-of-fame.html'},
            {type: 'worship', feature: 'pantheon', iconClass: 'hudWorship_mix_icn', shortcutLink: '/pantheon.html'},
        ]

        let $elemToAppendAfter = $('header .energy_counter[type=fight]')

        barTypes.forEach(({type, feature, iconClass, shortcutLink}) => {
            if (!AvailableFeatures[feature]) {
                const $dummySpacer = $(`<div class="script-bar-spacer" type="${type}" id="canvas_${type}_energy"></div>`)
                $elemToAppendAfter.after($dummySpacer)
                $elemToAppendAfter = $dummySpacer
                return
            }

            const {amount, max_amount, seconds_per_point, next_refresh_ts, recharge_time} = Hero.energies[type]

            const $barHTML = $(makeEnergyBarHTML({type, iconClass, shortcutLink, currentVal: amount, max: max_amount, timeForSinglePoint: seconds_per_point, timeOnLoad: next_refresh_ts, fullIn: recharge_time}, this.label))

            $elemToAppendAfter.after($barHTML)
            $elemToAppendAfter = $barHTML

            if (amount < max_amount) {
                const timer = HHTimers.initEnergyTimer($(`header .energy_counter[type="${type}"]`))

                if (!Hero.c) {
                    Hero.c = {}
                }
                if (!Hero.c[type]) {
                    Hero.c[type] = timer
                }
            }

            if (type==='challenge' && !Helpers.isCurrentPage('tower-of-fame')) {
                window.hasMultipleLeagueBattles = false
            }
        })
    }

    addPoPTimer () {
        if (!AvailableFeatures.pop) {
            return
        }

        const times = Helpers.lsGet(lsKeys.TRACKED_TIMES)

        let popEndIn = 0
        let popDuration = 1
        let formattedDate

        if (times && times.pop) {
            popEndIn = Math.max(times.pop - server_now_ts, 0)
            popDuration = times.popDuration
            formattedDate = `<span class=&quot;orange&quot;>${new Date(times.pop * 1000).toLocaleTimeString(I18n.getLang(), {hour: '2-digit', minute: '2-digit'})}</span>`
        }

        const barWidth = 100 * (popDuration - popEndIn) / popDuration


        const $barHTML = $(`
            <a class="script-pop-timer" href="/activities.html?tab=pop">
                <div class="hh_bar finish_in_bar">
                    <div class="backbar borderbar" ${formattedDate ? `generic-tooltip="${this.label('readyAt', {time: formattedDate})}"` : ''}>
                        <div class="frontbar pinkbar" style="width: ${barWidth}%"></div>
                    </div>
                    <div class="text">${popEndIn > 0 ? this.label('popsIn', {time: `<span>${window.format_time_short(popEndIn)}</span>`}) : this.label('popsReady')}</div>
                </div>
            </a>
        `)

        $('header .currency').before($barHTML)

        if (popEndIn > 0) {
            const onComplete = () => {
                $barHTML.find('.text').text(this.label('popsReady'))
            }
            const noop = ()=>{}
            const dummyElm = {show: noop, hide: noop, selector: ''}
            const oldMobileCheck = window.is_mobile_size
            window.is_mobile_size = () => false
            HHTimers.initBarTimer(popDuration, popEndIn, dummyElm, {barElm: $barHTML.find('.frontbar'), textElm: $barHTML.find('div.text>span')}, onComplete)
            window.is_mobile_size = oldMobileCheck
        }
    }

    addBoosterStatus() {
        const boosterStatus = Helpers.lsGet(lsKeys.BOOSTER_STATUS) || {normal: [], mythic: []}

        boosterStatus.normal = boosterStatus.normal.filter(({endAt}) => endAt > server_now_ts)

        Object.keys(boosterStatus).forEach(key => {
            if (boosterStatus[key].length < 3) {
                // fill the rest with empty
                boosterStatus[key] = [...boosterStatus[key], ...Array(3-boosterStatus[key].length).fill({empty:true})]
            }
        })

        const $boosterStatusHTML = $('<a class="script-booster-status" href="/shop.html?type=booster"></a>')

        const buildNormalSlot = (data) => {
            const {empty, id_item, identifier, rarity, endAt} = data
            if (empty) {
                return '<div class="slot empty"></div>'
            }
            data.expiry = endAt - server_now_ts
            const formattedDate = new Date(endAt * 1000).toLocaleTimeString(I18n.getLang(), {hour: '2-digit', minute: '2-digit'}).replace(/(\d)/g, (x)=>`${x}<i></i>`)
            return $(`
                <div class="slot ${rarity}" id_item="${id_item}" data-d="${JSON.stringify(data).replace(/"/g, '&quot;')}" additional-tooltip-info="${JSON.stringify({additionalText: `<span class="script-tooltip"></span>${this.label('endAt', { time: formattedDate })}`}).replace(/"/g, '&quot;')}">
                    <img src="${Helpers.getCDNHost()}/pictures/items/${identifier}.png"/>
                </div>`)
        }
        const buildMythicSlot = (data) => {
            const {empty, id_item, identifier} = data
            if (empty) {
                return '<div class="slot mythic empty"></div>'
            }
            return $(`
                <div class="slot mythic" id_item="${id_item}" data-d="${JSON.stringify(data).replace(/"/g, '&quot;')}" additional-tooltip-info="${JSON.stringify({additionalText: '<span class="script-tooltip"></span>'}).replace(/"/g, '&quot;')}">
                    <img src="${Helpers.getCDNHost()}/pictures/items/${identifier}.png"/>
                </div>
            `)
        }
        const buildProgressWrapper = (current, max, useTimer) => {
            const percentage = Math.min(current/max, 1)
            const firstHalf = Math.min(percentage, 0.5) * 2
            const secondHalf = Math.max(percentage - 0.5, 0) * 2

            let colorClass = ''

            if (percentage > 0) {
                Object.entries(CIRCULAR_THRESHOLDS).forEach(([threshold, className]) => {
                    if (percentage <= threshold) {
                        colorClass = className
                    }
                })
            }

            const $wrapper = $(`
                <div class="circular-progress">
                    <div class="circle">
                        <div class="circle-bar left">
                            <div class="progress ${colorClass}" style="transform: rotate(${180 * secondHalf}deg)"></div>
                        </div>
                        <div class="circle-bar right">
                            <div class="progress ${colorClass}" style="transform: rotate(${180 * firstHalf}deg)"></div>
                        </div>
                        ${useTimer ? '<div class="dummy-timer-target" style="display: none;"></div>' : ''}
                    </div>
                </div>
            `)

            if (useTimer) {
                let timerId
                const onComplete = () => {
                    $wrapper.find('.slot').attr('class', 'slot empty').empty().attr('data-d', '').attr('tooltip-id', '').attr('id_item', '')
                    $wrapper.find('.progress').css('transform', 'rotate(0deg)')
                }
                const onUpdate = () => {
                    if (!timerId) {
                        return
                    }
                    const timer = HHTimers.timers[timerId]
                    const remainingTime = timer.remainingTime

                    const percentage = remainingTime/max
                    const firstHalf = Math.min(percentage, 0.5) * 2
                    const secondHalf = Math.max(percentage - 0.5, 0) * 2

                    if (percentage > 0) {
                        Object.entries(CIRCULAR_THRESHOLDS).forEach(([threshold, className]) => {
                            if (percentage <= threshold) {
                                colorClass = className
                            }
                        })
                    }

                    const $left = $wrapper.find('.left .progress')
                    const $right = $wrapper.find('.right .progress')
                    $left.css('transform', `rotate(${180 * secondHalf}deg)`).attr('class', `progress ${colorClass}`)
                    $right.css('transform', `rotate(${180 * firstHalf}deg)`).attr('class', `progress ${colorClass}`)
                }
                timerId = HHTimers.initDecTimer($wrapper.find('.dummy-timer-target'), current, onComplete, onUpdate)
            }

            return $wrapper
        }
        const buildSlotAndAddTooltip = (buildSlot, data, replaceEmpty) => {
            const {empty, rarity, id_m_i: idmiList, usages, usages_remaining, duration, endAt} = data
            const $slot = buildSlot(data)
            let current = 0
            let max = 1
            let useTimer = false
            const isMythic = rarity === 'mythic'

            if (!empty) {
                if (isMythic) {
                    current = usages_remaining
                    max = usages
                } else {
                    current = endAt - server_now_ts
                    max = duration
                    useTimer = true
                }
            }

            const $progressWrapper = buildProgressWrapper(current, max, useTimer)
            $progressWrapper.prepend($slot)

            if (replaceEmpty) {
                $boosterStatusHTML.find(`.circular-progress:has(.empty${isMythic? '.mythic':':not(.mythic)'})`).first().replaceWith($progressWrapper)
            } else {
                $boosterStatusHTML.append($progressWrapper)
            }

            if (!empty && isMythic) {
                const [id_m_i] = idmiList
                this.activeBoosters[id_m_i] = $progressWrapper
            }
        }

        boosterStatus.normal.forEach(data => {
            buildSlotAndAddTooltip(buildNormalSlot, data)
        })
        boosterStatus.mythic.forEach(data => {
            buildSlotAndAddTooltip(buildMythicSlot, data)
        })

        $('header .currency').before($boosterStatusHTML)

        $(document).on('boosters:equipped', (event, {id_item, id_m_i, isMythic}) => {
            const boosterStatus = Helpers.lsGet(lsKeys.BOOSTER_STATUS) || {normal: [], mythic: []}

            const newBoosterData = boosterStatus[isMythic ? 'mythic' : 'normal'].find(data=>data.id_item===id_item&&data.id_m_i.includes(id_m_i))

            if (newBoosterData) {
                const $slotToReplace = $boosterStatusHTML.find(`.slot.empty${isMythic ? '.mythic' : ':not(.mythic)'}`)
                if ($slotToReplace.length) {
                    buildSlotAndAddTooltip(isMythic ? buildMythicSlot : buildNormalSlot, newBoosterData, true)
                } else {
                    // wat
                    console.log('somehow equipped a new equip but have no empty slot????')
                }
            } else {
                console.log('can\'t find data in LS for new booster with idmi', id_m_i, 'and itemid', id_item)
            }
        })

        $(document).on('boosters:updated-mythic', () => {
            const boosterStatus = Helpers.lsGet(lsKeys.BOOSTER_STATUS) || {normal: [], mythic: []}

            const boostersByIdmi = {}
            boosterStatus.mythic.forEach(data => boostersByIdmi[data.id_m_i[0]] = data)

            Object.entries(this.activeBoosters).forEach(([id_m_i, $elem]) => {
                const updatedData = boostersByIdmi[id_m_i]

                if (!updatedData) {
                    // Booster has expired
                    $elem.find('.slot').attr('class', 'slot mythic empty').empty().attr('data-d', '').attr('tooltip-id', '').attr('id_item', '')
                    $elem.find('.progress').css('transform', 'rotate(0deg)')
                } else {
                    const {usages, usages_remaining} = updatedData
                    const percentage = Math.min(usages_remaining/usages, 1)
                    const firstHalf = Math.min(percentage, 0.5) * 2
                    const secondHalf = Math.max(percentage - 0.5, 0) * 2
                    let colorClass = 'green'

                    if (percentage > 0) {
                        Object.entries(CIRCULAR_THRESHOLDS).forEach(([threshold, className]) => {
                            if (percentage <= threshold) {
                                colorClass = className
                            }
                        })
                    }

                    const $left = $elem.find('.left .progress')
                    const $right = $elem.find('.right .progress')
                    $left.css('transform', `rotate(${180 * secondHalf}deg)`).attr('class', `progress ${colorClass}`)
                    $right.css('transform', `rotate(${180 * firstHalf}deg)`).attr('class', `progress ${colorClass}`)
                    const $slot = $elem.find('.slot')
                    $slot.attr('data-d', JSON.stringify(updatedData))
                    $slot.data('d', updatedData)
                }
            })
        })

        new MutationObserver(() => {
            // Nasty hack. Wish there was a better way of setting a custom class on a tooltip
            $('.hh_tooltip_new:has(.script-tooltip)').addClass('script-booster-status-item')
        }).observe(document.body, {childList: true})
    }
}

export default ResourceBarsModule
