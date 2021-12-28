const fs = require('fs')
const path = require('path')

const generateModule = (name, key) => {
    if (!name || !key) {
        console.error('cannot create module: missing argument(s)')
        return
    }
    const newModuleDirectory = path.resolve(__dirname, '../src/modules', name)

    // Check if already exists
    if (fs.existsSync(newModuleDirectory)) {
        console.error('cannot create module: path already exists')
        return
    }
    console.log('creating module with name', name, 'and key', key)

    const template = fs.readFileSync(path.resolve(__dirname, './index.boilerplate.template.js'))
    const populatedTemplate = template.toString().replace(/{{moduleName}}/g, name).replace(/{{moduleKey}}/g, key)

    fs.mkdirSync(newModuleDirectory)
    fs.writeFileSync(path.resolve(newModuleDirectory, 'index.js'), populatedTemplate)
    fs.writeFileSync(path.resolve(newModuleDirectory, 'index.scss'), '')
    console.log('created')
}

module.exports = generateModule
