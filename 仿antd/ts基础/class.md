```js
class Animal {
    name: string;

    constructor(name) {
        this.name = name
    }

    run() {
        return `${this.name} is running`
    }
}

const snake = new Animal('lily')
snake.run()

class Cat extends Animal {
    constructor(name){
        super(name)
    }

    run() {
        return 'Meow' + super.run()
    }
}
const maomao = new Cat('maomao')
maomao.run();
```


### 修饰符  public private protected static readonly
```js
class Animal {
    public name: string;   // 都可以访问
    private name: string;  // 只能当前访问
    protected name: string;  //子类和当前可以访问
    readonly name: string; // 只能读不能写
    static categoies: string[] = ['animal', 'bird']  // 通过Animal.categoies 获取值

    constructor(name) {
        this.name = name
    }

    static isAnimal(a) {
        return a.instanceof Animal
    }

    run() {
        return `${this.name} is running`
    }
}

console.log(Animal.categoies)

const dog = new Animal('tom')
Animal.isAnimal(dog)
```



