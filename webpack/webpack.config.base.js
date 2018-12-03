'use strict';

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const srcPath = __dirname + '/../src';
const outputPath = __dirname + '/../build';

module.exports = {

  output: {
    publicPath: '/',
    path: outputPath,
    filename: 'assets/js/[name].js?[hash]',
    library: '[name]'
  },

  module: {
    rules: [
      {
        test: /\.(eot|svg|otf|ttf|woff|woff2)$/,
        exclude: [/img/],
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/fonts/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(jp(e*)g|png|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8000,
              name: 'assets/img/[name].[ext]'
            }
          },
          {
            loader: 'image-webpack-loader'
          }
        ]
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].css?[hash]'
    }),
    new HtmlWebpackPlugin({
      template: path.join(srcPath + '/assets/index.html'),
      filename: 'index.html',
      path: outputPath
    }),
    new webpack.NamedModulesPlugin()
  ],


  resolve: {
    modules: [path.resolve(__dirname, '../src'), 'node_modules', path.resolve('node_modules')],
    extensions: ['.js', '.jsx', '.less', '.css', '.json'],
    alias: {
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components')
    }
  },

};
