/* global Hero, heroStatsPrices, GT */
import { lsKeys } from '../../common/Constants'
import Helpers from '../../common/Helpers'
import Sheet from '../../common/Sheet'
import {HC, CH, KH} from '../../data/Classes'
import {POINTS_PER_LEVEL, calculateTotalPrice, SELLABLE, TYPES} from '../../data/Market'
import I18n from '../../i18n'
import CoreModule from '../CoreModule'
import styles from './styles.lazy.scss'

const MODULE_KEY = 'market'
const CLASSES = [HC, CH, KH]

const caracKey = carac => `carac${carac}`

class MarketInfoModule extends CoreModule {
    constructor () {
        super({
            baseKey: MODULE_KEY,
            label: I18n.getModuleLabel('config', MODULE_KEY),
            default: true
        })
        this.label = I18n.getModuleLabel.bind(this, MODULE_KEY)
        this.$tooltips = {}
        this.previousCaracs = {
            1: 0,
            2: 0,
            3: 0
        }
    }

    shouldRun () {
        return Helpers.isCurrentPage('shop')
    }

    run () {
        if (this.hasRun || !this.shouldRun()) {return}
        styles.use()

        Helpers.defer(() => {
            this.injectCSSVars()
            this.setupHooks()

            this.updateStats()
            this.updateInventory()
            this.updateEquips()

            this.attachGirlQuota()
        })

        this.hasRun = true
    }

    updateStats () {
        const equips = []
        const boosters = []

        if (Object.entries(this.previousCaracs).every(([carac, value]) => value === Hero.infos.caracs[caracKey(carac)])) {
            // No change
            return
        }

        $('#equiped .armor .slot:not(.empty)').each((i, slot) => {
            equips.push($(slot).data('d'))
        })
        $('#equiped .booster .slot:not(.empty):not(.mythic)').each((i, slot) => {
            boosters.push($(slot).data('d'))
        })

        CLASSES.forEach(carac => {
            const key = caracKey(carac)
            const totalStat = Hero.infos.caracs[key]
            const equipStat = equips.map(equip => equip[key]).reduce((a,b) => a+b, 0)
            const {base_stat: baseStat} = heroStatsPrices[carac]
            const boughtStat = Hero.infos[key]
            const maxBoughtStat = Hero.infos.level * POINTS_PER_LEVEL
            const unboughtStat = maxBoughtStat - boughtStat

            const maxSpent = calculateTotalPrice(maxBoughtStat)
            const spent = calculateTotalPrice(boughtStat)
            const unspent = maxSpent - spent

            let boosterAdd = 0
            let boosterMultiply = 0

            boosters.forEach((booster) => {
                const {identifier, rarity} = booster
                if (identifier !== 'B1') {
                    return
                }

                const amount = booster[key]

                if (rarity === 'legendary') {
                    boosterMultiply += amount / 100
                } else {
                    boosterAdd += amount
                }
            })

            const boosterStat = boosterAdd + Math.ceil((baseStat + boughtStat + equipStat + boosterAdd) * boosterMultiply)

            let clubStat = 0
            if (Helpers.isInClub()) {
                clubStat = totalStat - baseStat - boughtStat - equipStat - boosterStat
            }

            if (!this.$tooltips[carac]) {
                this.$tooltips[carac] = $(`<div class="statToolTip" rel="${key}"></div>`)
                $(`.hero_stats [hero=${key}]`).append('<div class="marketInfoIcon statInfo" ></div>').append(this.$tooltips[carac])
            }

            this.$tooltips[carac].html(`
                <table>
                    <tbody>
                        <tr><td>${this.label('pointsUnbought')} :</td><td>${I18n.nThousand(unboughtStat)}</td></tr>
                        <tr><td>${this.label('moneyUnspent')} :</td><td>${I18n.nThousand(unspent)}</td></tr>
                        <tr><td>${this.label('moneySpent')} :</td><td>${I18n.nThousand(spent)}</td></tr>
                    </tbody>
                </table>
                <hr/>
                <table>
                    <tbody>
                        <tr><td>${this.label('pointsLevel')} :</td><td>${I18n.nThousand(baseStat)}</td></tr>
                        <tr><td>${this.label('pointsBought')} :</td><td>${I18n.nThousand(boughtStat)}</td></tr>
                        <tr><td>${this.label('pointsEquip')} :</td><td>${I18n.nThousand(equipStat)}</td></tr>
                        <tr><td>${this.label('pointsBooster')} :</td><td>${I18n.nThousand(boosterStat)}</td></tr>
                        <tr><td>${this.label('pointsClub')} :</td><td>${I18n.nThousand(clubStat)}</td></tr>
                    </tbody>
                </table>
            `.replace(/( {4}|\n)/g, ''))
        })
    }

