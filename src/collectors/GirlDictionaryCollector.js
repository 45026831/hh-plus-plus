/* global girlsDataList, eventGirls, clubChampionsData */
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
        rewardsSets.forEach(collectFromRewards)
    }
}
const collectFromAjaxResponseLeagues = (response) => {
    const {rewards} = response
    if (!rewards) {return}
    const {list} = rewards
    if (list) {
        list.forEach(collectFromRewards)
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
        if (Helpers.isCurrentPage('clubs')) {
            GirlDictionaryCollector.collectFromClubChamp()
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
        if (Helpers.isCurrentPage('season')) {
            GirlDictionaryCollector.collectFromSeasons()
        }
        if (Helpers.isCurrentPage('tower-of-fame')) {
            GirlDictionaryCollector.collectFromLeague()
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
            const rarity = girl.rarity
            const girlData = {
                name,
                shards,
                class: girlClass,
                rarity
            }
            if (name) {
                girlDictionary.set(girlId, girlData)
                updated = true
            }
        })
    }

    static collectFromEventWidget () {
        eventGirls.forEach(({id_girl: id, name, shards, class: girlClass, rarity}) => {
            if (shards === undefined) {
                shards = 100
            }
            if (name) {
                girlDictionary.set(id, {name, shards, class: parseInt(girlClass, 10), rarity})
                updated = true
            }
        })
    }

    static collectFromClubChamp () {
        if (!window.clubChampionsData) {
            return
        }

        const {shards: rewardShards} = clubChampionsData.reward

        if (!rewardShards || !rewardShards.length) {
            return
        }

        const {id_girl, name, previous_value: shards, girl_class, rarity} = rewardShards[0]

        girlDictionary.set(id_girl, {name, shards, class: parseInt(girl_class, 10), rarity})
        updated = true
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

    static collectFromSeasons () {
        Helpers.onAjaxResponse(/action=claim/i, collectFromAjaxResponseSingular)
    }

    static collectFromLeague () {
        Helpers.onAjaxResponse(/action=claim_rewards/i, collectFromAjaxResponseLeagues)
    }
}

export default GirlDictionaryCollector
