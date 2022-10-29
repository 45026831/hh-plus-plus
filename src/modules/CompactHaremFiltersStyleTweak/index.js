import STModule from '../STModule'
import Helpers from '../../common/Helpers'
import I18n from '../../i18n'

import styles from './styles.lazy.scss'

const MODULE_KEY = 'compactHaremFilters'

class CompactHaremFiltersStyleTweak extends STModule {
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
        return Helpers.isCurrentPage('harem') && !Helpers.isCurrentPage('hero')
    }

    run () {
        super.run()

        Helpers.defer(() => {
            const doublewideFields = [
                '.checkbox-group'
            ]

            doublewideFields.forEach(field => {
                $(`.form-control:has(${field})`).addClass('double-wide')
            })

            const secondaryFilters = [
                'event',
                'world'
            ]
            secondaryFilters.forEach(field => {
                $(`.form-control:has(select[name=${field}])`).addClass('secondary-position-fix')
            })
        })
    }
}

export default CompactHaremFiltersStyleTweak
