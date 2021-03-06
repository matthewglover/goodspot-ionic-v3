'use strict';


var path = require('path');
var webpack = require('webpack');

module.exports = {

  entry: {
    app: getEntrySources(['./app/main.js'])
  },

  output: {
    path: './www/assets',
    publicPath: '/assets/',
    filename: 'bundle.js'
  },

  devtool: 'source-map',

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: [/node_modules/, /bower_components/]
      },
      {
        test: /\.html$/,
        loader: 'raw',
        exclude: [/node_modules/, /bower_components/]
      },
      {
        test   : /\.css$/,
        loader : 'style!css',
      },
      {
        test   : /\.scss$/,
        loader : 'style!css!sass?outputStyle=expanded'
      },
      {
        test   : /\.woff/,
        loader : 'url?prefix=font/&limit=10000&mimetype=application/font-woff'
      },
      {
        test   : /\.ttf/,
        loader : 'file?prefix=font/'
      },
      {
        test   : /\.eot/,
        loader : 'file?prefix=font/'
      },
      {
        test   : /\.svg/,
        loader : 'file?prefix=font/'
      },
      {
        test   : /\.png$/,
        loader : 'url?mimetype=image/png'
      },
      {
        test   : /[\/]angular\.js$/,
        loader : 'exports?angular'
      },
      {
        test   : /[\/]ionic\.js$/,
        loader : 'exports?ionic'
      }
    ],

    noParse: /bower_components/
  },

  resolve: {
    root: [
      path.join(__dirname, 'app'),
      path.join(__dirname, 'bower_components'),
      path.join(__dirname, 'node_modules')
    ]
  },

  plugins: [
    new webpack.ResolverPlugin(
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin(
        'bower.json', ['main'])
    )
  ]
};




function getEntrySources(sources) {
  if (process.env.NODE_ENV !== 'production') {
    sources.push('webpack-dev-server/client?http://localhost:8080');
    sources.push('webpack/hot/dev-server');
  }

  return sources;
}
