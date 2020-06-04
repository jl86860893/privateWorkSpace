- babel-loader 用babel来转换ES6文件到ES5
- style-loader 将css添加到DOM的内联样式标签style里
- css-loader 允许将css文件通过require的方式引入，并返回css代码
- less-loader 处理less
- sass-loader 处理sass
- ts-loader 处理typescript
- file-loader 分发文件到output目录并返回相对路径
- postcss-loader 用postcss来处理CSS
- raw-loader 
- thread-loader 多进程打包

```js
// test指定匹配规则， use指定使用的loader名称
module.exports = {
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {test: /\.txt$, use: 'raw-loader'},
    ]
  }
}
```