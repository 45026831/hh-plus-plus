import Helpers from '../../common/Helpers'
import STModule from '../STModule'
import I18n from '../../i18n'
import styles from './styles.lazy.scss'

class MissionsBackgroundStyleTweak extends STModule {
    constructor() {
        const configSchema = {
            baseKey: 'missionsBackground',
            default: true,
            label: I18n.getModuleLabel('stConfig', 'missionsBackground')
        }
        super({
            configSchema,
            styles
        })
    }

    shouldRun () {
        return Helpers.isCurrentPage('activities')
    }
}

export default MissionsBackgroundStyleTweak
