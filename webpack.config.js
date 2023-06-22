
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: "all"
        }
    }
    if (isProd) {
        config.minimizer = [
            new TereserWebpackPlugin()
        ]
    }
    return config

}

const fileName = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`

const cssLoaders =

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
        devServer: {
            port: 4200,
            hot: isDev
        },

        module: {
            rules: [
                {   //if toy have some other files insted of js and html you have to use loaders (they read other files)
                    test: /\.css$/, // here you show wich type of files you want to check
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            // feature in webpack that allows you to update modules in your application during development
                        }, 'css-loader', 'postcss-loader'] //here you use special loaders for special files
                },
                {
                    test: /\.scss$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                        }, 'css-loader', 'sass-loader']
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: 'asset/resource', //way to build png|svg|jpg|jpeg|gif
                },
                {   //if toy have some other files insted of js and html you have to use loaders (they read other files)
                    test: /\.(ttf|woff|woff2|eot)$/, // here you show wich type of files you want to check
                    // use: ['file-loader'] //here you use special loaders for special files
                    type: 'asset/resource',
                },
                {
                    test: /\.m?js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                },
                {
                    test: /\.ts$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-typescript']
                        }
                    }
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({       //automatically connects the generated JavaScript files (output bundles) to your HTML file.
                template: "./index.html",  //to be based on certain html
                minify: {
                    collapseWhitespace: isProd //delete all spaces
                }
            }),
            new CleanWebpackPlugin(),// doesnt create new files on every change
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: path.resolve(__dirname, 'src/favicon.ico'),
                        to: path.resolve(__dirname, 'dist')
                    }
                ]
            }),
            new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }), //make separate css file better for optimization and so on.....
        ],
    }