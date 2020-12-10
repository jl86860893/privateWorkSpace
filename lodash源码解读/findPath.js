var list1 = [{
  id: 'ab',
  children: [{
    id: 'cd',
    children: [{
      id: 'ef',
      children: []
    }]
  }]
}]

function findPath(list, target) {
  let result = ''
  let loop = list;
  let matched = false;
  while (loop.length) {
    if (loop[0].id === target) {
      result = result + '->' + loop[0].id;
      matched = true;
      loop = [];
    } else {
      result = result + '->' + loop[0].id;
      loop = loop[0].children;
    }
  }
  return matched ? result.substring(2) : '';
}

const value = findPath(list1, 'ef')
console.log(value)