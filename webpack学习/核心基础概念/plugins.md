用于输出文件的优化，资源管理，环境变量注入。
> 作用于整个构建过程。

常见的plugins
- CommonsChunkPlugin  将chunks相同的模块代码提取成公共js
- CleanWebpackPlugins 清理构建目录
- ExtractTextWebpackPlugin 将css从bundle文件里提取成一个独立的css文件
- CopyWebpackPlugin 将文件或者文件夹拷贝到构建的输出目录
- HtmlWebpackPlugin 创建html文件去承载输出的bundle
- UglifyjsWebpackPlugin 压缩js
- ZipWebpackPlugin 将打包的资源生成一个zip包

```js
const path = require('path')

// 放到plugins数组里
module.exports = {
  output: {
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
}
```