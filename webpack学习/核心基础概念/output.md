# 单入口配置
```js
module.exports = {
  entry: './path/to/my/entry/file.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist',
  }
}
```

# 多入口配置
```js
module.exports = {
  entry: {
    app: './src/app.js',
    search: './src/search.js',
  },
  output: {
    filename: '[name].js',  // 通过占位符确保文件命名的唯一  app和search
    path: __dirname + '/dist'
  }
}
```