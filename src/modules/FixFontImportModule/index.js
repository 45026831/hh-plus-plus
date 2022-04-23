import CoreModule from '../CoreModule'
import I18n from '../../i18n'

import styles from './styles.lazy.scss'

const MODULE_KEY = 'fixFontImport'

class FixFontImportModule extends CoreModule {
    constructor () {
        super({
            baseKey: MODULE_KEY,
            label: I18n.getModuleLabel('config', MODULE_KEY),
            default: true
        })
        this.label = I18n.getModuleLabel.bind(this, MODULE_KEY)
    }

    shouldRun () {
        return true
    }

    run () {
        if (this.hasRun || !this.shouldRun()) {return}

        styles.use()

        $(document.head).append('<link rel="stylesheet" onload="this.onload=null;this.removeAttribute(\'media\');" href="//fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&amp;display=swap">')

        this.hasRun = true
    }
}

export default FixFontImportModule
