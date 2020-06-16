
## 浏览器不兼容，需要写前缀
```css
.box {
  -moz-border-radius: 10px;
  -webkit-border-radius: 10px;
  -o-border-radius: 10px;
  border-radius: 10px;
}
```

## 自动补全（PostCSS插件autopresixer）
使用autoprefixer插件  
根据Can i use 规则（<a href="https://caniuse.com">https://caniuse.com</a>）
>$ npm i postcss-loader autoprefixer -D
```js
module.exports: {
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => {
                require('autoprefixer')({
                  browsers: ["last 2 version", ">1%", "ios 7"]
                })
              }
            }
          }
        ]
      }
    ]
  }
}
```