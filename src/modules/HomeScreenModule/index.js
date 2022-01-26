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
            this.injectCSSVars()
            this.addTimers()
            this.addShortcuts()
            this.fixMissionsTimer()
        })

        this.hasRun = true
    }

    injectCSSVars () {
        Sheet.registerVar('pantheon-icon', `url("${pantheonIcon}")`)
        Sheet.registerVar('champions-icon', `url("${Helpers.getCDNHost()}/design/menu/ic_champions.svg")`)
    }

    addTimers () {
        // Market
        const marketInfo = Helpers.lsGet(lsKeys.MARKET_INFO)
        if (marketInfo) {
            const {refreshTime} = marketInfo
            if (refreshTime > server_now_ts) {
                const $elm = $('<div class="script-home-timer"></div>')
                $('[rel=shop] > .position > span').append($elm)
                HHTimers.initDecTimer($elm, refreshTime - server_now_ts)
            }
        }

        const trackedTimes = Helpers.lsGet(lsKeys.TRACKED_TIMES)
        if (!trackedTimes) {
            return
        }
        // Pachinko
        if (trackedTimes.gp && trackedTimes.gp > server_now_ts) {
            const $elm = $('<div class="script-home-timer"></div>')
            $('[rel=pachinko] > .position > span').append($elm)
            HHTimers.initDecTimer($elm, trackedTimes.gp - server_now_ts)
        }

        // Champions
        if (trackedTimes.champ && trackedTimes.champ > server_now_ts) {
            const $elm = $('<div class="script-home-timer"></div>')
            $('[rel=sex-god-path] > .position > span').append($elm)
            HHTimers.initDecTimer($elm, trackedTimes.champ - server_now_ts)
        }

        // Club Champ
        if (trackedTimes.clubChamp && trackedTimes.clubChamp > server_now_ts) {
            const $elm = $('<div class="script-home-timer"></div>')
            $('[rel=clubs] > .position > span').append($elm)
            HHTimers.initDecTimer($elm, trackedTimes.clubChamp - server_now_ts)
        }
    }

    addShortcuts () {
        const shortcutHtml = (className, href, title, iconClass) => `<a class="round_blue_button script-home-shortcut script-home-shortcut-${className}" href="${href}" hh_title="${title}"><div class="${iconClass}"></div></a>`

        // Club champ
        if (window.Chat_vars && window.Chat_vars.CLUB_ID) {
            // is in club
            const $clubShortcuts = $('<div class="script-home-shortcut-container"></div>')
            $('a[rel=clubs] .position').prepend($clubShortcuts)
            $clubShortcuts.append(shortcutHtml('club-champ', '/club-champion.html', this.label('clubChamp'), 'clubChampions_flat_icn'))
        }

        const {champs, pantheon} = AvailableFeatures

        if (champs || pantheon) {
            const $godShortcuts = $('<div class="script-home-shortcut-container"></div>')
            $('a[rel="sex-god-path"] .position').prepend($godShortcuts)
            // Champs
            if (champs) {
                $godShortcuts.append(shortcutHtml('champs', '/champions-map.html', GT.design.Champions, 'champions_flat_icn'))
            }

            // Pantheon
            if (pantheon) {
                $godShortcuts.append(shortcutHtml('pantheon', '/pantheon.html', GT.design.pantheon, 'pantheon_flat_icn'))
            }
        }
    }

    fixMissionsTimer () {
        const {missions_datas} = window
        if (!missions_datas) {return}

        const {duration, remaining_time, next_missions} = missions_datas

        const existingTimer = Object.values(HHTimers.timers).find(timer => timer.$elm.selector === '#home_missions_bar1')

        if (existingTimer) {
            existingTimer.$elm.hide()
            existingTimer.destroy()
        }

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
}

export default HomeScreenModule
