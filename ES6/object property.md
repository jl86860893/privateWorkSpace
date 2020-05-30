```ts
const x: number = 3;
let obj: object = {
  [x]: 4,
  *sleep() {
    console.log('generator异步执行')
  }
}
```