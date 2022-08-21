import { lsKeys } from '../common/Constants'
import Helpers from '../common/Helpers'

const DEFAULT_BOOSTERS = {normal: [], mythic:[]}

const getClubXPBonus = () => {
    const clubStatus = Helpers.lsGet(lsKeys.CLUB_STATUS)

    if (clubStatus) {
        return clubStatus.upgrades.experience_gain.bonus
    } else if (Helpers.isInClub()) {
        return 0.1
    } else {
        return 0
    }
}

class BoosterStatusCollector {

    static collect () {

        Helpers.defer(() => {
            if (Helpers.isCurrentPage('shop')) {
                BoosterStatusCollector.collectFromMarket()
            }

            BoosterStatusCollector.collectFromAjaxResponses()
            BoosterStatusCollector.collectFromHeroUpdate()
        })
    }

    static collectFromAjaxResponses () {
        Helpers.onAjaxResponse(/(action|class)/, (response, opt) => {
            const boosterStatus = Helpers.lsGet(lsKeys.BOOSTER_STATUS) || DEFAULT_BOOSTERS

            const searchParams = new URLSearchParams(opt.data)
            const mappedParams = ['action', 'class', 'type', 'id_m_i', 'id_item', 'number_of_battles', 'battles_amount'].map(key => ({[key]: searchParams.get(key)})).reduce((a,b)=>Object.assign(a,b),{})
            const {action, class: className, type, id_m_i, id_item, number_of_battles, battles_amount} = mappedParams
            const {success} = response

            if (!success) {
                return
            }

            if (action === 'use' && className === 'Item' && type === 'booster') {
                const idItemParsed = parseInt(id_item)
                const isMythic = idItemParsed >= 632 && idItemParsed <= 638

                let boosterData
                $(`.booster .slot[id_item=${id_item}]`).each((i,el)=>{
                    const data = $(el).data('d')
                    if (!boosterData && data.id_m_i.includes(id_m_i)) {
                        boosterData = data
                    }
                })


                if (boosterData) {
                    const clonedData = {...boosterData}

                    if (clonedData.id_m_i.length > 1) {
                        clonedData.id_m_i = [id_m_i]
                    }
                    if (isMythic) {
                        boosterStatus.mythic.push({...clonedData, usages_remaining: `${clonedData.usages}`})
                    } else {
                        boosterStatus.normal.push({...clonedData, endAt: response.lifetime})
                    }

                    Helpers.lsSet(lsKeys.BOOSTER_STATUS, boosterStatus)
                    $(document).trigger('boosters:equipped', {id_item, id_m_i, isMythic})
                }
                return
            }

            let sandalwood, allMastery, headband, watch, cinnamon, perfume
            boosterStatus.mythic.forEach(booster => {
                switch (booster.identifier){
                case 'MB1':
                    sandalwood = booster
                    break
                case 'MB2':
                    allMastery = booster
                    break
                case 'MB3':
                    headband = booster
                    break
                case 'MB4':
                    watch = booster
                    break
                case 'MB5':
                    cinnamon = booster
                    break
                case 'MB7':
                    perfume = booster
                    break
                }
            })

            if (sandalwood && action === 'do_battles_trolls') {
                const isMultibattle = parseInt(number_of_battles) > 1
                const {rewards} = response
                if (rewards && rewards.data && rewards.data.shards) {
                    let drops = 0
                    rewards.data.shards.forEach(({previous_value, value}) => {
                        if (isMultibattle) {
                            // Can't reliably determine how many drops, assume MD where each drop would be 1 shard.
                            const shardsDropped = value - previous_value
                            drops += Math.floor(shardsDropped/2)
                        } else {
                            drops++
                        }
                    })
                    sandalwood.usages_remaining -= drops
                }
            }

            if (allMastery && (action === 'do_battles_leagues' || action === 'do_battles_seasons')) {
                allMastery.usages_remaining -= parseInt(number_of_battles)
            }

            if (headband && (action === 'do_battles_pantheon' || action === 'do_battles_trolls')) {
                headband.usages_remaining -= parseInt(number_of_battles)
            }

            if (watch && className === 'TeamBattle') {
                watch.usages_remaining -= parseInt(battles_amount)
            }

            if (cinnamon && action === 'do_battles_seasons') {
                cinnamon.usages_remaining -= parseInt(number_of_battles)
            }

            if (perfume && action === 'start' && className === 'TempPlaceOfPower') {
                perfume.usages_remaining--
            }

            boosterStatus.mythic = boosterStatus.mythic.filter(({usages_remaining}) => usages_remaining > 0)

            Helpers.lsSet(lsKeys.BOOSTER_STATUS, boosterStatus)
            $(document).trigger('boosters:updated-mythic')
        })
    }

    static collectFromHeroUpdate() {
        const originalHeroUpdate = window.Hero.update.bind(window.Hero)
        const hookedUpdate = (field, value, add) => {
            if (field === 'xp') {
                const boosterStatus = Helpers.lsGet(lsKeys.BOOSTER_STATUS) || DEFAULT_BOOSTERS

                const travelMemories = boosterStatus.mythic.find(({identifier}) => identifier==='MB6')

                if (travelMemories) {
                    const {cur: oldValue, level} = window.Hero.infos.Xp

                    let atmBonus = 0.05
                    if (level < 300) {
                        atmBonus = 0.2
                    }
                    const clubBonus = getClubXPBonus()

                    const diff = value - oldValue
                    const extra = Math.ceil(Math.floor(diff/(1+clubBonus+atmBonus))*atmBonus)

                    travelMemories.usages_remaining -= extra

                    boosterStatus.mythic = boosterStatus.mythic.filter(({usages_remaining}) => usages_remaining > 0)
                    Helpers.lsSet(lsKeys.BOOSTER_STATUS, boosterStatus)
                    $(document).trigger('boosters:updated-mythic')
                }
            }

            return originalHeroUpdate(field, value, add)
        }
        window.Hero.update = hookedUpdate
    }

    static collectFromMarket () {
        const activeSlots = $('#equiped .booster .slot:not(.empty):not(.mythic)').map((i, el)=> $(el).data('d')).toArray()
        const activeMythicSlots = $('#equiped .booster .slot:not(.empty).mythic').map((i, el)=> $(el).data('d')).toArray()

        const {server_now_ts} = window
        const boosterStatus = {
            normal: activeSlots.map((data) => ({...data, endAt: server_now_ts + data.expiration})),
            mythic: activeMythicSlots,
        }

        Helpers.lsSet(lsKeys.BOOSTER_STATUS, boosterStatus)
    }

}

export default BoosterStatusCollector
