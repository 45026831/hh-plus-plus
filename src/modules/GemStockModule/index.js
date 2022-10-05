/* global player_gems_amount */
import CoreModule from '../CoreModule'
import Helpers from '../../common/Helpers'
import I18n from '../../i18n'
import {ICON_NAMES as ELEMENTS_ICON_NAMES} from '../../data/Elements'

import styles from './styles.lazy.scss'
import Sheet from '../../common/Sheet'

const MODULE_KEY = 'gemStock'

class GemStockModule extends CoreModule {
    constructor () {
        super({
            baseKey: MODULE_KEY,
            label: I18n.getModuleLabel('config', MODULE_KEY),
            default: true
        })
        this.label = I18n.getModuleLabel.bind(this, MODULE_KEY)
    }

    shouldRun () {
        return (Helpers.isCurrentPage('harem') && !Helpers.isCurrentPage('hero'))
    }

    buildGemsTable () {
        const elements = Object.keys(ELEMENTS_ICON_NAMES)
        return `
        <table class="gemStock-table">
            <tbody>
                ${elements.map(element => `
                    <tr>
                        <td><img src="${Helpers.getCDNHost()}/pictures/design/gems/${element}.png"></td>
                        <td>${I18n.nThousand(+player_gems_amount[element].amount)}</td>
                    </tr>
                `).join('')}
            </tody>
        </table>
    `.replace(/(\n| {4})/g, '')
    }

    buildGemsStockElem () {
        return $('<div class="gemStock"></div>').attr('hh_title', this.buildGemsTable())
    }

    run () {
        if (this.hasRun || !this.shouldRun()) {return}

        styles.use()

        Helpers.defer(() => {
            this.injectCSSVars()

            const $gemStock = this.buildGemsStockElem()

            const $container = $('#harem_whole #harem_right')

            $container.prepend($gemStock)
        })

        this.hasRun = true
    }

    injectCSSVars() {
        Sheet.registerVar('gem-stock-icon', `url('${Helpers.getCDNHost()}/pictures/design/gems/all.png')`)
    }
}

export default GemStockModule
