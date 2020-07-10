# 单入口 entry是一个字符串
```js
module.exports = {
  entry: '入口文件path'
}
```

# 多入口：entry是一个对象
```js
module.exports = {
  entry: {
    app: './src/app.sj',
    adminApp: './src/adminApp.js'
  }
}
```
## 实例
需要package.json引用到
> "webpack": "^4.28.4",  
  "webpack-dev-middleware": "^3.5.0",  
  "webpack-hot-middleware": "^2.24.3",
```js
const fs = require('fs')
const path = require('path')

module.exports = {
  /**
   * 我们会在 当前（__dirname） 目录下建多个子目录
   * 我们会把不同的 demo 放到不同的子目录中
   * 每个子目录的下会创建一个 app.ts
   * app.ts 作为 webpack 构建的入口文件
   * entries 收集了多目录个入口文件，并且每个入口还引入了一个用于热更新的文件
   * entries 是一个对象，key 为目录名
   */
  entry: fs.readdirSync(__dirname).reduce((entries, dir) => {
    const fullDir = path.join(__dirname, dir)
    const entry = path.join(fullDir, 'app.ts')
    if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)) {
      // 配置热更新
      entries[dir] = ['webpack-hot-middleware/client', entry]
    }

    return entries
  }, {}),
}
```

plus:
配置文件中entry接受三种形式的值：字符串，数组和对象
key还可以是路径字符串。此时webpack会自动生成路径目录，并将路径的最后作为[name]。这个特性在多页面配置下也是很有用的
```js
entry: {
    'path/of/entry': './deep-app.js',
    'app': './app.js'
},
output: {
    path: './output',
    filename: '[name].js'
}
```

value如果是数组，则数组中元素需要是上面描述的合理字符串值。数组中的文件一般是没有相互依赖关系的，但是又处于某些原因需要将它们打包在一起。比如：
```js
entry: {
    vendor: ['jquery', 'lodash']
}
```

```js
entry: ['./app.js', 'lodash']
等价于
entry: {
    main: ['./app.js', 'lodash']
}
```