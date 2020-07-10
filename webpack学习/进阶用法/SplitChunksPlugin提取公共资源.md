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
      minSize: 0,
      maxSize: 30000,
      minChunks: 1, // 引用一次就拆
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
        commons: {  // htmlWebpackPlugin中的chunks数组添加"commons"
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

# 其他实例：
```js
plugins: [
  // 多入口 - 生成 index.html
  new HtmlWebpackPlugin({
      template: path.join(srcPath, 'index.html'),
      filename: 'index.html',
      // chunks 表示该页面要引用哪些 chunk （即上面的 index 和 other），默认全部引用
      chunks: ['index', 'vendor', 'common']  // 要考虑代码分割
  }),
  // 多入口 - 生成 other.html
  new HtmlWebpackPlugin({
      template: path.join(srcPath, 'other.html'),
      filename: 'other.html',
      chunks: ['other', 'common']  // 考虑代码分割
  })
],
optimization: {
  // 压缩 css
  minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],

  // 分割代码块
  splitChunks: {
      chunks: 'all',
      /**
        * initial 入口 chunk，对于异步导入的文件不处理
          async 异步 chunk，只对异步导入的文件处理
          all 全部 chunk
        */

      // 缓存分组
      cacheGroups: {
          // 第三方模块
          vendor: {
              name: 'vendor', // chunk 名称
              priority: 1, // 权限更高，优先抽离，重要！！！
              test: /node_modules/,
              minSize: 0,  // 大小限制
              minChunks: 1  // 最少复用过几次
          },

          // 公共的模块
          common: {
              name: 'common', // chunk 名称
              priority: 0, // 优先级
              minSize: 0,  // 公共模块的大小限制
              minChunks: 2  // 公共模块最少复用过几次
          }
      }
  }
}
```