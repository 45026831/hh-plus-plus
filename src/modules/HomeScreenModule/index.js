/* global server_now_ts, HHTimers, GT */

import CoreModule from '../CoreModule'
import Helpers from '../../common/Helpers'
import { lsKeys } from '../../common/Constants'
import I18n from '../../i18n'
import pantheonIcon from '../../assets/pantheon.svg'

import styles from './styles.lazy.scss'
import AvailableFeatures from '../../common/AvailableFeatures'
import Sheet from '../../common/Sheet'

const {$} = Helpers

const MODULE_KEY = 'homeScreen'

class HomeScreenModule extends CoreModule {
    constructor () {
        super({
            baseKey: MODULE_KEY,
            label: I18n.getModuleLabel('config', MODULE_KEY),
            default: true,
            subSettings: [
                {
                    key: 'leaguePos',
                    label: I18n.getModuleLabel('config', `${MODULE_KEY}_leaguePos`),
                    default: false
                }
            ]
        })
        this.label = I18n.getModuleLabel.bind(this, MODULE_KEY)
    }

    shouldRun () {
        return Helpers.isCurrentPage('home')
    }

    run ({leaguePos}) {
        if (this.hasRun || !this.shouldRun()) {return}

        styles.use()

        Helpers.defer(() => {
            this.checkHomeScreenType()

            this.injectCSSVars()
            this.addTimers()
            this.addShortcuts()
            this.fixMissionsTimer()
            this.forceActivitiesTab()
            this.manageSalaryTimers()

            if (leaguePos) {
                this.addLeaguePos()
            }
        })

        this.hasRun = true
    }

    checkHomeScreenType () {
        this.newHomeScreen = !!$('.main-container').length
    }

    injectCSSVars () {
        Sheet.registerVar('pantheon-icon', `url("${pantheonIcon}")`)
        Sheet.registerVar('champions-icon', `url("${Helpers.getCDNHost()}/design/menu/ic_champions.svg")`)
    }

    setNotification(type, notification) {
        if (this.newHomeScreen) {
            window.notificationData[type] = notification
        } else {
            window.notificationData[type].push(notification)
        }
        window.displayNotifications()
    }

    addTimers () {
        // Market
        const marketInfo = Helpers.lsGet(lsKeys.MARKET_INFO)
        if (marketInfo) {
            const {refreshTime} = marketInfo
            if (refreshTime > server_now_ts) {
                this.attachTimer('shop', refreshTime)
            }
        }

        const trackedTimes = Helpers.lsGet(lsKeys.TRACKED_TIMES)
        if (!trackedTimes) {
            return
        }
        // Pachinko
        if (trackedTimes.gp && trackedTimes.gp > server_now_ts) {
            this.attachTimer('pachinko', trackedTimes.gp)
        }

        // Champions
        if (trackedTimes.champ && trackedTimes.champ > server_now_ts) {
            this.attachTimer('sex-god-path', trackedTimes.champ)
        }

        // Club Champ
        if (trackedTimes.clubChamp && trackedTimes.clubChamp > server_now_ts) {
            this.attachTimer('clubs', trackedTimes.clubChamp)
        }
    }

    makeLinkSelector(rel) {
        if (this.newHomeScreen) {
            return `[rel=${rel}] > .notif-position > span`
        }
        return `[rel=${rel}] > .position > span`
    }

    attachTimer (rel, endAt) {
        const selector = this.makeLinkSelector(rel)
        const onComplete = () => {
            this.setNotification(rel, 'action')
        }
        const $container = $('<div class="script-timer-container"></div>')
        const $elm = $('<div class="script-home-timer"></div>')
        $container.append('<span class="timerClock_icn"></span>')
        $container.append($elm)

        $(selector).append($container)
        HHTimers.initDecTimer($elm, endAt - server_now_ts, onComplete)
    }

