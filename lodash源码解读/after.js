// 每执行一次after n减1
// 设定 n = 3， 则执行3次after后执行after内的func

function after(n, func) {
  if (typeof func !== 'function') {
    throw new TypeError('Expected a function')
  }
  n = n || 0
  return function(...args) {
    if (--n < 1) {
      return func.apply(this, args)
    }
  }
}

// 实际应用
// 执行异步操作，等5个异步操作执行结束后再执行某个方法。

function process(arr, callback) {
    const sync = after(arr.length, callback);

    //这里开始异步
    arr.forEach(item => {
      item.then(() => {
        sync()
      })
    })

    //这里的同步方法先执行
    console.log('timeouts all set');
}

const promise = new Promise(resolve => {
  setTimeout(() => {
    resolve(11111)
  }, 5000)
})

process([
  promise, promise, promise, promise, promise
], function () {
    console.log('callbacks completed');
});