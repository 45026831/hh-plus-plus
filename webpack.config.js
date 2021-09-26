/* eslint-env node */
const path = require('path')

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        filename: 'hh-plus-plus.user.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
        ]
    },
    // devtool: 'inline-cheap-source-map'
}
