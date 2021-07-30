函数可选参数。只能放在末尾
```js
function add(x: number, y: number, z?: number): number {
    if (typeof z === 'number') {
        return x + y + z;
    } else {
        return x+ y
    }
}
```

设定默认值
```js
function add(x: number, y: number, z: number = 10): number {
    if (typeof z === 'number') {
        return x + y + z;
    } else {
        return x+ y
    }
}

const add = function(x: number, y: number, z: number = 10): number {
    if (typeof z === 'number') {
        return x + y + z;
    } else {
        return x+ y
    }
}
const add2 = (x: number, y: number, z?: number) => number = add
```