import * as en from './labels/En'

const labels = {en}
const supportedLanguages = Object.keys(labels)
const defaultLanguage = supportedLanguages[0]
// const supportedLanguages = ['en', 'fr', 'es', 'it', 'de']
let lang
let locale
let localeDecimalSep

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

    static getLocaleDecimalSeperator () {
        if (!localeDecimalSep) {
            localeDecimalSep = Number(1.1).toLocaleString(I18n.getLocale()).replace(/[0-9]/g, '')
        }
        return localeDecimalSep
    }

    static parseLocaleFloat (numStr) {
        return parseFloat(numStr.split(I18n.getLocaleDecimalSeperator()).map(part => part.replace(/[^0-9]/g, '')).join('.'), 10)
    }

    static parseLocaleRoundedInt (numStr) {
        // 12.3K
        if (numStr.includes(I18n.getLocaleDecimalSeperator())) {
            return parseInt(numStr.replace('K', '00').replace(/[^0-9]/gi, ''), 10)
        }

        // 123K
        if (numStr.includes('K')) {
            return parseInt(numStr.replace('K', '000').replace(/[^0-9]/gi, ''), 10)
        }

        // 1,234
        return parseInt(numStr.replace(/[^0-9]/gi, ''), 10)
    }

    static nThousand (x) {
        if (typeof x !== 'number') {
            x = 0
        }
        return x.toLocaleString(I18n.getLocale()).replace(' ', ' ')
    }
}

export default I18n
