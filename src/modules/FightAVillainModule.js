/* global Hero */
import Helpers from '../common/Helpers'
import HHModule from './HHModule'
import I18n from '../i18n'
import VILLAINS from '../data/Villains'

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

        if (localStorage.getItem('eventTrolls') === null) {
            localStorage.setItem('eventTrolls', '[]')
        }
        if (localStorage.getItem('mythicEventTrolls') === null) {
            localStorage.setItem('mythicEventTrolls', '[]')
        }

        let eventTrolls = JSON.parse(localStorage.getItem('eventTrolls'))
        let mythicEventTrolls = JSON.parse(localStorage.getItem('mythicEventTrolls'))
        const girlDictionary = (typeof(localStorage.HHPNMap) === 'undefined') ? new Map(): new Map(JSON.parse(localStorage.HHPNMap))

        let eventEndTime = localStorage.getItem('eventTime') || 0
        let mythicEventEndTime = localStorage.getItem('mythicEventTime') || 0


        if (Math.floor(new Date().getTime()/1000) > eventEndTime)
            localStorage.removeItem('eventTrolls')

        if (Math.floor(new Date().getTime()/1000) > mythicEventEndTime)
            localStorage.removeItem('mythicEventTrolls')

        if (window.location.search.includes('tab=event')) {
            let eventRemainingTime = parseInt($('#contains_all #events .nc-panel-header .nc-pull-right #timer').attr('data-seconds-until-event-end'), 10)
            eventEndTime = Math.floor(new Date().getTime()/1000) + eventRemainingTime
            localStorage.setItem('eventTime', eventEndTime)

            eventTrolls = []

            let totalGirls = $('#contains_all #events .nc-panel-body .nc-event-container .nc-event-reward-container').length
            for (let i=0; i<totalGirls; i++) {
                let girlId = $('#contains_all #events .nc-panel-body .nc-event-container .nc-event-reward-container:nth-child(' + (i+1) + ')').attr('data-reward-girl-id')
                let girlLocation = $('#contains_all #events .nc-panel-body .nc-event-container .nc-event-reward-container:nth-child(' + (i+1) + ') .nc-events-prize-locations-buttons-container .nc-events-prize-locations-buttons-container a').attr('href')
                let index = $('#contains_all #events .nc-panel-body .nc-event-container .nc-event-reward-container:nth-child(' + (i+1) + ') .nc-event-reward-info .new_girl_info h5').attr('class').indexOf('-text')
                let girlRarity = $('#contains_all #events .nc-panel-body .nc-event-container .nc-event-reward-container:nth-child(' + (i+1) + ') .nc-event-reward-info .new_girl_info h5').attr('class').substring(0, index)
                if (girlLocation.includes('troll-pre-battle')) {
                    eventTrolls.push({id: girlId, troll: girlLocation.substring(35), rarity: girlRarity})
                }
            }
            localStorage.setItem('eventTrolls', JSON.stringify(eventTrolls))
        }

        if (window.location.search.includes('tab=mythic_event')) {
            let eventRemainingTime = parseInt($('#contains_all #events .nc-panel-header .nc-pull-right #timer').attr('data-seconds-until-event-end'), 10)
            mythicEventEndTime = Math.floor(new Date().getTime()/1000) + eventRemainingTime
            localStorage.setItem('mythicEventTime', mythicEventEndTime)

            mythicEventTrolls = []

            let totalGirls = $('#contains_all #events .nc-panel-body .nc-event-container .nc-event-reward-container').length
            for (let i=0; i<totalGirls; i++) {
                let girlId = $('#contains_all #events .nc-panel-body .nc-event-container .nc-event-reward-container:nth-child(' + (i+1) + ')').attr('data-reward-girl-id')
                let girlLocation = $('#contains_all #events .nc-panel-body .nc-event-container .nc-event-reward-container:nth-child(' + (i+1) + ') .nc-events-prize-locations-buttons-container .nc-events-prize-locations-buttons-container a').attr('href')
                let index = $('#contains_all #events .nc-panel-body .nc-event-container .nc-event-reward-container:nth-child(' + (i+1) + ') .nc-event-reward-info .new_girl_info h5').attr('class').indexOf('-text')
                let girlRarity = $('#contains_all #events .nc-panel-body .nc-event-container .nc-event-reward-container:nth-child(' + (i+1) + ') .nc-event-reward-info .new_girl_info h5').attr('class').substring(0, index)
                if (girlLocation.includes('troll-pre-battle'))
                    mythicEventTrolls.push({id: girlId, troll: girlLocation.substring(35), rarity: girlRarity})
            }
            localStorage.setItem('mythicEventTrolls', JSON.stringify(mythicEventTrolls))
        }

        //Add the actual menu


        const currentWorld = Hero.infos.questing.id_world

        const menuHtml = `
            <div class="TrollsMenu" id="TrollsID">
                ${villainsSet.filter(villain => villain.world <= currentWorld).map(({key, girls, world}) => {
        let tiersSuffix = ''
        if (tiers) {
            const tier1 = girls[1].some(idGirl => !(girlDictionary.get(idGirl) && girlDictionary.get(idGirl).shards)) ? '&#185;' : ''
            const tier2 = girls[2].some(idGirl => !(girlDictionary.get(idGirl) && girlDictionary.get(idGirl).shards)) ? '&#178;' : ''
            const tier3 = girls[3].some(idGirl => !(girlDictionary.get(idGirl) && girlDictionary.get(idGirl).shards)) ? '&#179;' : ''
            tiersSuffix = ` ${tier1}${tier2}${tier3}`
        }
        const label = `${key ? this.label(key) : this.label('fallback', {world})}${tiersSuffix}`
        let type = 'regular'
        for (let j = 0, len = eventTrolls.length; j < len; j++) {
            let shards = girlDictionary.get(eventTrolls[j].id) ? girlDictionary.get(eventTrolls[j].id).shards : 0
            if (eventTrolls[j].troll === (world - 1) && shards !== 100) {
                type = `eventTroll ${eventTrolls[j].rarity}`
            }
        }
        for (let k = 0, l = mythicEventTrolls.length; k < l; k++) {
            let shards = girlDictionary.get(mythicEventTrolls[k].id) ? girlDictionary.get(mythicEventTrolls[k].id).shards : 0
            if (mythicEventTrolls[k].troll === (world - 1) && shards !== 100) {
                type = 'mythicEventTroll'
            }
        }
        return `<a class="${type}" href="/troll-pre-battle.html?id_opponent=${world-1}">${label}</a>`
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
            }
        `)

        this.insertRule(Helpers.mediaDesktop(`
            .TrollsMenu {
                width: 88%;
                margin: 34px 0 0 34px;
                font-size: 14px;
                line-height: 22px;
            }
        `))

        this.insertRule(Helpers.mediaMobile(`
            .TrollsMenu {
                width: 200%;
                margin: 64px 0 0 -79px;
                font-size: 16px;
                line-height: 45px;
                grid-template-columns: 1fr 1fr;
                grid-auto-flow: row;
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
