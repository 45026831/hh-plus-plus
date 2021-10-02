/* global girlsDataList, eventGirls */
import Helpers from '../common/Helpers'

let girlDictionary
let updated

const collectFromRewards = (rewards) => {
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
const collectFromAjaxResponseSingular = (response) => {
    const {rewards} = response
    collectFromRewards(rewards)
}
const collectFromAjaxResponsePlural = (response) => {
    const {rewards: rewardsSets} = response
    if (rewardsSets) {
        rewardsSets.forEach(rewards => collectFromRewards(rewards))
    }
}

class GirlDictionaryCollector {
    static collect () {
        updated = false
        girlDictionary = Helpers.getGirlDictionary()
        if (Helpers.isCurrentPage('harem')) {
            GirlDictionaryCollector.collectFromHarem()
        }
        if (Helpers.isCurrentPage('event')) {
            GirlDictionaryCollector.collectFromEventWidget()
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
        if (Helpers.isCurrentPage('home')) {
            GirlDictionaryCollector.collectFromRewardsQueue()
        }
        if (updated) {
            Helpers.setGirlDictionary(girlDictionary)
        }
    }

    static collectFromHarem () {
        Object.entries(girlsDataList).forEach(([girlId, girl]) => {
            const name = girl['Name']
            const shards = (girl['shards'] !== undefined) ? girl['shards'] : 100
            const girlClass = parseInt(girl['class'], 10)
            const girlData = {
                name,
                shards,
                class: girlClass
            }
            if (name) {
                girlDictionary.set(girlId, girlData)
                updated = true
            }
        })
    }

    static collectFromEventWidget () {
        eventGirls.forEach(({id_girl: id, name, shards, class: girlClass}) => {
            if (shards === undefined) {
                shards = 100
            }
            if (name) {
                girlDictionary.set(id, {name, shards, class: parseInt(girlClass, 10)})
                updated = true
            }
        })
    }

    static collectFromBattleResult () {
        Helpers.onAjaxResponse(/action=do_(league|season|troll)_battles/i, collectFromAjaxResponseSingular)
    }

    static collectFromPachinkoRewards () {
        Helpers.onAjaxResponse(/action=play/i, collectFromAjaxResponseSingular)
    }

    static collectFromContestRewards () {
        Helpers.onAjaxResponse(/action=give_reward/i, collectFromAjaxResponseSingular)
    }

    static collectFromChampions () {
        Helpers.onAjaxResponse(/class=TeamBattle/i, (response) => {
            const {end} = response
            if (end) {
                collectFromAjaxResponseSingular(end)
            }
        })
    }

    static collectFromRewardsQueue () {
        Helpers.onAjaxResponse(/action=process_rewards_queue/i, collectFromAjaxResponsePlural)
    }
}

export default GirlDictionaryCollector
