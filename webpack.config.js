const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

var fileLoaderOptions = {
    hash: "sha512",
    digest: "hex",
    name: "[hash].[ext]"
};

module.exports = {
    context: path.resolve(__dirname, 'src'),// show wich folder webPack will use
    mode: 'development',
    entry: {
        main: './index.js',// build process begins.
        analytics: "./analytics.js"
    },
    output: {
        path: path.resolve(__dirname, 'dist'),//folder  where will be builded code
        filename: '[name].[contenthash].js'//file where will be builded code;  [name] - will replce for enty keyes
    },
    resolve: {
        extensions: ['.js', '.json'],//when we import somethimg can avoid writing this extenstions
        alias: {}
    },
    optimization: {
        splitChunks: {
            chunks: "all"
        }
    },
    plugins: [
        new HtmlWebpackPlugin({       //automatically connects the generated JavaScript files (output bundles) to your HTML file.
            template: "./index.html" //to be based on certain html
        }),
        new CleanWebpackPlugin() // doesnt create new files on every change 
    ],
    module: {
        rules: [
            {   //if toy have some other files insted of js and html you have to use loaders (they read other files)
                test: /\.css$/, // here you show wich type of files you want to check
                use: ['style-loader', 'css-loader'] //here you use special loaders for special files
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: fileLoaderOptions
                      },
                ]
            },
            {   //if toy have some other files insted of js and html you have to use loaders (they read other files)
                test: /\.(ttf|woff|woff2|eot)$/, // here you show wich type of files you want to check
                use: ['file-loader'] //here you use special loaders for special files
            },
        ]
    }
}