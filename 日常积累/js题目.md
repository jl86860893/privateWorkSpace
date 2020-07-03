## 1.对象的拷贝
- 浅拷贝: 以赋值的形式拷贝引用对象，仍指向同一个地址，修改时原对象也会受到影响
  - `Object.assign`
  - 展开运算符(...)

- 深拷贝: 完全拷贝一个新对象，修改时原对象不再受到任何影响

  - `JSON.parse(JSON.stringify(obj))`: 性能最快
    - 具有循环引用的对象时，报错
    - 当值为函数、`undefined`、或`symbol`时，无法拷贝
  - 递归进行逐一赋值

## 2.require与import的区别
- require支持 动态导入，import不支持，正在提案 (babel 下可支持)
- require是 同步 导入，import属于 异步 导入
- require是 值拷贝，导出值变化不会影响导入值；import指向 内存地址，导入值会随导出值而变化

## 3.let与const
`let / const`: 块级作用域、不存在变量提升、暂时性死区、不允许重复声明

## 4.babel编译原理
- babylon 将 ES6/ES7 代码解析成 AST
- babel-traverse 对 AST 进行遍历转译，得到新的 AST
- 新 AST 通过 babel-generator 转换成 ES5
神么是抽象语法树AST？？？

## 5.函数柯里化
在一个函数中，首先填充几个参数，然后再返回一个新的函数的技术，称为函数的柯里化。通常可用于在不侵入函数的前提下，为函数 预置通用参数，供多次重复调用。
```js
const add = function add(x) {
	return function (y) {
		return x + y
	}
}

const add1 = add(1)

add1(2) === 3
add1(20) === 21
```

## 6.