import STModule from '../STModule'
import Helpers from '../../common/Helpers'
import Sheet from '../../common/Sheet'
import I18n from '../../i18n'

import styles from './styles.lazy.scss'

const MODULE_KEY = 'compactPops'

class CompactPoPsStyleTweak extends STModule {
    constructor () {
        const configSchema = ({
            baseKey: MODULE_KEY,
            label: I18n.getModuleLabel('stConfig', MODULE_KEY),
            default: true
        })
        super({
            configSchema,
            styles
        })
    }

    shouldRun () {
        return Helpers.isCurrentPage('activities')
    }

    run () {
        super.run()
        Helpers.defer(() => {
            this.injectCSSVars()
        })
    }

    injectCSSVars() {
        Sheet.registerVar('compact-pop-class-icon-hc', `url('${Helpers.getCDNHost()}/caracs/hardcore.png')`)
        Sheet.registerVar('compact-pop-class-icon-ch', `url('${Helpers.getCDNHost()}/caracs/charm.png')`)
        Sheet.registerVar('compact-pop-class-icon-kh', `url('${Helpers.getCDNHost()}/caracs/knowhow.png')`)

        Sheet.registerVar('compact-pop-reward-icon-shard', `url('${Helpers.getCDNHost()}/shards.png')`)
        Sheet.registerVar('compact-pop-reward-icon-ymen', `url('${Helpers.getCDNHost()}/pictures/design/ic_topbar_soft_currency.png')`)
        Sheet.registerVar('compact-pop-reward-icon-koban', `url('${Helpers.getCDNHost()}/pictures/design/ic_topbar_hard_currency.png')`)
        Sheet.registerVar('compact-pop-reward-icon-gem', `url('${Helpers.getCDNHost()}/pictures/design/gems/psychic.png')`)
        Sheet.registerVar('compact-pop-reward-icon-orb', `url('${Helpers.getCDNHost()}/pachinko/o_e1.png')`)
        Sheet.registerVar('compact-pop-reward-icon-booster', `url('${Helpers.getCDNHost()}/pictures/items/B3.png')`)
        Sheet.registerVar('compact-pop-reward-icon-ticket', `url('${Helpers.getCDNHost()}/pictures/design/${Helpers.isCxH() ? 'ic' : 'champion'}_ticket.png')`)
        Sheet.registerVar('compact-pop-reward-icon-gift', `url('${Helpers.getCDNHost()}/pictures/items/K4.png')`)
    }
}

export default CompactPoPsStyleTweak
