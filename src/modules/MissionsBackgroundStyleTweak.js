import Helpers from '../common/Helpers'
import STModule from './STModule'
import I18n from '../i18n'
import styles from './MissionsBackgroundStyleTweak.lazy.scss'

class MissionsBackgroundStyleTweak extends STModule {
    constructor() {
        const configSchema = {
            baseKey: 'missionsBackground',
            default: true,
            label: I18n.getModuleLabel('stConfig', 'missionsBackground')
        }
        super({
            name: 'missionsBackground',
            configSchema
        })
    }

    shouldRun () {
        return Helpers.isCurrentPage('activities')
    }

    injectCss () {
        styles.use()
    }

    tearDown () {
        styles.unUse()
    }
}

export default MissionsBackgroundStyleTweak
