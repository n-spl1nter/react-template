'use strict';

const webpack = require('webpack');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const srcPath = __dirname + '/../src';
const outputPath = __dirname + '/../build';
const Base = require('./webpack.config.base.js');

module.exports = {

  ...Base,

  mode: 'development',

  entry: {
    app: [srcPath + '/index.jsx', srcPath + '/assets/styles/main.less']
  },

  module: {
    rules: [
      ...Base.module.rules,
      {
        test: /\.js(x*)?$/,
        enforce: 'pre',
        use: 'eslint-loader',
      },
      {
        test: /\.js(x*)?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
          plugins: [
            'react-hot-loader/babel',
            ['@babel/plugin-proposal-decorators', {legacy: true}],
            '@babel/plugin-transform-classes'
          ],
          presets: [
            ['@babel/env', {targets: '> 0.25%, not dead'}],
            '@babel/react'
          ]
        }
      },
    ]
  },

  watch: true,

  watchOptions: {
    aggregateTimeout: 100
  },

  devtool: 'eval-source-map',

  plugins: [
    ...Base.plugins,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify('development')
    }),
  ],

  devServer: {
    contentBase: outputPath,
    port: 8080,
    hot: true,
    historyApiFallback: true,
    inline: true
  }

};