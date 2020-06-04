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

## 继承ES5
```js
let Animal = function(type) {
  this.type = type;
}

Animal.prototype.eat = function() {
  Animal.walk()
  console.log('i am eating')
}

Animal.walk = function () {
  console.log('i am walking')
}

let Dog = function() {
  // 初始化父类的构造函数，call方法修改指针（改变this指向）Animal的this指向挂到Dog上
  Animal.call(this, 'dog')

}

// 原型链指向更改
Dog.prototype = Animal.prototype;

let dog = new Dog('dog')
dog.eat()
```

## 继承ES6
```js
class Animal {
  constructor(type) {
    this.type = type;
  }

  static sleep() {
    console.log('sleeping')
  }

  eat () {
    Animal.sleep();
    console.log('eating food')
  }
}

class Dog extends Animal {
  constructor(type) {
    super(type)
    this.age = 2;
  }
}

let dog = new Dog('dog')
dog.eat()
```


