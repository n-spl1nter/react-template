'use strict';

const webpack = require('webpack');
const path = require('path');
const outputPath = __dirname + '/build';
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const NODE_ENV = process.env.NODE_ENV || 'dev';

module.exports = {

    entry: {
        app: __dirname + '/src/index.jsx'
    },

    output: {
        path: outputPath,
        filename: "[name].js",
        library:  "[name]"
    },

    watch: NODE_ENV === 'dev',

    watchOptions: {
        aggregateTimeout: 100
    },

    devtool: NODE_ENV === 'dev' ? "eval-source-map" : false,

    module: {
        loaders: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    plugins: ['transform-runtime'],
                    presets: ['es2015', 'stage-0', 'react']
                }
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    autoprefixer({
                                        browsers:['ie >= 10', 'last 12 version']
                                    })
                                ],
                                sourceMap: NODE_ENV === 'dev'
                            }
                        },
                        'less-loader'
                    ]
                })
            },
            {
                test: /\.(eot|svg|otf|ttf|woff|woff2)$/,
                use: 'file-loader'
            },
            {
                test: /\.(jpg|png|gif)$/,
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            progressive: true,
                            optimizationLevel: 7,
                            interlaced: false,
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            }
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, './src/assets/index.html'),
            filename: 'index.html',
            path: outputPath
        }),
        new ExtractTextPlugin('[name].css', {allChunks: true}),
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV)
        }),
        new webpack.NamedModulesPlugin()
    ],

    devServer: {
        contentBase: outputPath,
        port: 8080,
        hot: true,
        historyApiFallback: true,
        inline: true
    }

};


if (NODE_ENV === 'prod') {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings:     false,
                drop_console: true,
                unsafe:       true
            }
        })
    );
}