    updateInventory () {
        this.updateItems()
        this.updateEquips()
    }

    updateItems () {
        const marketInfo = Helpers.lsGet(lsKeys.MARKET_INFO)

        if (!marketInfo.sellableItems) {
            return
        }

        SELLABLE.forEach(type => {
            if (!this.$tooltips[type]) {
                this.$tooltips[type] = $('<div class="inventoryToolTip"></div>')
                const $infoIcon = $('<div class="marketInfoIcon inventoryInfo"></div>')
                $(`#inventory .${TYPES[type]}`).prepend($infoIcon)
                $infoIcon.after(this.$tooltips[type])
            }
            const {count, cost, value} = marketInfo.sellableItems[type]

            this.$tooltips[type].html(`
                ${this.label('youOwn', {count: I18n.nThousand(count), type: this.label(`${type}Item`)})}<br />
                ${['xp', 'aff'].includes(type) ? this.label('youCanGive', {value: I18n.nThousand(value), currency: this.label(`${type}Currency`)}) + '<br />' : ''}
                ${this.label('youCanSell', {cost: I18n.nThousand(cost)})}
            `)
        })
    }

    updateEquips () {
        const marketInfo = Helpers.lsGet(lsKeys.MARKET_INFO)

        if (!marketInfo.equipsAggregate) {
            return
        }

        const type = 'equip'
        if (!this.$tooltips[type]) {
            this.$tooltips[type] = $('<div class="inventoryToolTip"></div>')
            const $infoIcon = $('<div class="marketInfoIcon inventoryInfo"></div>')
            $('#inventory .armor').prepend($infoIcon)
            $infoIcon.after(this.$tooltips[type])
        }
        const {count, cost} = marketInfo.equipsAggregate

        this.$tooltips[type].html(`
            ${this.label('youOwn', {count: I18n.nThousand(count), type: this.label('equips')})}<br />
            ${this.label('youCanSell', {cost: I18n.nThousand(cost)})}
        `)
    }

    attachGirlQuota () {
        const {is_mobile, is_tablet, TooltipManager, Tooltip} = window
        const isMobile = is_mobile && is_mobile() || is_tablet && is_tablet()

        TooltipManager.initTooltipType(isMobile, '#girls_list > .level_target', false, (target) => {
            const awakeningThreshold = Helpers.getAwakeningThreshold()

            if (awakeningThreshold) {
                const {currentThreshold, currentThresholdOwned, currentThresholdMin} = awakeningThreshold

                const levelText = `${GT.design.Lvl} ${currentThreshold} : ${currentThresholdOwned} / ${currentThresholdMin} ${GT.design.Girls}`

                let newTooltip = new Tooltip($(target),'',levelText)
                TooltipManager.initNewTooltip(target, newTooltip)
            }
        })
    }

    setupHooks () {
        // Purchase stat points
        Helpers.onAjaxResponse(/action=update_stats/, (response, xhr) => {
            if (!response.success) {return}
            const search = new URLSearchParams(xhr.data)
            const carac = caracKey(search.get('carac'))
            const value = response[carac]

            Hero.infos[carac] = value
        })

        // Observe change (after side-effects have run)
        CLASSES.forEach(carac => {
            const key = caracKey(carac)

            const observer = new MutationObserver(() => this.updateStats())
            observer.observe($(`[hero=${key}] [carac=${carac}]`)[0], {childList: true})
        })

        // Listen for updates from collector
        $(document).on('market:inventory-updated', () => this.updateItems())
        $(document).on('market:equips-updated', () => this.updateEquips())
    }

    injectCSSVars () {
        Sheet.registerVar('info-icon', `url(${Helpers.getCDNHost()}/design/ic_info.svg)`)
    }
}

export default MarketInfoModule
