import Hash from './Hash.js'

// 根据set存值的key，判断使用自定义的new Hash还是 ES6的Map
// 如果set的是node节点 => Hash
// 如果set的是数组 => Map
// 如果set的是字符串 => Hash
function getMapData({ __data__ }, key) {
  const data = __data__
  return isKeyable(key)
    ? data[typeof key === 'string' ? 'string' : 'hash']
    : data.map
}

function isKeyable(value) {
  const type = typeof value
  return (type === 'string' || type === 'number' || type === 'symbol' || type === 'boolean')
    ? (value !== '__proto__')
    : (value === null)
}

class MapCache {
  constructor(entries) {
    let index = -1
    const length = entries == null ? 0 : entries.length

    this.clear()
    while (++index < length) {
      const entry = entries[index]
      this.set(entry[0], entry[1])
    }
  }

  // 初始化时执行clear，清空并设定__data__对象数据结构
  clear() {
    this.size = 0
    this.__data__ = {
      'hash': new Hash,
      'map': new Map,
      'string': new Hash
    }
  }

  delete(key) {
    const result = getMapData(this, key)['delete'](key)
    this.size -= result ? 1 : 0
    return result
  }

  get(key) {
    return getMapData(this, key).get(key)
  }

  has(key) {
    return getMapData(this, key).has(key)
  }

  set(key, value) {
    const data = getMapData(this, key)
    const size = data.size

    data.set(key, value)
    this.size += data.size == size ? 0 : 1
    return this
  }
}

export default MapCache