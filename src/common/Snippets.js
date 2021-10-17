import I18n from '../i18n'

class Snippets {
    static selectInput ({id, label, options}) {
        return `
            <div class="form-control">
                <div class="select-group">
                    <label class="head-group" for="${id}">${label}</label>
                    <select name="${id}" id="${id}" icon="down-arrow">
                        <option value="all" selected="selected">${I18n.getModuleLabel('common', 'all')}</option>
                        ${options.map(({label, value}) => `<option value="${value}">${label}</option>`).join('')}
                    </select>
                </div>
            </div>
        `
    }
    static textInput ({id, label, placeholder}) {
        return `
            <div class="form-control">
                <div class="input-group">
                    <label class="head-group" for="${id}">${label}</label>
                    <input type="text" autocomplete="off" id="${id}" placeholder="${placeholder}" icon="search">
                </div>
            </div>
        `
    }
}

export default Snippets
