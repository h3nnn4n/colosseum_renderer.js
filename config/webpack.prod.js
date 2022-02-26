const { merge } = require('webpack-merge')

const paths = require('./paths')
const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'production',
  devtool: false,
  output: {
    path: paths.build,
    publicPath: '/',
    filename: 'js/[name].bundle.js',
  },
  module: {
    rules: [
      // ?
    ],
  },
  plugins: [
    // ?
  ],
  optimization: {
    minimize: true,
    minimizer: ['...'],
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
})
