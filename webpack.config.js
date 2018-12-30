// const index = require('./config/webpack/index');

// module.exports = index;

const path = require('path');

const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// editor webpack plugin
// const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.tsx',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'cheap-eval-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: "awesome-typescript-loader"
            },
            {
                enforce: "pre",
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "source-map-loader"
            },
            {
                test: /\.(sass|scss)$/i,
                loaders: [
                    'css-loader?minimize',
                    'sass-loader'
                ]
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: "css-loader" }
                    ]
                })
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    'url-loader?limit=10000',
                    'img-loader'
                ]
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: "less-loader" }
                    ]
                })
            }
        ]
    },
    optimization: {
        runtimeChunk: true,
        splitChunks: {
            chunks: "initial",
            cacheGroups: {
                default: false,
                vendor: {
                    test: /node_modules/,
                    chunks: 'initial',
                    name: 'vendor',
                    priority: 10,
                    enforce: true
                }
            }

        },
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        }),
        new ExtractTextPlugin({
            filename: "[name].[hash].css"
        })
        // new MonacoWebpackPlugin(webpack)
    ],
    devServer: {
        historyApiFallback: true
    },
    resolve: {
        alias: {
            'pages': path.resolve(__dirname, 'src/pages'),
            'components': path.resolve(__dirname, 'src/components'),
            'interface': path.resolve(__dirname, 'src/interface'),
            'utils': path.resolve(__dirname, 'src/utils'),
            'store': path.resolve(__dirname, 'src/store')
        },
        extensions: ['.tsx', '.ts', '.js', '.jsx']
    }
};