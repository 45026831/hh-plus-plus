import { lsKeys } from '../common/Constants'
import Helpers from '../common/Helpers'

class SidequestStatusCollector {
    static collect () {
        SidequestStatusCollector.init()
        if (Helpers.isCurrentPage('side-quests')) {
            Helpers.defer(SidequestStatusCollector.collectFromSidequests)
        } else if (Helpers.isCurrentPage('home')) {
            Helpers.defer(SidequestStatusCollector.collectFromHome)
        } else if (Helpers.isCurrentPage('quest')) {
            Helpers.defer(() => {
                const sidequestStatus = Helpers.lsGet(lsKeys.SIDEQUEST_STATUS)
                if (sidequestStatus && sidequestStatus.continueLink && Helpers.isCurrentPage(sidequestStatus.continueLink)) {
                    SidequestStatusCollector.collectFromActiveSidequest(sidequestStatus)
                }
            })
        }
    }

    static init() {
        const sidequestStatus = Helpers.lsGet(lsKeys.SIDEQUEST_STATUS)
        if (!sidequestStatus) {
            Helpers.lsSet(lsKeys.SIDEQUEST_STATUS, {energySpendAvailable: true})
        }
    }

    static collectFromSidequests () {
        let energySpendAvailable = false
        let continueLink
        $('#side_quests .side-quest').each((i,el) => {
            const $el = $(el)

            if ($el.has('.Continue').length || $el.has('.Begin').length) {
                const {rewards} = $el.find('.side-quest-rewards').data('reward-display')
                const xpReward = rewards.find(({type})=>type==='xp')
                if (xpReward) {
                    energySpendAvailable = true
                    continueLink = $el.find('a.Continue, a.Begin').attr('href')
                    return false
                }
            }
        })

        Helpers.lsSet(lsKeys.SIDEQUEST_STATUS, {energySpendAvailable, continueLink})
    }

    static collectFromActiveSidequest (sidequestStatus) {
        const checkAtEnd = () => {
            const $controls = $('#controls')
            if ($controls.find('#end_play').length || $controls.find('#archive-back').length || $controls.find('#archive-next').length) {
                sidequestStatus.continueLink = null
                Helpers.lsSet(lsKeys.SIDEQUEST_STATUS, sidequestStatus)
            }
        }

        checkAtEnd()
        new MutationObserver(checkAtEnd).observe(document.getElementById('controls'), {childList: true})
    }

    static collectFromHome () {
        if ($('[rel=map] .button-notification-new').length) {
            const sidequestStatus = Helpers.lsGet(lsKeys.SIDEQUEST_STATUS)
            if (sidequestStatus && !sidequestStatus.energySpendAvailable) {
                sidequestStatus.energySpendAvailable = true
                Helpers.lsSet(lsKeys.SIDEQUEST_STATUS, sidequestStatus)
            }
        }
    }
}

export default SidequestStatusCollector
