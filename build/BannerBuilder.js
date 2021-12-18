const fs = require('fs')
const path = require('path')
const pkgJson = require('../package.json')

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
        fs.writeFileSync(path.resolve(__dirname, '../dist/hh-plus-plus.meta.js'), meta)
        return meta
    }
}

module.exports = BannerBuilder
