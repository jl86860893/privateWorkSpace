## 函数柯里化实现after
```js
// ******闭包******
function after(times, callback) {
  let school = {};
  return function(key, value) {
    school[key] = value;
    if(--times === 0) {
      callback(school)
    }
  }
}

const out = after(2, function() {
  console.log(school)
})

fs.readFile('./name.txt', 'utf8', function(err, data) {
  out('name', data)
})

fs.readFile('./age.txt', 'utf8', function(err, data) {
  out('age', data)
```

## 发布订阅模式实现after
```js
const event = {
  _arr: [],
  on(fn) {
    this._arr.push(fn)
  },
  emit() {
    this._arr.forEach(fn => fn())
  }
}

let school = {};
event.on(function() {
  console.log('读取一个');
})

event.on(function() {
  if(Object.keys(school).length === 2) {
    console.log(school);
  }
})

fs.readFile('./name.txt', 'utf8', function(err, data) {
  school.name = data;
  event.emit();
})

fs.readFile('./age.txt', 'utf8', function(err, data) {
  school.age = data;
  event.emit();
})
```

## 观察者模式
```js
class Subject {
  constructor() {
    this.state = '很开心'；
    this.arr = [];
  }

  attach(o) {
    this.arr.push(o)
  }

  setState(newState) {
    this.state = newState;
    this.arr.forEach(o => o.update(newState))
  }
}

class Observer {
  constructor(name) {
    this.name = name;
  }

  update(newState) {
    console.log(this.name + ':' + '小宝宝的状态是' + newState)；
  }
}

let s = new Subject('小宝宝')
let o1 = new Observer('我')
let o1 = new Observer('他')

s.attacch(o1);
s.attacch(o2);
s.setState('开心')
```

## 如何写一个promise
第一步
1. 里面有三个状态（等待态默认，成功态，失败态），一旦成功了就不能失败，反过来也一样：resolve代表的成功，reject代表的失败
2. 每个promise实例都有一个then方法
3. 如果new Promise的时候报错，会变成失败态（抛错也算失败）
```js
let Promise = require('./Promise');
let promise = new Promise((resolve, reject) => {  // executor执行器
  reject('hello');
  resolve('hello');
}).then(data => {
  console.log(data);
}, err => {
  console.log(err);
});
```
实现上述的代码：
```js
const PENDING = 'pending';
const RESOLVED = 'resolved';
const REJECTED = 'rejected'

class Promise {
  constructor(executor) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;

    let resolve = (value) => {
      if(this.status === PENDING) {
        this.value = value;
        this.status = RESOLVED
      }
    }

    let reject = (reason) => {
      if(this.status === PENDING) {
        this.reason = reason;
        this.status = REJECTED;
      }
    }

    try {
      executor(resolve, reject);
    } catch(e) {
      reject(e)
    }
  }

  then(onfullfilled, onrejected) {
    if(this.status === RESOLVED) {
      onfullfilled(this.value)
    }

    if(this.status === REJECTED) {
      onrejected(this.reason)
    }
  }
}
```
第二步： .then方法可以多次执行,此处使用发布订阅模式
```js
let Promise = require('./Promise');
let promise = new Promise((resolve, reject) => {  // executor执行器
  // 由于事件循环原理setTimeout会放到下一个时间片
  // 后续的then先于resolve执行，因此需要在then的pending状态时存储 fn,最后待resolve一起执行。
  // 所以需使用发布订阅模式处理此问题
  setTimeout(() => {
    resolve('hello')
  }, 1000)
})

promise.then(data => {
  console.log(data + '1')
})

promise.then(data => {
  console.log(data + '2')
})

promise.then(data => {
  console.log(data + '3')
})
```
```js
class Promise {
  constructor(executor) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;

    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];

    let resolve = (value) => {
      if(this.status === PENDING) {
        this.value = value;
        this.status = RESOLVED
        this.onResolvedCallbacks.forEach(fn => fn())  // 订阅
      }
    }

    let reject = (reason) => {
      if(this.status === PENDING) {
        this.reason = reason;
        this.status = REJECTED;
        this.onRejectedCallbacks.forEach(fn => fn())  // 订阅
      }
    }

    try {
      executor(resolve, reject);
    } catch(e) {
      reject(e)
    }
  }

  then(onfullfilled, onrejected) {
    /*同步*/
    if(this.status === RESOLVED) {
      onfullfilled(this.value)
    }

    if(this.status === REJECTED) {
      onrejected(this.reason)
    }

    /*异步*/
    // 发布
    if(this.status === PENDING) {
      this.onResolvedCallbacks.push(() => {
        // todo
        onfulfilled(this.value);
      });
      this.onRejectedCallbacks.push(() => {
        // todo
        onrejected(this.reason)
      })
    }
  }
}
```

## 实现链式调用
```js
class Promise {
  constructor(executor) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;

    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];

    let resolve = (value) => {
      if(this.status === PENDING) {
        this.value = value;
        this.status = RESOLVED
        this.onResolvedCallbacks.forEach(fn => fn())  // 订阅
      }
    }

    let reject = (reason) => {
      if(this.status === PENDING) {
        this.reason = reason;
        this.status = REJECTED;
        this.onRejectedCallbacks.forEach(fn => fn())  // 订阅
      }
    }

    try {
      executor(resolve, reject);
    } catch(e) {
      reject(e)
    }
  }

  then(onfullfilled, onrejected) {
    let promise2 = new Promise((resolve, reject) => {
      /*同步*/
      if(this.status === RESOLVED) {
        // 在当前时间片获取不到promise2，因为还没new完，放到下一个宏任务中去
        setTimeout(() => {
          try {
            // x 可能是普通值 也可能是promise
            // 判断x的值 =》 promise2的状态
            let x = onfullfilled(this.value)
            resolvePromise(promise2, x, resolve, reject);
          } catch(e) {
            reject(e)
          }
        }, 0);
        
      }

      if(this.status === REJECTED) {
        setTimeout(() => {
          try{
            let x = onrejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch(e) {
            reject(e)
          }
        }, 0)
        onrejected(this.reason)
      }

      /*异步*/
      // 发布
      if(this.status === PENDING) {
        setTimeout(() => {
          try {
            let 
          } catch(e) {
            reject(e)
          }
        }, 0)
        this.onResolvedCallbacks.push(() => {
          // todo
          onfulfilled(this.value);
        });
        this.onRejectedCallbacks.push(() => {
          // todo
          onrejected(this.reason)
        })
      }
    }
  })
}
```
