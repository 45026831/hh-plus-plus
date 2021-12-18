/* global Hero */
import I18n from '../i18n'
import HHModule from './HHModule'

import styles from './BetterXPAndMoneyModule.lazy.scss'
import Helpers from '../common/Helpers'

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
    }

    run () {
        if (this.hasRun) {return}
        styles.use()

        Helpers.defer(() => {
            this.betterXP()

            const xpObserver = new MutationObserver(this.betterXP.bind(this))
            xpObserver.observe($('[hero=xp]')[0], {childList: true})

            this.betterMoney()

            const moneyObserver = new MutationObserver(this.betterMoney.bind(this))
            moneyObserver.observe($('[hero=soft_currency]')[0], {childList: true})
        })

        this.hasRun = true
    }

    betterXP () {
        const $wrapper = $('[rel=xp] .bar-wrapper .over')
        if (!this.$xpContainer) {
            this.$xpContainer = $('<span class="scriptXPContainer"></span>')
            $wrapper.append(this.$xpContainer)
        }

        const xpLeft = Hero.infos.Xp.left
        if (xpLeft > 0) {
            $wrapper.addClass('hideDefault')
            this.$xpContainer.text(this.label('xp', {xp: I18n.nThousand(xpLeft)}))
        } else {
            $wrapper.removeClass('hideDefault')
            this.$xpContainer.text('')
        }
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
            this.$moneyContainer.text(displayAmount).attr('hh_title', thousandSeparatedMoney)
        } else {
            this.$moneyContainer.text($('[hero=soft_currency]').text()).attr('hh_title', thousandSeparatedMoney)
        }

    }
}

export default BetterXPAndMoneyModule
