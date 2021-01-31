
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: ["babel-polyfill", "./src/index.js"],
  output: {
    filename: './ded.main.js',
    // export to AMD, CommonJS, or window
    libraryTarget: 'umd',
    // the name exported to window
    library: 'dedLog'
  },
  //用到的模块
  module: {
    rules: [
      {
        test:/(\.jsx|\.js)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ["@babel/plugin-transform-arrow-functions", "@babel/plugin-transform-parameters"]
          }
        }
      }
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
  ]
};