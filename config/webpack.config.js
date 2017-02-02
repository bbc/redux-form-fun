/**
 * @description Configuration for Webpack bundler.
 * Configuration Documentation: https://webpack.github.io/docs/configuration.html
 */

const BabiliPlugin = require('babili-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const SRC_PATH = path.join(__dirname, '..', 'src');
const NODE_MODULES_PATH = path.join(__dirname, '..', 'node_modules');

module.exports = {
  devtool: false,
  entry: { 'app': path.join(SRC_PATH, 'App.js') },
  module: {
    rules: [{
      include: [ SRC_PATH ],
      loader: 'babel-loader',
      query: {
        presets: [ 'es2015', 'react' ],
        plugins: []
      },
      test: /\.js$/
    }]
  },
  output: {
    path: './dist',
    filename: '[name].bundle.js'
  },
  plugins: [ ],
  resolve: {
    modules: [ SRC_PATH, NODE_MODULES_PATH ],
    extensions: ['.js']
  }
};
