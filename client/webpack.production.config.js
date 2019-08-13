﻿import webpack from 'webpack';
import Config from 'webpack-config';

export default new Config().extend('webpack.base.config.js').merge({
  output: {
    filename: '[name].bundle.[hash].min.js',
    path: path.resolve(__dirname, '/client/build')
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true
      }
    })
  ]
});
