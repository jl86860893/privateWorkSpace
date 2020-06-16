## 方法一：利用HtmlWebpackExternalPlugin进行公共脚本分离
>npm i html-webpack-externals-plugin -D
```js
const HtmlWebpackExternalPlugin = require('html-webpack-externals-plugin')

module.exports = {
  plugins: [
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: 'react',
          entry: 'https://unpkg.com/react@16/umd/react.production.min.js', // cdn地址或本地路径
          global: 'React',
        },
        {
          module: 'react-dom',
          entry: 'https://unpkg.com/react-dom@16/umd/react-dom.production.min.js',
          global: 'ReactDom',
        },
      ]
    })
  ]
}
```
再在\<head>中添加两个script的cdn


## 方法二：利用SpliteChunksPlugin进行公共脚本分离
webpack4内置的，替代CommonsChunckPlugin插件

chunks参数说明：
- `async` 异步引入的库进行分离
- `initial` 同步引入的库进行分离
- `all` 所有引入的库进行分离（推荐）
### splitChunks使用
```js
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'async',  // 推荐all
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        }
      }
    }
  }
}
```

### 利用SplitChunksPlugin分离基础包
test匹配出需要分离的包
```js
module.exports = {
  optimization: {
    splitChunks: {
      cacheGroup: {
        commons: {
          test: /(react|react-dom)/,
          name: 'vendors',
          chunks: 'all',
        }
      }
    }
  },
}
```
dist目录生成vendors_a064e477.js放React和ReactDom的公共代码，大小110k