const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const settings = {
  entry: {
    bundle: [
      "./src/frontend/index.js"
    ]
  },
  output: {
    filename: "[name].js",
    publicPath: "/js/",
    path: path.resolve("dist/js")
  },
  resolve: {
    extensions: [".js", ".json", ".css"]
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        options: {
          presets: [
            ["es2015", { modules: false }],
            "stage-2",
            "react"
          ],
          plugins: [
            "transform-node-env-inline"
          ],
          env: {
            development: {
              plugins: ["react-hot-loader/babel"]
            }
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 1,
              localIdentName: "[name]--[local]--[hash:base64:8]"
            }
          },
          "postcss-loader" // has separate config, see postcss.config.js nearby
        ]
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
     'process.env':{
       'NODE_ENV': JSON.stringify('production')
     }
   }),
   /*new webpack.optimize.UglifyJsPlugin({ //minify everything
     compress:{
       warnings: true
     }
   }),*/
   new webpack.optimize.AggressiveMergingPlugin(),//Merge chunks
   new UglifyJSPlugin(),
    //new webpack.optimize.UglifyJsPlugin()
    new HtmlWebpackPlugin(),
  ],
};

module.exports = settings;
