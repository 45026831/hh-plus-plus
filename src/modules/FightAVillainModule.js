/* global Hero */
import Helpers from '../common/Helpers'
import HHModule from './HHModule'
import I18n from '../i18n'
import VILLAINS from '../data/Villains'
import { lsKeys } from '../common/Constants'

class FightAVillainModule extends HHModule {
    constructor () {
        const configSchema = {
            baseKey: 'villain',
            label: I18n.getModuleLabel('config', 'villain'),
            default: true,
            subSettings: [
                {
                    key: 'tiers',
                    label: I18n.getModuleLabel('config', 'villain_tiers'),
                    default: true
                }
            ]
        }
        super({
            group: 'core',
            name: 'villain',
            configSchema
        })
        this.label = I18n.getModuleLabel.bind(this, 'villain')
        this.sheet = Helpers.getSheet()
        this.insertedRules = []
    }

    run ({tiers}) {
        if (this.hasRun) {
            return
        }
        this.injectCSS()

        const villainsSet = VILLAINS[Helpers.getGameKey()]

        const eventTrolls = Helpers.lsGet(lsKeys.EVENT_VILLAINS) || []
        const mythicEventTrolls = Helpers.lsGet(lsKeys.MYTHIC_EVENT_VILLAINS) || []
        const girlDictionary = Helpers.getGirlDictionary()

        //Add the actual menu
        const currentWorld = Hero.infos.questing.id_world

        const menuHtml = `
            <div class="TrollsMenu" id="TrollsID">
                ${villainsSet.filter(villain => villain.world <= currentWorld).map(({key, girls, world}) => {
        let tiersSuffix = ''
        if (tiers) {
            const haveGirl = idGirl => (girlDictionary.get(idGirl) && girlDictionary.get(idGirl).shards === 100)
            const tier1 = girls[1].some(idGirl => !haveGirl(idGirl)) ? '&#185;' : ''
            const tier2 = girls[2].some(idGirl => !haveGirl(idGirl)) ? '&#178;' : ''
            const tier3 = girls[3].some(idGirl => !haveGirl(idGirl)) ? '&#179;' : ''
            tiersSuffix = ` ${tier1}${tier2}${tier3}`
        }
        const label = `${key ? this.label(key) : this.label('fallback', {world})}${tiersSuffix}`
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

        //CSS

        this.hasRun = true
    }

    injectCSS () {
        this.insertRule(`
            .TrollsMenu {
                position: absolute;
                z-index: 35;
                display: none;
                border-radius: 0px 0px 8px 8px;
                background-color: rgba(0,0,0,.8);
                box-shadow: 0 0 0 1px rgba(255,255,255,0.73);
                font-weight: ${Helpers.isCxH() ? '800' : '400'};
                letter-spacing: .22px;
                color: #fff;
                text-align: center;
                opacity: 0;
                visibility: hidden;
                transition: opacity 400ms, visibility 400ms;
                grid-gap: 7px;
                padding-top: 5px;
                padding-bottom: 5px;
            }
        `)

        this.insertRule(Helpers.mediaDesktop(`
            .TrollsMenu {
                width: 88%;
                margin: 34px 0 0 34px;
                font-size: 14px;
                line-height: 18px;
            }
        `))

        this.insertRule(Helpers.mediaMobile(`
            .TrollsMenu {
                width: 200%;
                margin: 64px 0 0 -79px;
                font-size: 16px;
                line-height: 22px;
                grid-template-columns: 1fr 1fr;
                grid-auto-flow: row;
            }
        `))

        this.insertRule(Helpers.mediaMobile(`
            .TrollsMenu > a {
                padding-top: 10px;
                padding-bottom: 10px;
            }
        `))

        this.insertRule(`
            .energy_counter:hover > .TrollsMenu {
                opacity: 1;
                display: grid;
                visibility: visible;
            }
        `)

        this.insertRule('#TrollsID a {'
                         + 'color: rgb(255, 255, 255); '
                         + 'text-decoration: none;}'
        )

        this.insertRule('#TrollsID a:hover {'
                         + 'color: rgb(255, 247, 204); '
                         + 'text-decoration: underline;}'
        )

        this.insertRule('.TrollsMenu a {'
                         + 'color: rgb(255, 255, 255); '
                         + 'text-decoration: none;}'
        )

        this.insertRule('.eventTroll {'
                         + 'color: #f70 !important;}'
        )

        this.insertRule('.eventTroll:hover {'
                         + 'color: #fa0 !important;}'
        )

        this.insertRule('.eventTroll.common {'
                         + 'color: #8d8e9f !important;}'
        )

        this.insertRule('.eventTroll.common:hover {'
                         + 'color: #b4b5c9 !important;}'
        )

        this.insertRule('.eventTroll.rare {'
                         + 'color: #23b56b !important;}'
        )

        this.insertRule('.eventTroll.rare:hover {'
                         + 'color: #2bdf84 !important;}'
        )

        this.insertRule('.eventTroll.epic {'
                         + 'color: #ffb244 !important;}'
        )

        this.insertRule('.eventTroll.epic:hover {'
                         + 'color: #ffc97b !important;}'
        )

        this.insertRule('.eventTroll.legendary {'
                         + 'color: #9370db !important;}'
        )

        this.insertRule('.eventTroll.legendary:hover {'
                         + 'color: #b19cd9 !important;}'
        )

        this.insertRule('.mythicEventTroll {'
                         + 'color: #ec0039 !important;}'
        )

        this.insertRule('.mythicEventTroll:hover {'
                         + 'color: #ff003e !important;}'
        )

    }

    insertRule (rule) {
        this.insertedRules.push(this.sheet.insertRule(rule))
    }
}

export default FightAVillainModule
