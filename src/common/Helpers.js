let sheet
let isHH
let isGH
let isCxH
let cdnHost
class Helpers {
    static getHost() {
        return window.location.host
    }
    static getCDNHost () {
        if (!cdnHost) {
            const CDNs = {
                'nutaku.haremheroes.com': 'hh.hh-content.com',
                'www.hentaiheroes.com': 'hh2.hh-content.com',
                'www.comixharem.com': 'ch.hh-content.com',
                'nutaku.comixharem.com': 'ch.hh-content.com',
                'www.gayharem.com': 'gh1.hh-content.com',
                'nutaku.gayharem.com': 'gh.hh-content.com'
            }
            cdnHost = CDNs[Helpers.getHost()] || 'hh.hh-content.com'
        }
        return cdnHost
    }
    static getPathname() {
        return window.location.pathname
    }
    static isCurrentPage(matcher) {
        return Helpers.getPathname().includes(matcher)
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
    static getGameKey () {
        if (Helpers.isHH()) {
            return 'HH'
        }
        if (Helpers.isGH()) {
            return 'GH'
        }
        if (Helpers.isCxH()) {
            return 'CxH'
        }
    }

    static $ (formattedHtml) {
        if (typeof formattedHtml === 'string') {
            return window.$(formattedHtml.replace(/\n/g, '').replace(/ {4}/g, ''))
        }
        return window.$(formattedHtml)
    }

    static mediaMobile (rule) {
        return `@media only screen and (max-width: 1025px) {${rule}}`
    }
    static mediaDesktop (rule) {
        return `@media only screen and (min-width: 1026px) {${rule}}`
    }
}

export default Helpers
