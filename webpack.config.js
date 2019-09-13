'use strict'

const CleanWebpackPlugin = require('clean-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const path = require('path')

const distDir = path.resolve(__dirname, 'public')
const isDev = process.env.npm_lifecycle_event !== 'build-package'

const baseConfig = {
  context: path.resolve(__dirname, 'src'),

  resolve: {
    extensions: ['.js']
  },

  devtool: 'source-map',

  watch: isDev,

  watchOptions: {
    poll: 1000
  },

  optimization: {
    minimizer: [
      new TerserWebpackPlugin(),
      new OptimizeCSSAssetsPlugin()
    ]
  },

  plugins: [
    new CleanWebpackPlugin({
      dry: isDev
    })
  ]
}

const clientConfig = {
  ...baseConfig,

  entry: './client.js',

  output: {
    filename: 'client.js',
    path: distDir
  },

  plugins: [
    new CopyWebpackPlugin([
      { from: 'html', to: distDir },
      { from: 'shared', to: distDir }
    ])
  ]
}

const serverConfig = {
  ...baseConfig,

  entry: './server.js',

  output: {
    filename: 'server.js',
    path: distDir,
    library: '',
    libraryTarget: 'commonjs2'
  }
}

module.exports = [clientConfig, serverConfig]
