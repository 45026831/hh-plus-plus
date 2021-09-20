// import Helpers from '../common/Helpers'
// const {$} = Helpers

const LS_CONFIG_KEY = 'HH++Config'

class Config {
    constructor() {
        this.modules = []
        this.config = {}
    }

    loadConfig () {
        const configJson = localStorage.getItem(LS_CONFIG_KEY)
        if (configJson) {
            Object.assign(this.config, JSON.parse(configJson))
        }
    }

    saveConfig () {

    }

    registerModule(module) {
        this.modules.push(module)
        const {configSchema} = module

        this.config[configSchema.baseKey] = configSchema.default
        if (configSchema.subSettings) {
            configSchema.subSettings.forEach(setting => {
                this.config[`${configSchema.baseKey}-${setting.key}`] = setting.default
            })
        }
    }

    runModules () {
        this.modules.forEach(module => {
            const moduleEnabled = this.config[module.configSchema.baseKey]
            if (moduleEnabled) {
                const subSettings = Object.keys(this.config).filter(key => key.startsWith(module.baseKey)).map(key => ({[key]: this.config[key]})).reduce((a, b) => Object.assign(a, b), {})
                module.run(subSettings)
            }
        })
    }

    renderConfigPane () {
        // const $configPane = $(`
        //     <div class="">
        // `)
    }

    injectCSS () {
        // const sheet = Helpers.getSheet()


    }
}

export default Config
