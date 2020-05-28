```tsx
let numOrString : number | string = 234;
numOrString = 'abc';

let arrOfNumber: number[] = [1,2,3,4]
arrOfNumber.push(5)

function test() {
	console.log(arguments)  //IArguments
}

//元组
let user: [string, number] = ['zhangsan', 18]
```

## interface

1.对对象的shape进行描述

2.对class进行抽象

3.Duck Typing（鸭子类型）

```tsx
interface IPerson {
	readonly id: number;
	name: string;
	age?: number;
}

let viking: Person = {
	id: 1234,
    name: 'viking',
    age: 20
}

viking.id = 1111  //出错，不能再赋值
```



## 函数和类型推断

```
function add(x: number, y: number, z?: number): number {
    if(typeof z === 'number') {
        return x + y + z
    }else{
        return x + y
    }
}

//可选参数只能放在形参最后面

let result = add(2, 3)
```

```tsx
//可选参数默认值
function add(x: number, y: number, z: number=10): number {
    if(typeof z === 'number') {
        return x + y + z
    }else{
        return x + y
    }
}

let result = add(2, 3)  //15

const add = function(x: number, y: number, z: number=10): number    { 
    if(typeof z === 'number') {
            return x + y + z
        }else{
            return x + y
        }
}

const add2: (x: number, y: number, z?: number) => number = add
```



## 类Class

public

private

protected

readonly

static



## interface + 泛型

```
interface IWithLength {
	length: number,
	getLength(): number,
}

interface IRectangle extends IWithLength {
	length: number,
	getLength(): number,
	width: number,
	getWidth(): number,
}

class echoArea implenments IRectangle {
	length = 10
	width = 20
	getLength() {
		
	}
	getWidth() {
	
	}
}

function echoWithLength<T extends IWithLength>(args: T): T {
	console.log(arg.length)
	return arg
}

const str = echoWithLength('str')
const obj = echoWithLength({ length: 10 })
const arr2 = echoWithLength([1, 2, 3])
```

