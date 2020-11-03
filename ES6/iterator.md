## iterator
```js
let authors = {
  allAuthors: {
    fiction: ['aaa', 'bbb'],
    sciectionFiction: ['ccc', 'ddd'],
    fantasy: ['eee', 'fff']
  },
  Address: []
}

authors[Symbol.iterator] = function() {
  let allAuthors = this.allAuthors
  let keys = Reflect.ownKeys(allAuthors)
  let values = []
  return {
    next () {
      if(!values.length) {
        if (keys.length) {
          values = allAuthors[keys[0]]
          keys.shift()
        }
      }
      return {
        done: !values.length,
        value: values.shift()
      }
    }
  }
}

const r = [];
for (let v of authors) {
  r.push(v)
}

console.log(r)
```