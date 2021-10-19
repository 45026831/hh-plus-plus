const fs = require('fs')
const path = require('path')
const pkgJson = require('../package.json')
// const moment = require('moment-timezone')

class BannerBuilder {
    static buildMeta() {
        const metaTemplate = fs.readFileSync(path.resolve(__dirname, './hh-plus-plus.meta.template.js'))
        const meta = metaTemplate.toString()
            .replace('{{version}}', pkgJson.version)
            .replace('{{description}}', pkgJson.description)
        return meta
    }

    static buildBanner() {
        const meta = BannerBuilder.buildMeta()
        let outputFull = meta
        // const isDST = moment().tz('Europe/Paris').zoneAbbr() === 'CEST'
        // outputFull = `${meta}
        // const isDST = ${isDST};
        // `

        return outputFull
    }
}

module.exports = BannerBuilder
