import CoreModule from '../CoreModule'
import I18n from '../../i18n'

import styles from './styles.lazy.scss'

const MODULE_KEY = 'censorMode'

class CensorModeModule extends CoreModule {
    constructor () {
        super({
            baseKey: MODULE_KEY,
            label: I18n.getModuleLabel('config', MODULE_KEY),
            default: false,
        })
        this.label = I18n.getModuleLabel.bind(this, MODULE_KEY)
    }

    shouldRun () {
        return true
    }

    run () {
        if (this.hasRun || !this.shouldRun()) {return}

        styles.use()

        this.hasRun = true
    }
}

export default CensorModeModule
