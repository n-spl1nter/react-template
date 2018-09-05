'use strict';

const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const Base = require('./webpack.config.base.js');

const srcPath = __dirname + '/../src';
const outputPath = __dirname + '/../build';

module.exports = {

  ...Base,

  mode: 'production',

  entry: {
    app: [srcPath + '/index_production.jsx', srcPath + '/assets/styles/main.less']
  },

  module: {
    rules: [
      ...Base.module.rules,
      {
        test: /\.js(x*)?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
        }
      }
    ]
  },

  plugins: [
    ...Base.plugins,
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify('production')
    }),
    new webpack.NoEmitOnErrorsPlugin()
  ],

  devtool: false,

  optimization: {
    //runtimeChunk: true,
    //splitChunks: { chunks: 'all' },
    minimizer: [
      new UglifyJSPlugin({
        uglifyOptions: {
          output: {
            comments: false
          },
          compress: {
            unsafe_comps: true,
            properties: true,
            keep_fargs: false,
            pure_getters: true,
            collapse_vars: true,
            unsafe: true,
            warnings: false,
            sequences: true,
            dead_code: true,
            drop_debugger: true,
            comparisons: true,
            conditionals: true,
            evaluate: true,
            booleans: true,
            loops: true,
            unused: true,
            hoist_funs: true,
            if_return: true,
            join_vars: true,
            drop_console: true
          }
        }
      })
    ]
  }

};