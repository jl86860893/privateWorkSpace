# 使用babel-loader
babel配置文件是.babelrc

```js
module.exports = {
  ...
  module: {
    rules:[
      {
        test: /\.js$/,
        use: 'babel-loader',
      },
    ]
  },
}
```

# 实例操作:解析ES6
> $ npm i @babel/core @babel/preset-env babel-loader -D

创建.babelrc
```js
{
  "presets": [
    "@babel/preset-env"  // 增加ES6的babel preset配置
  ],
  "plugins": [
    "@babel/proposal-class-properties"
  ]
}
```

webpack中配置babel-loader

# 实例操作:解析React JSX
> $ npm i @babel/core @babel/preset-env babel-loader -D
> $ npm i react react-dom @babel/preset-react -D

创建.babelrc
```js
{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react",  // 增加解析React的babel preset配置
  ],
  "plugins": [
    "@babel/proposal-class-properties"
  ]
}
```