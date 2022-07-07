import STModule from '../STModule'
import I18n from '../../i18n'

import styles from './styles.lazy.scss'

const MODULE_KEY = 'compactNav'

class CompactNavStyleTweak extends STModule {
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
        return true
    }
}

export default CompactNavStyleTweak
