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

### 具体设置
>$ npm i glob -D
```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const glob = require('glob')

const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugins = [];

  const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'));

  Object.keys(entryFiles).map(index => {
    const entryFile = entryFiles[index];
    const match = entryFile.match(/src\/(.*)\/index\.js/);
    const pageName = match && match[1];

    entry[pageName] = entryFile;
    htmlWebpackPlugins.push(
      new HtmlWebpackPlugin({
        template: path.join(__dirname, `src/${pageName}/index.html`),
        filename: `${pageName}.html`,
        chunks: [pageName],  // 引入何种js=> [pageName].js
        inject: true,
        minify: {
          html5: true,
          collapseWhiteSpace: true,
          preserveLineBreaks: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: false
        }
      }),
    )

  })

  return {
    entry,
    htmlWebpackPlugins
  }
}

const { entry, htmlWebpackPlugin } = setMPA();

module.exports = {
  entry,
  ...
  plugins: [
    ...
  ].concat(htmlWebpackPlugins)
}
```