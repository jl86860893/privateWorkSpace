# Promise

```js
function loadScript(src) {
  // 1.pending,undefined
  return new Promise((resolve, reject) => {
    let script = document.createElement('script')
    script.sec = src;
    script.onload = () => resolve(src); // 2.fulfilled, result
    script.onerror = err => reject(err); // 2.rejected, error
    document.head.append(script)
  })
}

// promise.then(onFulfilled, onRejected)
loadScript('./1.js')
  .then(() => loadScript('./2.js'), err => console.log(err))
  .then(loadScript('./3.js'))
```

```js
function test (bool) {
  if(bool) {
    return new Promise((resolve, reject) => {
      resolve(30)
    });
  } else {
    return Promise.resolve(42);
  }
}
test(1).then(val => console.log(val), err => console.log(err))
```
