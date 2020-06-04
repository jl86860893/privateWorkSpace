'use strict'

const fs = require('fs')

module.exports = {
  entry: {
    app: './src/app.js',
    search: './src/search.js',
  },
  output: {
    filename: '[name].js',  // 通过占位符确保文件命名的唯一  app和search
    path: __dirname + '/dist'
  },
  module: {
    rules: [
      {test: /.js$/, use: 'babel-loader'}
    ]
  },
  mode: 'production',
}