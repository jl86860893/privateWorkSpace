## 概念
1个模块可能有多个方法，只要其中的某个方法使用到了，则整个文件都会被打到bundle里面去，tree shaking就是只把用到的方法打入bundle，没用到的方法会在uglify阶段被擦除掉。

## 使用
webpack默认支持，在`.babelrc`里设置`modules: false`即可
- production mode的情况下默认开启。

## 要求
**必须是ES6的语法(ES6 Module)，CJS(Commonjs)的方式不支持:**
ES6 Module 静态引入，编译时引入
Commonjs 动态引入，执行时引入
只有ES6 Module 才能静态分析，实现tree shaking

## DCE（Elimination）
- 代码不会被执行，不可到达
- 代码执行的结果不会被用到
- 代码只会影响死变量（只写不读）

## tree shaking原理
利用ES6模块的特点：
- 只能作为模块顶层的语句出现
- import的模块名只能是字符串常量
- import binding 是 immutable的

代码擦除： uglify阶段删除无用代码

## tree shaking失效
代码里有副作用,dom操作就是副作用