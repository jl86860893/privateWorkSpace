## DllPlugin动态链接库插件

webpack内置DllPlugin支持

DllPlugin打包出 `webpack.dll.js`
```js
const path = require('path')
const DllPlugin = require('webpack/lib/DllPlugin')
const { srcPath, distPath } = require('./paths')

module.exports = {
  mode: 'development',
  // JS 执行入口文件
  entry: {
    // 把 React 相关模块的放到一个单独的动态链接库
    react: ['react', 'react-dom']
  },
  output: {
    // 输出的动态链接库的文件名称，[name] 代表当前动态链接库的名称，
    // 也就是 entry 中配置的 react 和 polyfill
    filename: '[name].dll.js',
    // 输出的文件都放到 dist 目录下
    path: distPath,
    // 存放动态链接库的全局变量名称，例如对应 react 来说就是 _dll_react
    // 之所以在前面加上 _dll_ 是为了防止全局变量冲突
    library: '_dll_[name]',
  },
  plugins: [
    // 接入 DllPlugin
    new DllPlugin({
      // 动态链接库的全局变量名称，需要和 output.library 中保持一致
      // 该字段的值也就是输出的 manifest.json 文件 中 name 字段的值
      // 例如 react.manifest.json 中就有 "name": "_dll_react"
      name: '_dll_[name]',
      // 描述动态链接库的 manifest.json 文件输出时的文件名称
      path: path.join(distPath, '[name].manifest.json'),
    }),
  ],
}
```

DllReferencePlugin 使用dll `webpack.dev.js`
```js
const { smart } = require('webpack-merge')
const webpackCommonConf = require('./webpack.common.js')
// 第一，引入 DllReferencePlugin
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin');

module.exports = smart(webpackCommonConf, {
  ...
  module: {
    rules: [
        {
            test: /\.js$/,
            loader: ['babel-loader'],
            include: srcPath,
            exclude: /node_modules/ // 第二，不要再转换 node_modules 的代码
        },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
        // window.ENV = 'production'
        ENV: JSON.stringify('development')
    }),
    // 第三，告诉 Webpack 使用了哪些动态链接库
    new DllReferencePlugin({
        // 描述 react 动态链接库的文件内容
        manifest: require(path.join(distPath, 'react.manifest.json')),
    }),
  ],
})

```