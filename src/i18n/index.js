import * as en from './labels/En'
import * as fr from './labels/Fr'
import * as es from './labels/Es'
import * as it from './labels/It'
import * as de from './labels/De'
import * as ru from './labels/Ru'
// import * as ja from './labels/Jp'

const labels = {en, fr, es, it, de, ru, /*ja*/}
const supportedLanguages = Object.keys(labels)
const defaultLanguage = supportedLanguages[0]
let lang
let locale
let localeDecimalSep

const ORDERS = {
    K: 1e3,
    M: 1e6,
    G: 1e9,
}

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
            locale = ['en', 'ja'].includes(I18n.getLang()) ? 'en' : 'fr'
        }
        return locale
    }

    static getModuleLabel(module, key, data={}) {
        const lang = I18n.getLang()
        let workingLabel = (labels[lang][module] && labels[lang][module][key]) || (labels[defaultLanguage][module] && labels[defaultLanguage][module][key]) || key

        Object.entries(data).forEach(([template, value])=> {
            workingLabel = workingLabel.replace(`{{${template}}}`, value)
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
        const orderSchema = Object.entries(ORDERS).find(([letter]) => numStr.includes(letter))

        // 12.3K
        if (numStr.includes(I18n.getLocaleDecimalSeperator())) {
            const scalar = I18n.parseLocaleFloat(numStr)
            const order = (orderSchema && orderSchema[1]) || 1

            return Math.round(scalar * order)
        }

        // 123K
        if (orderSchema) {
            const scalar = parseInt(numStr.replace(/[^0-9]/gi, ''), 10)
            const order = (orderSchema && orderSchema[1]) || 1

            return scalar * order
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

    static nRounding(num, digits, updown) {
        let power = [
            { value: 1, symbol: '' },
            { value: 1E3, symbol: 'K' },
            { value: 1E6, symbol: 'M' },
            { value: 1E9, symbol: 'B' },
            { value: 1E12, symbol: 'T' },
        ]
        let i
        for (i = power.length - 1; i > 0; i--) {
            if (num >= power[i].value) {
                break
            }
        }
        if (updown === 1) {
            return I18n.nThousand(+(Math.ceil(num / power[i].value * Math.pow(10, digits)) / Math.pow(10, digits)).toFixed(digits)) + power[i].symbol
        }
        else if (updown === 0) {
            return I18n.nThousand(+(Math.round(num / power[i].value * Math.pow(10, digits)) / Math.pow(10, digits)).toFixed(digits)) + power[i].symbol
        }
        else if (updown === -1) {
            return I18n.nThousand(+(Math.floor(num / power[i].value * Math.pow(10, digits)) / Math.pow(10, digits)).toFixed(digits)) + power[i].symbol
        }
    }
}

export default I18n
window.HHPlusPlus.I18n = I18n