    addShortcuts () {
        const shortcutHtml = (className, href, title, iconClass) => `<a class="round_blue_button script-home-shortcut script-home-shortcut-${className}" href="${href}" hh_title="${title}"><div class="${iconClass}"></div></a>`

        // Club champ
        if (window.Chat_vars && (window.Chat_vars.CLUB_ID || (window.Chat_vars.CLUB_INFO && window.Chat_vars.CLUB_INFO.id_club))) {
            // is in club
            const $clubShortcuts = $('<div class="script-home-shortcut-container"></div>')
            $clubShortcuts.append(shortcutHtml('club-champ', '/club-champion.html', this.label('clubChamp'), 'clubChampions_flat_icn'))

            if (this.newHomeScreen) {
                const $wrapper = $('<div class="quest-container"></div>')
                $('a[rel="clubs"]').wrap($wrapper).after($clubShortcuts)
            } else {
                $('a[rel="clubs"] .position').prepend($clubShortcuts)
            }
        }

        const {champs, pantheon} = AvailableFeatures

        if (champs || pantheon) {
            const $godShortcuts = $('<div class="script-home-shortcut-container"></div>')
            // Champs
            if (champs) {
                $godShortcuts.append(shortcutHtml('champs', '/champions-map.html', GT.design.Champions, 'champions_flat_icn'))
            }

            // Pantheon
            if (pantheon) {
                $godShortcuts.append(shortcutHtml('pantheon', '/pantheon.html', GT.design.pantheon, 'pantheon_flat_icn'))
            }

            if (this.newHomeScreen) {
                const $wrapper = $('<div class="quest-container"></div>')
                $('a[rel="sex-god-path"]').wrap($wrapper).after($godShortcuts)
            } else {
                $('a[rel="sex-god-path"] .position').prepend($godShortcuts)
            }
        }
    }

    fixMissionsTimer () {
        if (this.newHomeScreen) {
            return
        }

        const {missions_datas} = window
        if (!missions_datas) {return}

        const {duration, remaining_time, next_missions} = missions_datas

        const existingTimers = ['#home_missions_bar1', '#home_missions_bar2']
        const findAndRemoveTimer = selector => {
            const existingTimer = Object.values(HHTimers.timers).find(timer => timer.$elm && timer.$elm.selector === selector)

            if (existingTimer) {
                existingTimer.$elm.hide()
                existingTimer.destroy()
            }
        }

        existingTimers.forEach(findAndRemoveTimer)
        new MutationObserver(() => {
            existingTimers.forEach(findAndRemoveTimer)
        }).observe(document.getElementById('homepage'), {childList:true})

        const completedText = this.label('missionsReady')
        let text = completedText
        let useTimer = false
        let barWidth = 100
        let timerDuration = 1
        let remaining = 0
        let rewardOnComplete = true

        if (remaining_time) {
            text = this.label('completeIn')
            useTimer = true
            barWidth = 100 * (duration - remaining_time) / duration
            timerDuration = duration
            remaining = remaining_time
        } else if (next_missions) {
            text = this.label('newMissionsIn')
            useTimer = true
            const day = 24 * 60 * 60
            barWidth = 100 * (day - next_missions) / day
            timerDuration = day
            remaining = next_missions
            rewardOnComplete = false
        }

        const $newBar = $(`
            <div id="home_missions_bar-script">
                <div class="hh_bar finish_in_bar">
                    <div class="backbar borderbar">
                        <div class="frontbar ${useTimer ? 'pinkbar' : 'bluebar'}" style="width: ${barWidth}%"></div>
                    </div>
                    <div class="text">${text}<span></span></div>
                </div>
            </div>
        `)

        $('[rel=activities]').after($newBar)

        if (useTimer) {
            const onComplete = () => {
                $newBar.find('.text').text(completedText)
                $newBar.find('.pinkbar').addClass('bluebar').removeClass('pinkbar')
                if (rewardOnComplete) {
                    window.notificationData.activities.push('reward')
                    window.displayNotifications()
                }
            }
            const noop = ()=>{}
            const dummyElm = {show: noop, hide: noop, selector: ''}
            const oldMobileCheck = window.is_mobile_size
            window.is_mobile_size = () => false
            HHTimers.initBarTimer(timerDuration, remaining, dummyElm, {barElm: $newBar.find('.frontbar'), textElm: $newBar.find('div.text>span')}, onComplete)
            window.is_mobile_size = oldMobileCheck
        }
    }

    forceActivitiesTab () {
        $('a[rel=activities]').attr('href', '/activities.html?tab=missions')
    }

