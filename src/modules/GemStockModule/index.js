/* global player_gems_amount */
import Helpers from '../../common/Helpers'
import I18n from '../../i18n'
import HHModule from '../HHModule'
import {ICON_NAMES as ELEMENTS_ICON_NAMES} from '../../data/Elements'

import styles from './styles.lazy.scss'

const MODULE_KEY = 'gemStock'

class GemStockModule extends HHModule {
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

    shouldRun () {
        return Helpers.isCurrentPage('shop') || (Helpers.isCurrentPage('harem') && !Helpers.isCurrentPage('hero'))
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
            this.injectDynamicCSS()

            const $gemStock = this.buildGemsStockElem()

            let $container
            if (Helpers.isCurrentPage('shop')) {
                $container = $('#shops_right #girls_list')
            } else {
                $container = $('#harem_whole #harem_right')
            }

            $container.prepend($gemStock)
        })

        this.hasRun = true
    }

    injectDynamicCSS() {
        this.insertRule(`
            .gemStock {
                background-image: url(${Helpers.getCDNHost()}/pictures/design/gems/all.png);
            }
        `)
    }

    insertRule (rule) {
        this.insertedRules.push(this.sheet.insertRule(rule))
    }

}

export default GemStockModule
