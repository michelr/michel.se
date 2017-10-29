const HTMLWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

var webpack = require("webpack");
var path = require('path')

module.exports = {
    entry: __dirname + '/assets/js/main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'static'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [path.resolve(__dirname, 'node_modules')],
                loader: "babel-loader"
            },
            {
                test: /\.sass$/,
                use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: "css-loader?sourceMap&localIdentName=[local]___[hash:base64:5]!resolve-url-loader!sass-loader?outputStyle=expanded&sourceMap"
                })
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff"
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader"
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=16384&name=./img/[hash].[ext]' 
            }
        ]
    },
    devtool: 'source-map',
    externals: {
        jquery: 'jQuery'
    },
    
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production')
            }
        }),
        new HTMLWebpackPlugin({
            template: __dirname + '/assets/webpack_templates/base.html',
            filename: __dirname + '/templates/layout.html',
            inject: false,
            hash: true
        }),
        new ExtractTextPlugin({
			filename: "style.css",
			disable: false,
			allChunks: true
        }),
        new FaviconsWebpackPlugin({
            logo: __dirname + '/assets/img/favicon.png',
            prefix: 'icons/',
            persistentCache: true,
            inject: false,
            icons: {
              android: false,
              appleIcon: false,
              appleStartup: false,
              coast: false,
              favicons: true,
              firefox: false,
              opengraph: false,
              twitter: false,
              yandex: false,
              windows: false
            }
        })
    ]
};