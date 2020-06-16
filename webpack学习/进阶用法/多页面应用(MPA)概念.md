每一次页面跳转的时候，后台服务器都会给返回一个新的html文档，这种类型的网站也就是多页网站，也叫做多页应用。

## 多页面打包基本思路
每个页面对应一个entry，一个html-webpack-plugin

缺点：每次新增或删除页面需要改webpack配置。

```js
module.exports = {
  entry: {
    index: './src/index.js',
    search: './src/search.js',
  }
}
```

## 多页面打包通用方案
动态获取entry和设置html-webpack-plugin数量

约定每个入口为index.js

利用glob.sync
- entry: glob.sync(path.join(__dirname, './src/*/index.js'))

```js
module,exports = {
  entry: {
    index: './src/index/index.js',
    search: './src/search/index.js',
  }
}
```