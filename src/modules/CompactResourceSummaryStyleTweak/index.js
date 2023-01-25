import STModule from '../STModule'
import Helpers from '../../common/Helpers'
import I18n from '../../i18n'

import styles from './styles.lazy.scss'

const MODULE_KEY = 'compactResourceSummary'

class CompactResourceSummaryStyleTweak extends STModule {
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

    run (props) {
        super.run(props)

        Helpers.defer(() => {
            // window.number_reduce = (n) => I18n.nThousand(+n)
        })
    }
}

export default CompactResourceSummaryStyleTweak
