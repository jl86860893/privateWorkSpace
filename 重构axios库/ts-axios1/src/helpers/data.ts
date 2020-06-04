import { isPlainObject } from './utils'

export function transformRequest(data: any): any {
  // 判断是否普通对象
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}