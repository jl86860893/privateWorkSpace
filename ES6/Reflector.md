# Reflect apply

```js
let price = 101.5;
if (price > 100) {
  price = Math.floor.apply(null, [price])
} else {
  price = Math.ceil.apply(null, [price])
}

Reflect.apply((price > 100 ? Math.floor : Math.ceil), null, [price])
```

# Reflect construct
```js
let d = Reflect.construct(Date, [])
console.log(d.getTime(), d instanceof Date)
```

```js
const student = {}
const result1 = Object.defineProperty(student, 'name', {value: 'Nike'})  // deleteProperty   get(obj, 'key')  get([v1, v2, v3], 1)从索引1开始 => 4
const result2 = Reflect.defineProperty(student, 'name', {value: 'Nike'})
console.log(student, result1)  // {name: 'Nike'}, {name: 'Nike'}
console.log(student, result2)  // {name: 'Nike'}, true
```

# Reflect.getOwnPropertyDescriptor()
```js
const object1 = {
  property1: 42
};

console.log(Reflect.getOwnPropertyDescriptor(object1, 'property1').value);
// expected output: 42

console.log(Reflect.getOwnPropertyDescriptor(object1, 'property2'));
// expected output: undefined

console.log(Reflect.getOwnPropertyDescriptor(object1, 'property1').writable);
// expected output: true
```

```js
Reflect.getOwnPropertyDescriptor({x: 'hello'}, 'x')
// {value: "hello", writable: true, enumerable: true, configurable: true}

Reflect.getOwnPropertyDescriptor({x: 'hello'}, 'y')
// undefined

Reflect.getOwnPropertyDescriptor([], 'length')
// {value: 0, writable: true, enumerable: false, configurable: false}
```
第一个参数必须为object，否则报类型错误
```js
Reflect.getOwnPropertyDescriptor('foo', 0)
// TypeError: "foo" is not non-null object

Object.getOwnPropertyDescriptor('foo', 0)
// { value: "f", writable: false, enumerable: true, configurable: false }
```