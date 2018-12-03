'use strict';

const webpack = require('webpack');
const Base = require('./webpack.config.base.js');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const srcPath = __dirname + '/../src';
const outputPath = __dirname + '/../build';

module.exports = {

  ...Base,

  mode: 'development',

  entry: {
    app: [srcPath + '/index.jsx', srcPath + '/assets/styles/main.scss']
  },

  module: {
    rules: [
      ...Base.module.rules,
      {
        test: /\.scss/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                autoprefixer({
                  browsers: [
                    '>0.5%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9',
                  ],
                  flexbox: 'no-2009'
                }),
              ],
              sourceMap: true
            }
          },
          'sass-loader'
        ]
      },
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
