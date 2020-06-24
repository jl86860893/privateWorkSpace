## 说明
webpack除了可以用来打包应用，也可以用来打包js库

**实现一个大整数加法库的打包**
- 需要打包压缩版和非压缩版本
- 支持AMD/CJS/ESM模块引入

## 库的目录结构和打包要求
**打包输出的库名称：**
- 未压缩版large-number.js
- 压缩版large-number.min.js

**目录结构**
\+ |- / dist
\+     |- large-number.js
\+     |- large-number.min.js
\+ |- / webpack.config.js
\+ |- / package.json
\+ |- / index.js
\+ |- / src
\+     |- index.js

## 支持的使用方式
支持ES module
```js
import * as largeNumber from 'large-number';
```
支持CJS
```js
const largeNumbers = require('large-number');
```
支持AMD
```js
require(['large-number'], function)
```
可以直接使用script引入

## 如何将库暴露出去
library: 指定库的全局变量

libraryTarget： 支持库引入的方式

>npm init
>npm i webpack webpack-cli -D
创建webpack.config.js
```js
module.exports = {
  mode: "none",
  entry: {
    "large-number": "./src/index.js",
    "large-number.min": "./src/index.js",
  },
  output: {
    filename: "[name].js",
    library: "largeNumber",
    libraryExport: "default",
    libraryTarget: "umd",
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        include: /\.min\.js$/,
      }),
    ],
  }
}
```
mode如果是production默认使用terser  
uglify 3.0支持ES6压缩

## 设置入口文件
package.json的main字段为index.js
```json
{
  ...
  "main": "index.js",
  "deccription": "随便的包",
  "scripts": {
    "prepublish": "webpack",
  }
  ...
}
```
最外层新建index.js非src下的index.js
```js
if (process.env.NODE_ENV === "production") {
  module.exports = require("./dist/large-number.min.js");
} else {
  module.exports = require("./dist/large-number.js")
}
```

最后执行npm prepublish => npm publish发布包