import Helpers from '../../common/Helpers'
import STModule from '../STModule'
import I18n from '../../i18n'
import styles from './styles.lazy.scss'

class MoneyAnimationStyleTweak extends STModule {
    constructor() {
        const configSchema = {
            baseKey: 'collectMoneyAnimation',
            default: true,
            label: I18n.getModuleLabel('stConfig', 'collectMoneyAnimation')
        }
        super({
            name: 'collectMoneyAnimation',
            configSchema
        })
    }

    shouldRun () {
        return Helpers.isCurrentPage('harem')
    }

    injectCss () {
        styles.use()
    }

    tearDown () {
        styles.unUse()
    }
}

export default MoneyAnimationStyleTweak
