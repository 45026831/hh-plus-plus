const fs = require('fs')
const path = require('path')

const generateModule = (type, name, key) => {
    if (!type || !name || !key) {
        console.error('cannot create module: missing argument(s)')
        return
    }
    if (!['core', 'st'].includes(type)) {
        console.error('invalid type: must be core or st')
    }
    const newModuleDirectory = path.resolve(__dirname, '../src/modules', name)

    // Check if already exists
    if (fs.existsSync(newModuleDirectory)) {
        console.error('cannot create module: path already exists')
        return
    }
    console.log('creating module with name', name, 'and key', key)

    let templateFilename
    if (type==='core') {
        templateFilename = './index.boilerplate.template.js'
    } else if (type==='st') {
        templateFilename = './index.st-boilerplate.template.js'
    }

    const template = fs.readFileSync(path.resolve(__dirname, templateFilename))
    const populatedTemplate = template.toString().replace(/{{moduleName}}/g, name).replace(/{{moduleKey}}/g, key)

    fs.mkdirSync(newModuleDirectory)
    fs.writeFileSync(path.resolve(newModuleDirectory, 'index.js'), populatedTemplate)
    fs.writeFileSync(path.resolve(newModuleDirectory, 'styles.lazy.scss'), '')
    console.log('created')
}

module.exports = generateModule
