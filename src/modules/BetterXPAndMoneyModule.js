/* global Hero */
import Helpers from '../common/Helpers'
import I18n from '../i18n'
import HHModule from './HHModule'

const MODULE_KEY = 'xpMoney'

class BetterXPAndMoneyModule extends HHModule {
    constructor () {
        const configSchema = {
            baseKey: MODULE_KEY,
            label: I18n.getModuleLabel('config', MODULE_KEY),
            default: true
        }
        super({
            group: 'core',
            name: MODULE_KEY,
            configSchema
        })
        this.label = I18n.getModuleLabel.bind(this, MODULE_KEY)
        this.sheet = Helpers.getSheet()
        this.insertedRules = []
    }

    run () {
        if (this.hasRun) {return}
        this.injectCSS()

        this.betterXP()

        const xpObserver = new MutationObserver(this.betterXP.bind(this))
        xpObserver.observe($('[hero=xp]')[0], {childList: true})

        this.betterMoney()

        const moneyObserver = new MutationObserver(this.betterMoney.bind(this))
        moneyObserver.observe($('[hero=soft_currency]')[0], {childList: true})

        this.hasRun = true
    }

    betterXP () {
        if (!this.$xpContainer) {
            this.$xpContainer = $('<span class="scriptXPContainer"></span>')
            $('[rel=xp] .bar-wrapper .over').append(this.$xpContainer)
        }

        this.$xpContainer.text(this.label('xp', {xp: I18n.nThousand(Hero.infos.Xp.left)}))
    }

    betterMoney () {
        if (!this.$moneyContainer) {
            this.$moneyContainer = $('<span class="scriptMoneyContainer"></span>')
            $('[hero=soft_currency]').after(this.$moneyContainer)
        }

        const money = Hero.infos.soft_currency
        let displayAmount
        const thousandSeparatedMoney = I18n.nThousand(money)

        if (money >= 1e6) {
            displayAmount = I18n.nRounding(money, 3, 0)
        } else {
            displayAmount = thousandSeparatedMoney
        }

        this.$moneyContainer.text(displayAmount).attr('hh_title', thousandSeparatedMoney)
    }

    injectCSS () {
        this.insertRule(`
            [hero=xp], [hero=xp_sep], [hero=xp_max], [hero=soft_currency] {
                display: none;
            }
        `)
        this.insertRule(`
            .scriptMoneyContainer {
                margin-left: -1px;
            }
        `)
    }

    insertRule (rule) {
        this.insertedRules.push(this.sheet.insertRule(rule))
    }
}

export default BetterXPAndMoneyModule
