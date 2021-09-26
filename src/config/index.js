import Helpers from '../common/Helpers'
const {$} = Helpers

const LS_CONFIG_KEY = 'HHPlusPlusConfig'

class Config {
    constructor() {
        this.groups = []
        this.modules = []
        this.config = {}
        this.hasRendered = false
        this.$configButton = null
        this.$configPane = null
        this.configPaneOpen = false

        if (Helpers.isCurrentPage('home')) {
            this.init()
            this.renderInteractables()
        }
    }

    init() {
        this.gameIcon = $('.hh_logo>img').attr('src')
        this.gameTitle = $('.hh_logo').attr('title')
    }

    loadConfig () {
        const configJson = localStorage.getItem(LS_CONFIG_KEY)
        if (configJson) {
            Object.assign(this.config, JSON.parse(configJson))
        }
    }

    saveConfig () {
        localStorage.setItem(LS_CONFIG_KEY, JSON.stringify(this.config))
    }

    registerGroup(group) {
        const {name, key} = group
        if (!name || !key) {
            throw new Error('cannot register invalid group, need both "key" and "name"', group)
        }

        this.groups.push(group)
    }

    registerModule(module) {
        const {group, configSchema} = module

        if (!group || !this.groups.find(({key}) => key === group)) {
            throw new Error(`cannot register module with unknown group ${group}`)
        }

        this.modules.push(module)

        this.config[this.getConfigKey(group, configSchema.baseKey)] = configSchema.default
        if (configSchema.subSettings) {
            configSchema.subSettings.forEach(setting => {
                this.config[this.getConfigKey(group, configSchema.baseKey, setting.key)] = setting.default
            })
        }
    }

    runModules () {
        this.modules.forEach(module => {
            const moduleEnabled = this.config[this.getConfigKey(module.group, module.configSchema.baseKey)]
            if (moduleEnabled) {
                const subSettings = Object.keys(this.config)
                    .filter(key => key.startsWith(`${this.getConfigKey(module.group, module.configSchema.baseKey)}_`))
                    .map(key => ({[key.replace(`${this.getConfigKey(module.group, module.configSchema.baseKey)}_`, '')]: this.config[key]}))
                    .reduce((a, b) => Object.assign(a, b), {})
                module.run(subSettings)
            }
        })
    }

    getConfigKey (group, baseKey, subKey) {
        return `${group}_${baseKey}${subKey ? `_${subKey}`: ''}`
    }

    renderInteractables () {
        if (this.hasRendered) {
            return
        }

        this.injectCSS()

        // $(document).ready
        this.renderConfigButton()
        // this.renderConfigPane()
        // this.setupEvents()

        this.hasRendered = true
    }

    renderConfigButton () {
        this.$configButton = $(`<div class="hh-plus-plus-config-button" hh_title="${this.gameTitle} ++"></div>`)
        this.$configButton.click(this.openConfigPane.bind(this))
        $('#contains_all').append(this.$configButton)
    }

    renderConfigPane () {
        const $closePaneButton = $('<span class="close-config-panel" />')
        $closePaneButton.click(this.closeConfigPane.bind(this))

        this.$configPane = $(`
            <div class="hh-plus-plus-config-panel">
                <div class="tabs">
                    ${this.groups.map(({key, name}) => `<h4 class="${key}" rel="${key}">${name}</h4>`).join('')}
                </div>
                ${this.groups.map(({key: groupKey}) => `
                    <div class="group-panel" rel="${groupKey}">
                        ${this.modules.filter(({group}) => group === groupKey).map(({configSchema}) => `
                            <div class="config-setting">
                                <label class="base-setting">
                                    <span>${configSchema.label}</span>
                                    <input type="checkbox" name="${this.getConfigKey(groupKey, configSchema.baseKey)}" ${this.config[this.getConfigKey(groupKey, configSchema.baseKey)] ? 'checked="checked"' : ''} />
                                </label>
                                ${configSchema.subSettings ? `
                                <div class="sub-settings">
                                    ${configSchema.subSettings.map(subSetting => `
                                        <label>
                                            <input type="checkbox" name="${this.getConfigKey(groupKey, configSchema.baseKey, subSetting.key)}" ${this.config[this.getConfigKey(groupKey, configSchema.baseKey, subSetting.key)] ? 'checked="checked"' : ''} />
                                            <span>${subSetting.label}</span>
                                        </label>
                                    `).join('')}
                                </div>
                                ` : ''}
                            </div>
                        `).join('')}
                    </div>
                `).join('')}
            </div>
        `)

        this.$configPane.prepend($closePaneButton)
        $('#contains_all').append(this.$configPane)
        this.setupEvents()
        this.selectConfigTab(this.groups[0].key)
    }

