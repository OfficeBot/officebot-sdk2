const merge = require('webpack-merge');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    output: {
        filename: 'officebot-sdk2.min.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'officebot-sdk2',
        libraryTarget: 'umd'
    },
    plugins: [
        new UglifyJSPlugin(),
        new CleanWebpackPlugin('dist/officebot-sdk2.min.js'),
    ]
});