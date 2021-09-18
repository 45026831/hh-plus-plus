const fs = require('fs')
const path = require('path')
const pkgJson = require('../package.json')

const meta = fs.readFileSync(path.resolve(__dirname, '../hh-plus-plus.meta.js')).toString().replace('{{version}}', pkgJson.version)
const dist = fs.readFileSync(path.resolve(__dirname, '../dist/hh-plus-plus.user.js'))
const outputFull = `${meta}\n${dist}`

fs.writeFileSync(path.resolve(__dirname, '../dist/hh-plus-plus.meta.js'), meta)
fs.writeFileSync(path.resolve(__dirname, '../dist/hh-plus-plus.user.js'), outputFull)
