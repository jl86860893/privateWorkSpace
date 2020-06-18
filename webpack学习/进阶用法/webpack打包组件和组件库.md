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