const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  devtool: 'inline-source-map',
  watch :  true,
  plugins: [
    new CleanWebpackPlugin('dist'),
  ],
  output: {
    filename: 'officebot-sdk2.js',
    path: path.resolve(__dirname, 'dist')
}
});