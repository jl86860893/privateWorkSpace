```js
import moment from 'moment';
import 'moment/locale/zh-cn'; // 被忽略了，需要手动引入
moment.locale('zh-cn')
```

在webpack中
```js
plugins: [
  new webpack.IgnorePlugin(/\.\/locale/, /moment/) // 忽视掉moment下的locale
]
```