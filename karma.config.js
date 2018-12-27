const webpackConfig = require('./webpack.config')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function (config) {
    config.set({
        // 是否启动热部署，且当文件改变时自动进行测试
        autoWatch: true,

        // 持续积累模式
        // 若为true捕获浏览器运行测试然后离开
        singleRun: false,

        autoWatch: true,

        frameworks: ['mocha', 'chai'],

        files: [
            'test/**/*.js'
        ],

        preprocessors: {
            'test/**/*.spec.js': ['webpack', 'sourcemap']
        },

        reporters: ['mocha', 'coverage'],

        webpackServer: {
            noInfo: true
        },

        plugins: [
            'karma-coverage',
            'karma-webpack',
            'karma-mocha',
            'karma-chai',
            'karma-phantomjs-launcher',
            'karma-sourcemap-loader',
            'karma-mocha-reporter'
        ],

        webpack: {
            mode: 'development',
            module: {
                rules: [
                    {
                        test: /\.jsx?$/,
                        exclude: /node_modules/,
                        loader: 'babel-loader',
                        query: {
                            presets: ['es2015', 'react']
                        }
                    },
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
                ],
            },
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
            },
            plugins: [
                new ExtractTextPlugin({
                    filename: "[name].[hash].css"
                })
            ],
            watch: true
        },

        listenAddress: 'localhost',

        port: 9876,

        colors: true,

        browserify: {
            debug: true // for sourcemaps and easier debugging
        },

        coverageReporter: {
            reporters: [
                { type: 'lcov', dir: 'coverage', subdir: '.' },
                { type: 'text-summary', dir: 'coverage', subdir: '.' }
            ]
        },

        watched: true
    })
}