import Helpers from '../common/Helpers'
import STModule from './STModule'
import I18n from '../i18n'

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
        this.insertRule(`.collect_img {
            display: none !important;
        }`)
    }
}

export default MoneyAnimationStyleTweak
