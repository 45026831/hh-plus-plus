import HHModule from './HHModule'

class CoreModule extends HHModule {
    constructor (configSchema) {
        super({group: 'core', configSchema})
    }
}

export default CoreModule
