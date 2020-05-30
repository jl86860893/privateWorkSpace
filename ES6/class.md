## ES5声明一个类
```js
// 2.方法多了，每个动物下面均有，会很大
let Animal = function (type) {
  this.type = type;
  this.eat = function () {
    console.log('can be update, not safe')
  }
}

let dog = new Animal('dog');
let monkey = new Animal('monkey');

// 1.修改了eat，其他的动物均会被修改
monkey.eat = function () {
  console.log('error')
}

dog.eat()  // error
```

解决以上两个问题
```js
let Animal = function (type) {
  this.type = type;
}

Animal.prototype.eat = function() {
  console.log('eating food')
}

let dog = new Animal('dog');
let monkey = new Animal('monkey');

monkey.eat = function () {
  console.log('error')
}

dog.eat()  // eating food
monkey.eat() // error
```
如果想只处理问题2不处理问题1：
> monkey.constructor.prototype.eat = function() {console.log('error')}

## ES6声明一个类
```js
class Animal {
  constructor(type) {
    this.type = type;
  }

  get age() {
    return 4;
  }

  set age(val) {
    this.realAge = val;
  }

  static sleep() {
    console.log('sleeping')
  }

  eat () {
    Animal.sleep();
    console.log('eating food')
  }
}

let dog = new Animal('dog');
dog.age = 5;
console.log(dog.realAge)
let monkey = new Animal('monkey');
```

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

