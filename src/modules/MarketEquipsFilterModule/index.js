import CoreModule from '../CoreModule'
import Helpers from '../../common/Helpers'
import I18n from '../../i18n'
import filterIcon from '../../assets/filter.svg'

import styles from './styles.lazy.scss'
import Sheet from '../../common/Sheet'
import EquipManager from './EquipManager'

const {$} = Helpers
const MODULE_KEY = 'marketEquipsFilter'

class MarketEquipsFilterModule extends CoreModule {
    constructor () {
        super({
            baseKey: MODULE_KEY,
            label: I18n.getModuleLabel('config', MODULE_KEY),
            default: true
        })
        this.label = I18n.getModuleLabel.bind(this, MODULE_KEY)
    }

    shouldRun () {
        return Helpers.isCurrentPage('shop')
    }

    run () {
        if (this.hasRun || !this.shouldRun()) {return}

        styles.use()



        Helpers.defer(() => {
            this.injectCSSVars()

            const containers = [
                {
                    $container: $('#my-hero-equipement-tab-container'),
                    name: 'equippable'
                },
                {
                    $container: $('#equipement-tab-container .right-container'),
                    name: 'sellable'
                }
            ]

            containers.forEach(({$container, name}) => {
                const manager = new EquipManager($container, name)
                manager.init()
            })

            // const favouriteSafetyObserver = new MutationObserver(() => this.checkSelection())
            // favouriteSafetyObserver.observe($('#inventory .armor .inventory_slots > div:first-child()')[0], {subtree: true, attributes: true, attributeFilter: ['class']})
        })

        this.hasRun = true
    }

    injectCSSVars() {
        Sheet.registerVar('filter-icon', `url('${filterIcon}')`)
        Sheet.registerVar('star-icon-white', `url('${Helpers.getCDNHost()}/design/ic_star_white.svg')`)
        Sheet.registerVar('star-icon-orange', `url('${Helpers.getCDNHost()}/design/ic_star_orange.svg')`)
    }
}

export default MarketEquipsFilterModule
