import CoreModule from '../CoreModule'
import Helpers from '../../common/Helpers'
import I18n from '../../i18n'
import { BLESSINGS } from '../../data/Spreadsheets'

import styles from './styles.lazy.scss'

const MODULE_KEY = 'blessingSpreadsheetLink'

class BlessingSpreadsheetLinkModule extends CoreModule {
    constructor () {
        super({
            baseKey: MODULE_KEY,
            label: I18n.getModuleLabel('config', MODULE_KEY),
            default: true,
            restriction: {blacklist: ['PSH', 'HoH']}
        })
        this.label = I18n.getModuleLabel.bind(this, MODULE_KEY)
    }

    shouldRun () {
        return true
    }

    run () {
        if (this.hasRun || !this.shouldRun()) {return}

        styles.use()

        Helpers.defer(() => {
            const href = BLESSINGS[Helpers.getGameKey()]

            // TODO
            $('#popup_blessings .blessings_wrapper').append(`<a class="script-blessing-spreadsheet-link" target="_blank" href="${href}"><span class="nav_grid_icn"></span><span>${this.label('name')}</span></a>`)
        })

        this.hasRun = true
    }
}

export default BlessingSpreadsheetLinkModule
