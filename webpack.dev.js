const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: './dist',
    },
    compress: true,
    port: 9000,
    host: '0.0.0.0',
    hot: false,
    liveReload: true,
    open: false,
    historyApiFallback: true,
  },
});