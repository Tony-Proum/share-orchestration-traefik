var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var purify = require('purifycss-webpack-plugin');

module.exports = {
    entry: ['./app/main.js'],
    output: {
        path: path.join(__dirname, '/lib'),
        filename: '[name].js',
        library: 'Utils',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    resolve: {
        extensions: ['', '.js'],
        modulesDirectories: ['app', 'node_modules']
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
                loader: 'style-loader!css-loader!sass-loader'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader?outputStyle'
            }
        ],
        preLoaders: [
            {
                test: /\.js$/,
                include: pathToRegExp(path.join(__dirname, 'app')),
                loader: 'jshint-loader'
            }
        ]
    },
    amd: {jQuery: true},
    plugins: [
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
        includePaths: [path.resolve(__dirname, 'node_modules')]
    }
};
function escapeRegExpString(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}
function pathToRegExp(p) {
    return new RegExp('^' + escapeRegExpString(p));
}