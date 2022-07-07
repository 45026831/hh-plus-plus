import STModule from '../STModule'
import Helpers from '../../common/Helpers'
import I18n from '../../i18n'
import Sheet from '../../common/Sheet'

import stylesHHGH from './styles-hhgh.lazy.scss'
import stylesCxH from './styles-cxh.lazy.scss'

const MODULE_KEY = 'newButtons'

class NewButtonsStyleTweak extends STModule {
    constructor () {
        const configSchema = ({
            baseKey: MODULE_KEY,
            label: I18n.getModuleLabel('stConfig', MODULE_KEY),
            default: true
        })
        let styles
        if (Helpers.isCxH()) {
            styles = stylesCxH
        } else {
            styles = stylesHHGH
        }
        super({
            configSchema,
            styles
        })
    }

    shouldRun () {
        return true
    }

    run () {
        super.run()
        Helpers.defer(() => {
            this.injectCSSVars()
        })
    }

    injectCSSVars() {
        if (Helpers.isGH()) {
            Sheet.registerVar('button-colors-orange-start', '#fdda00')
            Sheet.registerVar('button-colors-orange-end', '#bf8d00')
            Sheet.registerVar('button-colors-blue-start', '#4bb')
            Sheet.registerVar('button-colors-blue-end', '#077')
            Sheet.registerVar('button-colors-purple-start', '#e3005b')
            Sheet.registerVar('button-colors-purple-end', '#820040')
            Sheet.registerVar('button-colors-purple-shadow', '#b2b')
        } else {
            Sheet.registerVar('button-colors-orange-start', '#f90')
            Sheet.registerVar('button-colors-orange-end', '#f70')
            Sheet.registerVar('button-colors-blue-start', '#008ed5')
            Sheet.registerVar('button-colors-blue-end', '#05719c')
            Sheet.registerVar('button-colors-purple-start', '#e3005b')
            Sheet.registerVar('button-colors-purple-end', '#820040')
            Sheet.registerVar('button-colors-purple-shadow', '#e15')
        }
    }
}

export default NewButtonsStyleTweak
