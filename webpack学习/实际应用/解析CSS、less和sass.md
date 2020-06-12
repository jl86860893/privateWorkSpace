## 解析css
css-loader用于加载.css文件，并且转换成commonjs对象
style-loader将样式通过\<style>标签插入到head中

- npm i style-loader css-loader -D
```js
module: {
  rules: [
    {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader',
      ]
    }
  ]
}
```

## 解析less (sass同理)
- npm i style-loader css-loader less less-loader -D
```js
module: {
  rules: [
    {
      test: /\.less$/,
      use: [
        'style-loader',
        'css-loader',
        'less-loader',
      ]
    }
  ]
}
```