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
                test: /\.css$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        // { loader: "style-loader" },
                        { loader: "css-loader" }
                    ]
                })
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
        // splitChunks: {
        //   chunks: "initial",         // 必须三选一： "initial" | "all"(默认就是all) | "async"
        //   minSize: 0,                // 最小尺寸，默认0
        //   minChunks: 1,              // 最小 chunk ，默认1
        //   maxAsyncRequests: 1,       // 最大异步请求数， 默认1
        //   maxInitialRequests: 1,     // 最大初始化请求书，默认1
        //   name: () => { },            // 名称，此选项课接收 function
        //   cacheGroups: {                // 这里开始设置缓存的 chunks
        //     priority: "0",              // 缓存组优先级 false | object |
        //     vendor: {                   // key 为entry中定义的 入口名称
        //       chunks: "initial",        // 必须三选一： "initial" | "all" | "async"(默认就是异步)
        //       test: /react|lodash/,     // 正则规则验证，如果符合就提取 chunk
        //       name: "vendor",           // 要缓存的 分隔出来的 chunk 名称
        //       minSize: 0,
        //       minChunks: 1,
        //       enforce: true,
        //       maxAsyncRequests: 1,       // 最大异步请求数， 默认1
        //       maxInitialRequests: 1,     // 最大初始化请求数，默认1
        //       reuseExistingChunk: true   // 可设置是否重用该chunk（查看源码没有发现默认值）
        //     }
        //   }
        // },
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
    resolve: {
        alias: {
            'pages': path.resolve(__dirname, 'src/pages'),
            'components': path.resolve(__dirname, 'src/components'),
            'context': path.resolve(__dirname, 'src/context'),
            'interface': path.resolve(__dirname, 'src/interface'),
            'utils': path.resolve(__dirname, 'src/utils'),
            'store': path.resolve(__dirname, 'src/store')
        },
        extensions: ['.tsx', '.ts', '.js', '.jsx']
    }
};