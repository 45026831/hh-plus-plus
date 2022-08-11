import CoreModule from '../CoreModule'
import Helpers from '../../common/Helpers'
import I18n from '../../i18n'

const MODULE_KEY = 'fixProfilePopup'

class FixProfilePopupModule extends CoreModule {
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

        if (Helpers.isCurrentPage('activities')) {
            this.fixContestProfilePopup()
        }

        Helpers.defer(() => {
            this.overrideAPI()
        })

        this.hasRun = true
    }

    overrideAPI () {
        const default_hero_page_popup = window.hero_page_popup
        window.hero_page_popup = (info) => {
            if (info && !info.page) {
                info.page = 'profile'
            }
            return default_hero_page_popup(info)
        }
    }

    fixContestProfilePopup() {
        $(document.body).on('click', '#contests>div>div.right_part>.ranking table tbody tr[sorting_id]', (e) => {
            const id = $(e.currentTarget).attr('sorting_id')
            window.hero_page_popup({id})
        })
    }
}

export default FixProfilePopupModule
