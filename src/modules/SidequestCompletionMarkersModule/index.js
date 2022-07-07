import CoreModule from '../CoreModule'
import Helpers from '../../common/Helpers'
import I18n from '../../i18n'
import Sheet from '../../common/Sheet'

import styles from './styles.lazy.scss'

const MODULE_KEY = 'sidequestCompletionMarkers'

class SidequestCompletionMarkersModule extends CoreModule {
    constructor () {
        super({
            baseKey: MODULE_KEY,
            label: I18n.getModuleLabel('config', MODULE_KEY),
            default: true
        })
        this.label = I18n.getModuleLabel.bind(this, MODULE_KEY)
    }

    shouldRun () {
        return Helpers.isCurrentPage('side-quests')
    }

    run () {
        if (this.hasRun || !this.shouldRun()) {return}

        styles.use()

        Helpers.defer(() => {
            this.injectCSSVars()

            $('.side-quest').has('.Read').addClass('complete')
        })

        this.hasRun = true
    }

    injectCSSVars() {
        Sheet.registerVar('sidequest-tick-icon', `url('${Helpers.getCDNHost()}/clubs/ic_Tick.png')`)
    }
}

export default SidequestCompletionMarkersModule
