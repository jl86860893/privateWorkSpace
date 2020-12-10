var arr = [15, [1, new Number(1), 2], { a: 3, b: [4,7,8] }, [6,7,8,7, [11,12,[12,13,[14]]]]];

let result = [];
//返回 [1,2,3,4,6,7,8,9,11,12,13,14,15]
function deepFlat(data) {
  flat(data)
}

function flat(data) {
  const type = findType(data);
  if (type === 'Number' ) {
    if (typeof data === type) {
      result.push(data)
    } else {
      result.push(data.valueOf())
    }
  }
  if (type === 'Object') {
    for (let value in data) {
      flat(value)
    }
  }
  if (type === 'Array') {
    data.forEach(item => {
      flat(item)
    })
  }
}

function findType(value) {
  const type = Object.prototype.toString.call(value);
  const newtype = type.substring(8)
  return newtype.substring(0, newtype.length - 1)
}

deepFlat(arr)
const setResult = new Set(result);
const a = [...setResult].sort((a, b) => a - b)
console.log(a)