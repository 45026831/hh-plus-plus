/* global event_girls, server_now_ts */
import { lsKeys } from '../common/Constants'
import Helpers from '../common/Helpers'

class EventVillainsCollector {
    static collect() {
        Helpers.defer(() => {
            EventVillainsCollector.clean()
            if (Helpers.hasSearch('tab=event')) {
                EventVillainsCollector.collectFromEvent(lsKeys.EVENT_TIME, lsKeys.EVENT_VILLAINS)
            }
            if (Helpers.hasSearch('tab=mythic_event')) {
                EventVillainsCollector.collectFromEvent(lsKeys.MYTHIC_EVENT_TIME, lsKeys.MYTHIC_EVENT_VILLAINS)
            }
        })
    }

    static clean() {
        const eventEndTime = Helpers.lsGetRaw(lsKeys.EVENT_TIME) || 0
        const mythicEventEndTime = Helpers.lsGetRaw(lsKeys.MYTHIC_EVENT_TIME) || 0

        const now = server_now_ts
        if (now > eventEndTime) {
            Helpers.lsRm(lsKeys.EVENT_VILLAINS)
            Helpers.lsRm(lsKeys.EVENT_TIME)
        }

        if (now > mythicEventEndTime) {
            Helpers.lsRm(lsKeys.MYTHIC_EVENT_VILLAINS)
            Helpers.lsRm(lsKeys.MYTHIC_EVENT_TIME)
        }
    }

    static collectFromEvent(eventTimeKey, eventVillainsKey) {
        const eventRemainingTime = $('#contains_all #events .nc-panel-header .nc-pull-right #timer').data('seconds-until-event-end')
        const eventEndTime = server_now_ts + eventRemainingTime
        Helpers.lsSetRaw(eventTimeKey, eventEndTime)

        const eventTrolls = []

        event_girls.forEach(girl => {
            const { id_girl: id, source, rarity } = girl
            if (source.name !== 'event_troll') {
                return
            }
            const sourceUrl = source.anchor_source.url
            const matches = sourceUrl.match(/id_opponent=([0-9]+)/)
            if (matches) {
                const troll = matches[1]
                eventTrolls.push({ id: `${id}`, troll, rarity })
            }
        })
        Helpers.lsSet(eventVillainsKey, eventTrolls)
    }
}

export default EventVillainsCollector
