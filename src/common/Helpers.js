const supportedLanguages = ['en', 'fr', 'es', 'it', 'de']
let sheet
let isHH
let isGH
let isCxH
let lang
let locale

class Helpers {
    static getHost() {
        return window.location.host
    }
    static getPathname() {
        return window.location.pathname
    }

    static getSheet() {
        if (!sheet) {
            const style = document.createElement('style')
            document.head.appendChild(style);
            ({sheet} = style)
        }

        return sheet
    }

    static isHH() {
        if (isHH === undefined) {
            isHH = !(Helpers.isGH() || Helpers.isCxH())
        }
        return isHH
    }

    static isGH() {
        if (isGH === undefined) {
            isGH = [
                'www.gayharem.com',
                'nutaku.gayharem.com'
            ].includes(Helpers.getHost())
        }
        return isGH
    }

    static isCxH() {
        if (isCxH === undefined) {
            isCxH = [
                'www.comixharem.com',
                'nutaku.comixharem.com'
            ].includes(Helpers.getHost())
        }
        return isCxH
    }

    static getLang() {
        if (!lang) {
            const htmlLang = document.documentElement.lang.substring(0,2)
            lang = supportedLanguages.includes(htmlLang) ? htmlLang : supportedLanguages[0]
        }
        return lang
    }

    static getLocale() {
        if (!locale) {
            locale = Helpers.getLang() === 'en' ? 'en' : 'fr'
        }
        return locale
    }
}

export default Helpers
