## 函数参数默认值
ES5中：
```js
function (x, y, z) {
  if (y === undefined) {
    y =7;
  }
  if (z === undefined) {
    z =30;
  }
  return x + y +z;
}
```
ES6:
```js
function (x, y = 7, z = 30) {
  return x + y +z;
}
```

## rest params（...rest）用法
ES5计算参数的和
```js
function sum() {
  let num = 0;
  Array.prototype.forEach.call(arguments, function(item) {
    num += item * 1;
  })
  // 或者
  // Array.from(arguments).forEach(function(item) {
  //   num += item * 1;
  // })
  return num;
}

console.log(sum(1, 2, 3, 5))  // 11
```
ES6使用rest
```js
function sum (base, ...nums) {
  let num = 0;
  nums.forEach(function(item) {
    num += item * 1;
  })
  return base * 2 + num;
}

console.log(sum(1, 2, 3, 5)) // 12
```
## rest 逆操作
```js
function sum(x=1, y=2, z=3) {
  return x + y + z;
}
let data = [4, 5, 9]
console.log(sum.apply(this, data))
console.log(sum(...data))
```