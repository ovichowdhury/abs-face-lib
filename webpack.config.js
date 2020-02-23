const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'absFaceLib.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'absFaceLib',
        // libraryTarget: 'window',
        // libraryExport: 'default'
    },
};