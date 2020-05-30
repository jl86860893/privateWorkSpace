## y修饰符
exec校验; y修饰符（sticky粘连）
```js
const s = 'aaa_aa_a';
const r1 = /a+/g;
const r2 = /a+/y;

console.log(r1.exec(s)); // ["aaa", index: 0, input: "aaa_aa_a", groups: undefined]
console.log(r2.exec(s));
// ["aaa", index: 0, input: "aaa_aa_a", groups: undefined] 执行后起始点从index为3开始

console.log(r1.exec(s)); // ["aaa", index: 0, input: "aaa_aa_a", groups: undefined]
console.log(r2.exec(s)); // ["aa", index: 4, input: "aaa_aa_a", groups: undefined]
```

## u修饰符
多字节中文unicode
