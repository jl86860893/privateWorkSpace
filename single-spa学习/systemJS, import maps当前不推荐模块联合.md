# import maps?
这个提案允许控制 js的 `import`语句或者`import()`表达式获取的库的url，<font color="#c7254e">并允许在非导入上下文中重用这个映射</font>。这就解决了非常多的问题，比如：

- 允许直接`import`标志符，就能在浏览器中运行，比如：`import moment from "moment"`
- 提供兜底解决方案，比如`import $ from "jquery"`，他先会去尝试去CDN引用这个库，如果CDN挂了可以回退到引用本地版本
- 开启对一些内置模块或者其他功能的polyfill
- 共享import标识符在Javascript importing 上下文或者传统的url上下文，比如`fetch()`、`<img src="">`或者`<link href="">`

**他的主要机制是通过导入import map（模块和对应url的映射），然后我们就可以在HTML或者CSS中接受使用url导入模块的上下文替换成`import:` URL scheme来导入模块。**
  
## usage
```
https://www.jianshu.com/p/b23d823a183a?open=1
```

# 为什么使用systemjs
可以在浏览器中引入esm包吗？

index.html
```html
<script src="./main.js"></script>
```

main.js
```js
import Vue from 'https://cdn.bootcdn.net/ajax/libs/vue/2.5.18/vue.esm.browser.js'

console.log(Vue)
```

报错 `Uncaught SyntaxError: Cannot use import statement outside a module`

>如果type属性为module，代码会被当作JavaScript模块 。

index.html
```html
<script type='module' src="./main.js"></script>
```

more then?
能否像在日常开发中那样写代码，如:
```js
import React from "react"
```

没有npm，没有node_modules，通过网络资源加载

此时要用上 Import maps
```js
    <script type="importmap">
        {
          "imports": {
            "react": "https://unpkg.com/react@16/umd/react.development.js",
          }
        }
    </script>
```

但浏览器不太支持～

此时system.js上场

## systemJS使用
index.html
```html
<script type="systemjs-importmap">
        {
          "imports": {
            "vue": "https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.js"
          }
        }
    </script>
  <body>
    <script type="systemjs-module" src="./main.js"></script>
    <div id="container">
        {{date}}
    </div>
    <script src='https://cdn.jsdelivr.net/npm/systemjs/dist/system.js'></script>
  </body>
```

main.js
```js
const vue = System.import("vue").then(e => {
    const Vue = e.default
    new Vue({
        el: '#container',
        data :{
            date: '2021'
        }
    })
})
```

# 查询所需的包是否有systemJs版本
```
https://github.com/esm-bundle
```