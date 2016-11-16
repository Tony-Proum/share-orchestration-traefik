var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require("path");
var purify = require("purifycss-webpack-plugin");

module.exports = {
    entry: "./app/main.js",
    output: {
        path: __dirname + '/build',
        filename: '/build/main.js'
    },
    resolve: {
        extensions: ['', '.js'],
        modulesDirectories: ['./node_modules']
    },
    module: {
        loaders: [
            {
                test: /\.html$/,
                loader: 'html'
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file?name=assets/[name].[hash].[ext]'
            },
            {
                test: /\.scss$/,
                loader: "style-loader!css-loader!sass-loader?outputStyle=expanded&includePaths[]=" + __dirname + '/app/css'
            }
        ],
        preLoaders: [
            {
                test: /\.js$/,
                include: pathToRegExp(path.join(__dirname, "app")),
                loader: "jshint-loader"
            }
        ]
    },
    amd: {jQuery: true},
    plugins: [
        new webpack.optimize.LimitChunkCountPlugin({maxChunks: 20}),
        new HtmlWebpackPlugin({
            template: 'app/index.html'
        }),
        new purify({
            basePath: __dirname,
            paths: [
                'app/**/*.html'
            ]
        })
    ],
    sassLoader: {
        includePaths: [path.resolve(__dirname, "node_modules")]
    }
};
function escapeRegExpString(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}
function pathToRegExp(p) {
    return new RegExp("^" + escapeRegExpString(p));
}