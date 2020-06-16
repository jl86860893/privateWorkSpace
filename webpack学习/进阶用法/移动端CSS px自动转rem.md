## 旧方式：CSS媒体查询实现响应式布局
缺陷：需要写多套适配样式代码
```css
@media screen and (max-width: 980px) {
  .header {
    width: 900px;
  }
}
@media screen and (max-width: 480px) {
  .header {
    width: 400px;
  }
}
@media screen and (max-width: 350px) {
  .header {
    width: 300px;
  }
}
```

## rem是什么
w3c对rem的定义： font-size of the root element

rem和px的对比：
  - rem是相对单位
  - px是绝对单位

## 移动端CSS px 自动转rem
使用`px2rem-loader`
页面渲染时计算根元素的font-size值
- 可以使用手机淘宝的lib-flexible库 <a href="https://github.com/amfe/lib-flexible">https://github.com/amfe/lib-flexible</a>

>$ npm i px2rem-loader -D

>$ npm i lib-flexible -S

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
            loader: 'px2rem-loader',
            options: {
              remUnit: 75,  // 一个rem为75px
              remPrecision: 8, // rem小数点后面的位数
            }
          }
        ]
      }
    ]
  }
}
```

lib-flexible的js源码直接引用到html的head中：
>```<script type="text/javascript">...源码粘贴</script>```

***后续使用静态资源内联方式将lib-flexible引入***
>\<script>${require('raw-loader!babel-loader!../node_modules/lib-flexible')}\</script>