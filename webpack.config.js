const path = require("path");
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
var env = process.env.WEBPACK_ENV;
module.exports = {
    externals: {
        React: 'react'
    },
    entry: {
      landing: [path.resolve(__dirname, "src", "Components", "LandingPage","Injector.jsx"),
            path.resolve(__dirname, "src", "Components", "LandingPage", "Controller.jsx")
       ],
      signup: [path.resolve(__dirname, "src","Components", "UserManagement","LoginSignup", "Injector.jsx"),
            path.resolve(__dirname, "src", "Components", "UserManagement","LoginSignup", "Controller.jsx"),
            path.resolve(__dirname, "src", "Components","UserManagement", "Home", "Controller.jsx")
       ],
       home: [path.resolve(__dirname, "src", "Components","UserManagement", "Home", "Injector.jsx"),
            path.resolve(__dirname, "src", "Components","UserManagement", "Home", "Controller.jsx")
       ],
       profile: [path.resolve(__dirname, "src", "Components", "UserManagement", "Profile", "Injector.jsx"),
            path.resolve(__dirname, "src", "Components", "UserManagement", "Profile", "Controller.jsx")
       ],
    },
    output: {
        path: path.resolve(__dirname, "src", "pages","js"),
        filename: "[name].js",
        publicPath: './'
    },
    module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
            }
          },
          {
          test: /\.svg$/,
          use: [
            {
              loader: 'svg-url-loader',

            },
          ],
        },
          {
            test: /\.css$/,
            exclude: /node_modules/,
            use: [
            { loader: 'style-loader' },
            { loader: 'css-loader' }
       ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.(png|jp(e*)g|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/[hash]-[name].[ext]',
            },
          },
        ]
      }
        ]
    },
    mode: "development",
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin({
      template: "./src/pages/landing-page.html",
      filename: "./src/pages/landing-page.html"
    })
    ],
    devServer: {
        contentBase: "./",
        hot: true,
        historyApiFallback: true
    },

};