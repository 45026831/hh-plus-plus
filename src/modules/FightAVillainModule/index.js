/* global Hero */
import CoreModule from '../CoreModule'
import Helpers from '../../common/Helpers'
import I18n from '../../i18n'
import VILLAINS from '../../data/Villains'
import { lsKeys } from '../../common/Constants'

import styles from './styles.lazy.scss'

const MODULE_KEY = 'villain'
class FightAVillainModule extends CoreModule {
    constructor () {
        super({
            baseKey: MODULE_KEY,
            label: I18n.getModuleLabel('config', MODULE_KEY),
            default: true,
            subSettings: [
                {
                    key: 'tiers',
                    label: I18n.getModuleLabel('config', `${MODULE_KEY}_tiers`),
                    default: true
                }
            ]
        })
        this.label = I18n.getModuleLabel.bind(this, MODULE_KEY)
    }

    run ({tiers}) {
        if (this.hasRun) {
            return
        }
        styles.use()
        this.injectCSS()

        Helpers.defer(() => {

            const villainsSet = VILLAINS[Helpers.getGameKey()]

            const eventTrolls = Helpers.lsGet(lsKeys.EVENT_VILLAINS) || []
            const mythicEventTrolls = Helpers.lsGet(lsKeys.MYTHIC_EVENT_VILLAINS) || []
            const girlDictionary = Helpers.getGirlDictionary()

            //Add the actual menu
            const currentWorld = Hero.infos.questing.id_world

            const menuHtml = `
                <div class="TrollsMenu" id="TrollsID">
                    ${villainsSet.filter(villain => villain.world <= currentWorld).map(({key, girls, world, gems, items}) => {
        let tiersSuffix = ''
        if (tiers) {
            const haveGirl = idGirl => (girlDictionary.get(idGirl) && girlDictionary.get(idGirl).shards === 100)
            const tier1 = girls[1].some(idGirl => !haveGirl(idGirl)) ? '&#185;' : ''
            const tier2 = girls[2].some(idGirl => !haveGirl(idGirl)) ? '&#178;' : ''
            const tier3 = girls[3].some(idGirl => !haveGirl(idGirl)) ? '&#179;' : ''
            const tiers = `${tier1}${tier2}${tier3}`
            tiersSuffix = ` ${tiers}${tiers.length ? ' ' : ''}`
        }
        let gemsSuffix = ''
        if (gems) {
            gemsSuffix = gems.map(element => `<img class='villain_gem' src="${Helpers.getCDNHost()}/pictures/design/gems/${element}.png" />`).join('')
        }
        let itemSuffix = ''
        if (items) {
            itemSuffix = items.map(item => `<img class='villain_item' src="${Helpers.getCDNHost()}/pictures/items/${item}.png" />`).join('')
        }
        const rewardsSuffix = `<div class="villain_rewards">${gemsSuffix}${itemSuffix}</div>`
        const label = `${key ? this.label(key) : this.label('fallback', {world})}${tiersSuffix}${rewardsSuffix}`
        let type = 'regular'
        const villainId = `${world - 1}`
        const eventTrollGirl = eventTrolls.find(({troll}) => troll === villainId)
        if (eventTrollGirl) {
            const {id, rarity} = eventTrollGirl
            const dictGirl = girlDictionary.get(id)
            const owned = dictGirl ? dictGirl.shards === 100 : false
            if (!owned) {
                type = `eventTroll ${rarity}`
            }
        }
        const mythicTrollGirl = mythicEventTrolls.find(({troll}) => troll === villainId)
        if (mythicTrollGirl) {
            const dictGirl = girlDictionary.get(mythicTrollGirl.id)
            const owned = dictGirl ? dictGirl.shards === 100 : false
            if (!owned) {
                type = 'mythicEventTroll'
            }
        }
        return `<a class="${type}" href="/troll-pre-battle.html?id_opponent=${villainId}">${label}</a>`
    }).join('')}
                </div>
            `

            $('#contains_all > header').children('[type=fight]').append(menuHtml.replace(/ {4}/g, '').replace(/\n/g, ''))
        })

        this.hasRun = true
    }

    injectCSS () {
        this.insertRule(`
            .TrollsMenu {
                font-weight: ${Helpers.isCxH() ? '800' : '400'};
            }
        `)
    }
}

export default FightAVillainModule
