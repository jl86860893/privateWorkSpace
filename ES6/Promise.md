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

loadScript('./1.js')
  .then(loadScript('./2.js'))
  .then(loadScript('./3.js'))
```

