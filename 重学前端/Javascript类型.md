## Undefined、Null
null定义了但是没值；undefiend表示未定义

## String
JavaScript 这个设计继承自 Java，最新标准中是这样解释的，这样设计是为了“性能和尽可能实现起来简单”。因为现实中很少用到 BMP 之外的字符。

## Number
JavaScript 为了表达几个额外的语言场景（比如不让除以 0 出错，而引入了无穷大的概念），规定了几个例外情况：

- NaN，占用了 9007199254740990，这原本是符合 IEEE 规则的数字；
- Infinity，无穷大；
- -Infinity，负无穷大。

检测 1/x 是 Infinity 还是 -Infinity来区分+0和-0
```
console.log( Math.abs(0.1 + 0.2 - 0.3) <= Number.EPSILON);
```

# 装箱
使用内置的 Object 函数，我们可以在 JavaScript 代码中显式调用装箱能力。
 ```js
 var symbolObject = Object(Symbol("a"));
  console.log(typeof symbolObject); //object
  console.log(symbolObject instanceof Symbol); //true
  console.log(symbolObject.constructor == Symbol); //true
```

每一类装箱对象皆有私有的 Class 属性，这些属性可以用 Object.prototype.toString 获取：
```
  var symbolObject = Object(Symbol("a"));
  console.log(Object.prototype.toString.call(symbolObject)); //[object Symbol]
```
在 JavaScript 中，没有任何方法可以更改私有的 Class 属性，因此 Object.prototype.toString 是可以准确识别对象对应的基本类型的方法，它比 instanceof 更加准确。
但需要注意的是，call 本身会产生装箱操作，所以需要配合 typeof 来区分基本类型还是对象类型。