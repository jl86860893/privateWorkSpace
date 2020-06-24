## 优势
减少白屏时间

对于SEO友好

## SSR代码实现思路
**服务端**
- 使用 react-dom/server 的 renderToString 方法将React组件渲染成字符串。
- 服务端路由返回对应的模板

**客户端**
- 打包出针对服务端的组件

package.json
```json
{
  "scripts": {
    "build:ssr": "webpack --config webpack.ssr.js",
  },
}
```
## 服务端代码
>npm i express -D
```js
// window无法在服务端解析
if(typeof window === 'undefined') {
  global.window = {}
}

const fs = require('fs');
const path = require('path');
const express = require('express');
const { renderToString } = require('react-dom/server');
/**  template
 * `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
      </head>
    <body>
      <div id="root"><!--HTML_PLACEHOLDER--></div>
      <!--INITIAL_DATA_PLACEHOLDER-->
    </body>
    </html>
  `
 */
const template = fs.readFileSync(path.join(__dirname, '../dist/search.html'), 'utf-8');
/**
 * 在search.html中添加占位：
 * <!--HTML_PLACEHOLDER-->  处理样式=>替换 rederToString(SSR)即'../dist/search-server'中的代码片段
 * <!--INITIAL_DATA_PLACEHOLDER-->  处理数据 => 直接替换为<script>包裹的data
 */
const data = require('./data.json');

const SSR = require('../dist/search-server')

function server = (port) => {
  const app = express();

  app.use(express.static('dist'));

  app.get('/search', (req, res) => {
    const html = renderMarkup(rederToString(SSR));
    res.status(200).send(html);
  });

  app.;isten(port, () => {
    console.log('Server is running on port:')
  })
}

server(process.env.PORT || 3000);

const renderMarkup = (str) => {
    const dataStr = JSON.stringify(data);
    return template.replace('<!--HTML_PLACEHOLDER-->', str)
        .replace('<!--INITIAL_DATA_PLACEHOLDER-->', `<script>window.__initial_data=${dataStr}</script>`);
}
```

## 客户端
```js
'use strict';

// import React from 'react';
// import largeNumber from 'large-number';
// import logo from './images/logo.png';
// import './search.less';
const React = require('react');
const largeNumber = require('large-number');
const logo = require('./images/logo.png');
const s = require('./search.less');

class Search extends React.Component {

    constructor() {
        super(...arguments);

        this.state = {
            Text: null
        };
    }

    loadComponent() {
        import('./text.js').then((Text) => {
            this.setState({
                Text: Text.default
            });
        });
    }

    render() {
        const { Text } = this.state;
        const addResult = largeNumber('999', '1');
        return <div className="search-text">
            {
                Text ? <Text /> : null
            }
            { addResult }
            搜索文字的内容<img src={ logo } onClick={ this.loadComponent.bind(this) } />
        </div>;
    }
}

module.exports = <Search />;
```
## webpack.ssr.js文件
```js
const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugins = [];
  // 对于ssr文件，统一命名index-server.js
  const entryFiles = glob.sync(path.join(__dirname, './src/*/index-server.js'));

  Object.keys(entryFiles)
    .map((index) => {
        const entryFile = entryFiles[index];

        const match = entryFile.match(/src\/(.*)\/index-server\.js/);
        const pageName = match && match[1];

        if (pageName) {
          entry[pageName] = entryFile;
          htmlWebpackPlugins.push(
            new HtmlWebpackPlugin({
              inlineSource: '.css$',
              template: path.join(__dirname, `src/${pageName}/index.html`),
              filename: `${pageName}.html`,
              chunks: ['vendors', pageName],
              inject: true,
              minify: {
                html5: true,
                collapseWhitespace: true,
                preserveLineBreaks: false,
                minifyCSS: true,
                minifyJS: true,
                removeComments: false
              }
            })
          );
        }
      });

  return {
    entry,
    htmlWebpackPlugins
  }
}

const { entry, htmlWebpackPlugins } = setMPA();

module.exports = {
  entry: entry,
  output: {
    path: path.join(__dirname, 'dist'),
    // 输出到dist目录，名字要与server端引入的一致
    filename: '[name]-server.js',
    libraryTarget: 'umd'
  },
  ...
}
```

## webpack ssr 打包存在的问题
**浏览器全局变量（Node.js中没有 document， window）**
- 组件适配： 将不兼容的组件根据打包环境进行适配
- 请求适配： 将fetch 或者 ajax 发送请求的写法改成 isomorphic-fetch 或者 axios

**样式问题（Node.js无法解析 css）**
- 方案一： 服务端打包通过ignore-loader 忽略掉CSS的解析
- 方案二： 将style-loader 替换成 isomorphic-style-loader

```js
// window无法在服务端解析
if(typeof window === 'undefined') {
  global.window = {}
}

const fs = require('fs');
const path = require('path');
const express = require('express');
const { renderToString } = require('react-dom/server');
/**  template
 * `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
      </head>
    <body>
      <div id="root"><!--HTML_PLACEHOLDER--></div>
      <!--INITIAL_DATA_PLACEHOLDER-->
    </body>
    </html>
  `
 */
const template = fs.readFileSync(path.join(__dirname, '../dist/search.html'), 'utf-8');
/**
 * 在search.html中添加占位：
 * <!--HTML_PLACEHOLDER-->  处理样式=>替换 rederToString(SSR)即'../dist/search-server'中的代码片段
 * <!--INITIAL_DATA_PLACEHOLDER-->  处理数据 => 直接替换为<script>包裹的data
 */
const data = require('./data.json');

const SSR = require('../dist/search-server')

function server = (port) => {
  const app = express();

  app.use(express.static('dist'));

  app.get('/search', (req, res) => {
    const html = renderMarkup(rederToString(SSR));
    res.status(200).send(html);
  });

  app.;isten(port, () => {
    console.log('Server is running on port:')
  })
}

server(process.env.PORT || 3000);

const renderMarkup = (str) => {
    const dataStr = JSON.stringify(data);
    return template.replace('<!--HTML_PLACEHOLDER-->', str)
        .replace('<!--INITIAL_DATA_PLACEHOLDER-->', `<script>window.__initial_data=${dataStr}</script>`);
}
```