    closeConfigPane () {
        if (!this.$configPane.hasClass('shown')) {
            return
        }
        this.$configPane.removeClass('shown')
        this.configPaneOpen = false
    }

    openConfigPane () {
        if (this.$configPane && this.$configPane.hasClass('shown')) {
            return
        }
        if (!this.$configPane) {
            // rendering lazily here so that all modules should have been registered at this point
            this.renderConfigPane()
        }
        this.$configPane.addClass('shown')
        this.configPaneOpen = true
    }

    selectConfigTab(key) {
        $('.hh-plus-plus-config-panel .tabs h4').removeClass('selected')
        $(`.hh-plus-plus-config-panel .tabs h4[rel=${key}]`).addClass('selected')
        $('.hh-plus-plus-config-panel .group-panel').removeClass('shown')
        $(`.hh-plus-plus-config-panel .group-panel[rel=${key}]`).addClass('shown')

        // TODO switch panels
    }

    setupEvents () {
        this.groups.forEach(({key}) => {
            $(`.hh-plus-plus-config-panel .tabs h4[rel=${key}]`).click(this.selectConfigTab.bind(this, key))
        })
    }

    injectCSS () {
        const sheet = Helpers.getSheet()

        sheet.insertRule(`
            .hh-plus-plus-config-button {
                height: 35px;
                width: 35px;
                position: absolute;
                top: 165px;
                right: 15px;
                cursor: pointer;
                background: url(${this.gameIcon});
                background-size: contain;
            }
        `)
        sheet.insertRule(`
            .hh-plus-plus-config-button:after {
                content: "++";
                position: absolute;
                font-size: 26px;
                height: 20px;
                line-height: 20px;
                width: auto;
                bottom: -3px;
                right: -5px;
                text-shadow: rgb(0 0 0) 1px 1px 0px, rgb(0 0 0) -1px 1px 0px, rgb(0 0 0) -1px -1px 0px, rgb(0 0 0) 1px -1px 0px;
            }
        `)

        // (1026 - 900) / 2 = 63
        sheet.insertRule(`
            .hh-plus-plus-config-panel {
                display: none;
                height: 470px;
                width: 900px;
                position: absolute;
                top: 70px;
                right: 63px;
                background-color: rgba(32,3,7,.9);
                z-index: 100;
                border-style: solid;
                border-image-slice: 1;
                border-width: 4px;
                border-image-source: linear-gradient(180deg, #ffa23e, #c41b53);
            }
        `)

        sheet.insertRule(`
            .hh-plus-plus-config-panel.shown {
                display: block;
            }
        `)
        sheet.insertRule(`
            .close-config-panel {
                position: absolute;
                display: block;
                background: url(https://${Helpers.getCDNHost()}/clubs/ic_xCross.png);
                background-size: cover;
                height: 37px;
                width: 41px;
                top: 6px;
                right: 6px;
                cursor: pointer;
            }
        `)

        sheet.insertRule(`
            .hh-plus-plus-config-panel .group-panel {
                display: none;
                position: absolute;
                top: 44px;
                grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
                width: 889px;
                height: 415px;
                overflow-y: auto;
                padding-left: 10px;
                padding-right: 10px;
                gap: 5px;
            }
        `)
        sheet.insertRule(`
            .hh-plus-plus-config-panel .group-panel.shown {
                display: grid;
            }
        `)

        sheet.insertRule(`
            .hh-plus-plus-config-panel .config-setting {
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
                border-radius: 6px;
                border: 1px solid #ffb827;
                max-height: 72px;
                padding: 7px;
                font-size: 12px;
            }
        `)

        sheet.insertRule(`
            .hh-plus-plus-config-panel .base-setting {
                display: flex;
            }
        `)
        sheet.insertRule(`
            .hh-plus-plus-config-panel .base-setting span {
                flex: 1;
            }
        `)
        sheet.insertRule(`
            .hh-plus-plus-config-panel .sub-settings {
                font-size: 11px;
                margin-top: 5px;
            }
        `)
        sheet.insertRule(`
            .hh-plus-plus-config-panel .sub-settings label {
                display: flex;
                align-items: center;
            }
        `)
        sheet.insertRule(`
            .hh-plus-plus-config-panel .sub-settings label span {
                flex: 1;
            }
        `)
        sheet.insertRule(`
            .hh-plus-plus-config-panel .sub-settings label input {
                margin-left: 0;
            }
        `)
    }
}

export default Config
