/* global girlsDataList */
import Helpers from '../common/Helpers'

let girlDictionary
let updated

const collectFromAjaxResponse = (response) => {
    const {rewards} = response
    if (rewards && rewards.data && rewards.data.shards) {
        girlDictionary = Helpers.getGirlDictionary()
        rewards.data.shards.forEach(({id_girl, value}) => {
            const girlId = `${id_girl}`
            const girl = girlDictionary.get(girlId) || {}
            girl.shards = Math.min(value, 100)
            girlDictionary.set(girlId, girl)
        })
        Helpers.setGirlDictionary(girlDictionary)
    }
}

class GirlDictionaryCollector {
    static collect () {
        updated = false
        girlDictionary = Helpers.getGirlDictionary()
        if (Helpers.isCurrentPage('harem')) {
            GirlDictionaryCollector.collectFromHarem()
        }
        if (Helpers.isCurrentPage('battle')) {
            GirlDictionaryCollector.collectFromBattleResult()
        }
        if (Helpers.isCurrentPage('pachinko')) {
            GirlDictionaryCollector.collectFromPachinkoRewards()
        }
        if (Helpers.isCurrentPage('activities')) {
            GirlDictionaryCollector.collectFromContestRewards()
        }
        if (Helpers.isCurrentPage('champion')) {
            GirlDictionaryCollector.collectFromChampions()
        }
        if (updated) {
            Helpers.setGirlDictionary(girlDictionary)
        }
    }

    static collectFromHarem () {
        Object.entries(girlsDataList).forEach(([girlId, girl]) => {
            const name = girl['Name']
            const shards = (girl['shards'] !== undefined) ? parseInt(girl['shards']) : 100
            const girl_class = parseInt(girl['class'], 10)
            const girlData = {
                name,
                shards,
                class: girl_class
            }
            if (name) {
                girlDictionary.set(girlId, girlData)
                updated = true
            }
        })
    }

    static collectFromEventWidget () {
        // TODO
    }

    static collectFromBattleResult () {
        Helpers.onAjaxResponse(/action=do_(league|season|troll)_battles/i, collectFromAjaxResponse)
    }

    static collectFromPachinkoRewards () {
        Helpers.onAjaxResponse(/action=play/i, collectFromAjaxResponse)
    }

    static collectFromContestRewards () {
        Helpers.onAjaxResponse(/action=give_reward/i, collectFromAjaxResponse)
    }

    static collectFromChampions () {
        Helpers.onAjaxResponse(/class=TeamBattle/i, (response) => {
            const {end} = response
            if (end) {
                collectFromAjaxResponse(end)
            }
        })
    }
}

export default GirlDictionaryCollector
