import CoreModule from '../CoreModule'
import I18n from '../../i18n'

const MODULE_KEY = 'autoRefresh'

class AutoRefreshModule extends CoreModule {
    constructor () {
        super({
            baseKey: MODULE_KEY,
            label: I18n.getModuleLabel('config', MODULE_KEY),
            default: false
        })
    }

    shouldRun () {
        return true
    }

    run () {
        if (this.hasRun || !this.shouldRun()) {return}

        setTimeout(() => {
            window.location.reload()
        }, 10 * 60 * 1000)

        this.hasRun = true
    }
}

export default AutoRefreshModule
