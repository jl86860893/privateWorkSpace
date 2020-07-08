## 代码分割的意义
对于大的Web应用来讲，将所有的代码都放在一个文件中显然是不够有效的，特别是当某些代码块在特殊时候才会被用到。webpack可以将代码库分割成chunks（语块），当代码运行到需要它们的时候再进行加载。

**适用场景：**
- 抽离相同代码到一个共享块
- 脚本懒加载，使得初始下载的代码更小

首屏

## 懒加载JS脚本的方式
1. CommonJS：require.ensure
2. ES6：`动态import`（目前还没有原生支持， 需要babel转换）

## 如何使用动态import
安装babel插件
> npm i @babel/plugin-syntax-dynamic-import -D

.babelrc
```js
{
  "plugins": ["@babel/plugin-syntax-dynamic-import"],
  ...
}
```

## 实例(内部为JsonP)
创建text.js
```js
import React from 'react';

export default() => <div>动态 import</div>
```

在index.js中懒加载这个脚本
```js
class IndexCom extends React.Component {
  state = {
    Text: null,
  }

  loadComponent = () => {
    import('./text.js').then(Text => {
      this.setState({
        Text: Text.default,
      })
    });
  }

  render() {
    const { Text } = this.state;
    return <img src={ logo } onClick={this.loadComponent} />>
    {
      Text ? <Text /> : null
    }
  }
}
```

## React的React.lazy与React.Suspense
```js
const Text = React.lazy(() => import('./text'))

class IndexCom extends React.Component {
  render() {
    const { Text } = this.state;
    return <img src={ logo } onClick={this.loadComponent} />>
    <React.Suspense fallback={null}>
      <Text />
    </React.Suspense>
  }
}

```