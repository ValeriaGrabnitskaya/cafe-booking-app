import Config from 'webpack-config';

import HtmlWebpackPlugin from 'html-webpack-plugin';

const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

export default new Config().merge({
  entry: ["babel-polyfill", './src/app/index.js'],
  output: {
    path: path.resolve(__dirname, '/client/build')
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [['env', { modules: false }], 'stage-0', 'react']
          },
        },
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [{
            loader: "css-loader"
          }]
        })
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
        loader: 'url-loader?limit=100000&name=[name].[ext]'
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: './src/img',
            }
          },
        ],
      }
    ]
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        pathRewrite: { '^/api': '' },
      },
    }
  },
  plugins: [
    new ExtractTextPlugin("[name].bundle.[hash].css"),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      inject: "body"
    })],
});
