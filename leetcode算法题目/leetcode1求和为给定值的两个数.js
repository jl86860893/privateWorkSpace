// 一个整数数组已经排好序，找出两个数加起来等于目标值，并得出他们的下标
// 如 [1, 2, 4, 8, 10]  目标值 10

const source: number[] = [1, 2, 4, 8, 10];
const target: number = 10;

let i: number  = 0, j: number  = source.length - 1;

function getResult() : number[] {
  if (!source && source.length < 2) {
    return [-1, -1];
  }

  while(i < j) {
    if (source[i] + source[j] < target) {
      i += 1;
    } else if(source[i] + source[j] > target) {
      j -= 1;
    } else {
      return [i, j]
    }
  }
  return [-1, -1]
}

console.log(getResult())

// 若未排好序

//方法1：使用Map(value, key)一个个的放进去，在Map中查找每一个与目标的差值，找不到加入Map中继续
// T:o(n)   S:o(n)
function getIndexArr(target, inputArr) {
  if (!inputArr || !inputArr.length || inputArr.length < 2) {
    return [-1, -1];
  }
  let result = [-1, -1]
  const tempMap = new Map();
  inputArr.forEach((item, index) => {
    if (tempMap.has((target - item))) {
      result = [tempMap.get(target - item), index];
    } else {
      tempMap.set(item, index);
    }
  })
  return result;
}

const val = getIndexArr(10, [1,2,4,6,3,7,4]);
console.log(val)


// 方法2： 两层for循环



