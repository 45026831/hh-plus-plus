import Helpers from '../common/Helpers'
import STModule from './STModule'
import I18n from '../i18n'

class MissionsBackgroundStyleTweak extends STModule {
    constructor() {
        const configSchema = {
            baseKey: 'missionsBackground',
            default: true,
            label: I18n.getModuleLabel('stConfig', 'missionsBackground')
        }
        super({
            name: 'missionsBackground',
            configSchema
        })
    }

    shouldRun () {
        return Helpers.isCurrentPage('activities')
    }

    injectCss () {
        this.insertRule(`
            #missions .missions_wrap .mission_object.mission_entry.common {
                background: #ffffff20
            }
        `),

        this.insertRule(`
            #missions .missions_wrap .mission_object.mission_entry.rare {
                background: #32bc4f30;
            }
        `),

        this.insertRule(`
            #missions .missions_wrap .mission_object.mission_entry.epic {
                background: #ffb24440;
            }
        `),

        this.insertRule(`
            #missions .missions_wrap .mission_object.mission_entry.legendary {
                background: #6ebeff40;
            }
        `)
    }
}

export default MissionsBackgroundStyleTweak
