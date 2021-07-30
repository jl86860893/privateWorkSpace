```js
enum Direction {
    Up,   // 0
    Down, // 1
    Left, // 2
    Right // 3
}

console.log(Direction.Up)  // 0
console.log(Direction[0])  // Up
```

```js
enum Direction {
    Up = 10,  // 10
    Down,     // 11
    Left,
    Right
}

console.log(Direction.Up)  // 0
console.log(Direction[0])  // Up
```

```js
const enum Direction {  // 此处const可优化，减少编译代码量
    Up = 'UP',
    Down = 'DOWN',
    Left = 'LEFT',
    Right = 'RIGHT'
}

const value = 'UP'
if (value === Direction.Up) {
    console.log('go up!')
}

// 加const执行
var value = 'UP'
if (value === 'UP') {
    console.log('go up!')
}

// 不加const编译结果
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 'UP'] = 'Up';
    ...
    ...
    ...
})(Direction || (Direction = {}))
var value = 'UP'
if (value === Direction.Up) {
    console.log('go up!')
}
```
