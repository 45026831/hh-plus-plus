import CoreModule from '../CoreModule'
import Helpers from '../../common/Helpers'
import I18n from '../../i18n'

const MODULE_KEY = 'fixClubPageScrollbars'

class FixClubPageScrollbarsModule extends CoreModule {
    constructor () {
        super({
            baseKey: MODULE_KEY,
            label: I18n.getModuleLabel('config', MODULE_KEY),
            default: true,
            restriction: {whitelist: ['HH', 'GH', 'PSH']}
        })
        this.label = I18n.getModuleLabel.bind(this, MODULE_KEY)
    }

    shouldRun () {
        return Helpers.isCurrentPage('clubs')
    }

    run () {
        if (this.hasRun || !this.shouldRun()) {return}

        Helpers.defer(() => {
            $('#members_request, #club_champions').click(() => {
                $('.visible-tab .lead_table_view').getNiceScroll().resize()
            })
        })

        this.hasRun = true
    }
}

export default FixClubPageScrollbarsModule