    aggregateSalaries () {
        const {GirlSalaryManager, GT, format_time_short} = window
        const {girlsMap} = GirlSalaryManager

        const aggregated = {}
        let collectableNow = 0

        Object.values(girlsMap).forEach(({readyForCollect, gData}) => {
            const {salary, pay_in} = gData
            if (readyForCollect) {
                collectableNow += salary
            } else {
                if (!aggregated[pay_in]) {
                    aggregated[pay_in] = 0
                }
                aggregated[pay_in] += salary
            }
        })

        const payTimes = Object.keys(aggregated)

        if (!payTimes.length) {return}

        const sortedPayTimes = payTimes.sort((a,b) => a-b)

        const text = `${payTimes.length > 10 ? '…' : ''}<table><tbody>${sortedPayTimes.slice(0,10).sort((a,b) => b-a).map(time => `<tr><td>${GT.design.more_in.replace('+1', `+${I18n.nThousand(aggregated[time])} <span cur="soft_currency"></span>`)} </td><td>${format_time_short(time)}</td></tr>`).join('')}</tbody></table>`

        return {aggregated, collectableNow, text}
    }

    manageSalaryTimers () {
        const {GirlSalaryManager, is_mobile, is_tablet, TooltipManager, Tooltip, GT} = window
        const isMobile = is_mobile && is_mobile() || is_tablet && is_tablet()

        const handleTooltip = (target) => {
            const aggregateSalaries = this.aggregateSalaries()
            if (!aggregateSalaries) {return}
            const {text} = aggregateSalaries

            const wrappedText = `<div class="script-salary-summary">${text}</div>`

            let newTooltip = new Tooltip($(target),'',wrappedText)
            TooltipManager.initNewTooltip(target, newTooltip)

            if (!this.salaryTimerHacked && GirlSalaryManager.updateHomepageTimer) {
                const existingUpdate = GirlSalaryManager.updateHomepageTimer.bind(GirlSalaryManager)
                GirlSalaryManager.updateHomepageTimer = () => {
                    const $container = $('.script-salary-summary')
                    if ($container.length) {
                        const aggregateSalaries = this.aggregateSalaries()
                        if (aggregateSalaries) {
                            const {text} = aggregateSalaries
                            $container.html(text)
                        } else {
                            $container.html(GT.design.full)
                        }
                    }
                    return existingUpdate()
                }

                this.salaryTimerHacked = true
            }
        }

        $('#collect_all').append('<span class="script-event-handler-hack"></span>')

        TooltipManager.initTooltipType(isMobile, '#collect_all, #collect_all .script-event-handler-hack', false, handleTooltip)
    }

    addLeaguePos () {
        const $leaguePos = $('<div class="script-league-pos"></div>')
        $('[rel=leaderboard]').wrap('<div class="quest-container"></div>').after($leaguePos)

        window.$.ajax({
            url: '/tower-of-fame.html',
            success: (data) => {
                let leaguesListItem
                let leagueTag

                const playerID = window.Hero.infos.id

                const leaguesListPattern = new RegExp(`leagues_list.push\\( ?(?<leaguesListItem>{"id_player":"${playerID}".*}) ?\\);`)
                const leagueTagPattern = /league_tag = (?<leagueTag>[1-9]);/

                new DOMParser().parseFromString(data, 'text/html').querySelectorAll('script[type="text/javascript"]').forEach(element => {
                    const {textContent} = element
                    if (!textContent) {return}
                    if (textContent.includes('leagues_list')) {
                        const matches = textContent.match(leaguesListPattern)
                        if (matches && matches.groups) {
                            leaguesListItem = JSON.parse(matches.groups.leaguesListItem)
                        }
                    }
                    if (textContent.includes('league_tag')) {
                        const matches = textContent.match(leagueTagPattern)
                        if (matches && matches.groups) {
                            leagueTag = matches.groups.leagueTag
                        }
                    }
                })

                if (!leaguesListItem || !leagueTag) {return}
                const {place} = leaguesListItem

                $leaguePos.append(`<div class="script-league-icon script-league-rank script-league-rank-digits-${`${place}`.length}" style="background-image: url(${Helpers.getCDNHost()}/leagues/${leagueTag}.png);">${place}</div>`)
            }
        })
    }
}

export default HomeScreenModule
