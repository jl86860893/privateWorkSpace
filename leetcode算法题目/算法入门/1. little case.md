# 异或运算
### 交换两个数的值（地址不同的值）
```js
a = a ^ b;
b = a ^ b;
a = a ^ b;
```
### 找出单身数字
```ts
const arr: number[] = [1, 1, 2, 2, 3]
let result: number = arr[0];
for(let i:number = 1; i < arr.length; i++) {
    result = result ^ arr[i];
}
```

### 找出两个单身数字
eor = a ^ b;  
eor' = a 或 b  => eor ^ (~eor + 1)


# 二分运用
mid = (a + b)/2  // 错误，a+b可能溢出
mid = a + ((b-a) >> 1)  // 正确，右移一位等于除2，位操作更快

### 求一个数，他比左侧数小也比右侧数小
先确定arr[0]和arr[length-1]位置
然后依据与左侧数和右侧数对比大小==>二分


