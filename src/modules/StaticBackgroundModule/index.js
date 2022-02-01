import CoreModule from '../CoreModule'
import Helpers from '../../common/Helpers'
import I18n from '../../i18n'

const MODULE_KEY = 'staticBackground'

class StaticBackgroundModule extends CoreModule {
    constructor () {
        super({
            baseKey: MODULE_KEY,
            label: I18n.getModuleLabel('config', MODULE_KEY),
            default: true
        })
    }

    run () {
        if (this.hasRun) {return}

        Helpers.defer(() => {
            // Original code by FinderKeeper
            if ($('body[ page ]').attr('page') !== 'map') {
                $('#bg_all').replaceWith( $('#bg_all').clone() )
                $('#bg_all > div > img').not($('#bg_all > div > img')[Math.floor(Math.random()*$('#bg_all > div > img').length)]).remove()
                $('#bg_all > div > img').css('opacity','1')
                $('#bg_all > div > img').css('display','block')
            }
        })

        this.hasRun = true
    }
}

export default StaticBackgroundModule
