const merge = require('webpack-merge');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    entry: {
        'officebot-sdk2.js' : "./index.js",
        'officebot-sdk2.min.js' : "./index.js"
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        library: 'officebot-sdk2',
        libraryTarget: 'umd'
    },
    plugins: [
        new UglifyJSPlugin({
            include: /\.min\.js$/
        }),
        new CleanWebpackPlugin('dist'),
    ]
});