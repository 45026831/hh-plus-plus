import * as en from './labels/En'

const labels = {en}
const supportedLanguages = Object.keys(labels)
const defaultLanguage = supportedLanguages[0]
// const supportedLanguages = ['en', 'fr', 'es', 'it', 'de']
let lang
let locale

class I18n {
    static getLang() {
        if (!lang) {
            const htmlLang = document.documentElement.lang.substring(0,2)
            lang = supportedLanguages.includes(htmlLang) ? htmlLang : defaultLanguage
        }
        return lang
    }

    static getLocale() {
        if (!locale) {
            locale = I18n.getLang() === 'en' ? 'en' : 'fr'
        }
        return locale
    }

    static getModuleLabel(module, key, data={}) {
        const lang = I18n.getLang()
        let workingLabel = labels[lang][module][key] || labels[defaultLanguage][module][key]

        Object.entries(data).forEach(([template, value])=> {
            workingLabel.replace(`{{${template}}}`, value)
        })

        return workingLabel
    }
}

export default I18n
