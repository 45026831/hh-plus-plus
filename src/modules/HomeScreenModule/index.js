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
            default: true
        })
        this.label = I18n.getModuleLabel.bind(this, MODULE_KEY)
    }

    shouldRun () {
        return Helpers.isCurrentPage('home')
    }

    run () {
        if (this.hasRun || !this.shouldRun()) {return}

        styles.use()

        Helpers.defer(() => {
            this.checkHomeScreenType()

            this.injectCSSVars()
            this.addTimers()
            this.addShortcuts()
            this.fixMissionsTimer()
            this.forceActivitiesTab()
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
}

export default HomeScreenModule
