const path = require('path');

module.exports = {
    entry: './index.js',
    mode : 'none',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                    presets: ['babel-preset-env']
                    }
                }
            }
        ]
    }
};