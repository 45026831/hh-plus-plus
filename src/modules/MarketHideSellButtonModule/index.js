import Helpers from '../../common/Helpers'
import I18n from '../../i18n'
import HHModule from '../HHModule'
import { lsKeys } from '../../common/Constants'

import styles from './styles.lazy.scss'

const {$} = Helpers
const MODULE_KEY = 'marketHideSellButton'

class MarketHideSellButtonModule extends HHModule {
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

    shouldRun () {
        return Helpers.isCurrentPage('shop')
    }

    getSellButton () {
        if (!this.$sellButton) {
            this.$sellButton = $('#shops #inventory button[rel="sell"]')
        }
        return this.$sellButton
    }

    hideButton () {
        Helpers.lsSet(lsKeys.SELL_BUTTON_HIDDEN, true)
        this.getSellButton().addClass('hidden')
    }

    unhideButton () {
        Helpers.lsSet(lsKeys.SELL_BUTTON_HIDDEN, false)
        this.getSellButton().removeClass('hidden')
    }

    isButtonHidden () {
        return Helpers.lsGet(lsKeys.SELL_BUTTON_HIDDEN)
    }

    run () {
        if (this.hasRun || !this.shouldRun()) {return}

        styles.use()

        Helpers.defer(() => {
            const startHidden = this.isButtonHidden()
            this.$toggleField = $(`
                <label class="hide-sell-toggle">
                    <input type="checkbox" name="hideSellToggle" ${startHidden ? 'checked="checked"' : ''} />
                    <span>${this.label('hide')}</span>
                </label>
            `).change((e) => {
                const isHidden = $(e.target).prop('checked')
                if (isHidden) {
                    this.hideButton()
                } else {
                    this.unhideButton()
                }
            })

            if (startHidden) {
                this.hideButton()
            }

            $('#shops_right #inventory').append(this.$toggleField)
        })

        this.hasRun = true
    }
}

export default MarketHideSellButtonModule
