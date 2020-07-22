const path = require('path');
const webpack = require('webpack')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const { HotModuleReplacementPlugin } = webpack;

module.exports = {
  entry: "./src/App.js",
  output: {
    filename: '[name]_[hash:8].js',
    path: __dirname + '/dist'
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => {
                require('autoprefixer')({
                  browsers: ["last 2 version", ">1%", "ios 7"]
                })
              }
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'img/[name]_[hash:8].[ext]'
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano')
    }),
    new MiniCssExtractPlugin({
      filename: `[name]_[contenthash:8].css`
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CleanWebpackPlugin(),
    new HotModuleReplacementPlugin(),
  ],
  devServer: {
    contentBase: './dist',  // 输出文件的路径
    hot:true  // 开启
  },
  devtool: 'source-map'
}