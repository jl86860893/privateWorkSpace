import { useRef } from 'react';

/**
此功能主要用于实例化的对象数据重复实例化
 */

/**
 * 
 * @param factory 用来创建所需对象的函数
 * @param deps 传入依赖变化的对象
 * @returns void
 */
// const a = useRef(new Subject()) // 每次重渲染，都会执行实例化 Subject 的过程，即便这个实例立刻就被扔掉了
// const b = useCreation(() => new Subject(), []) // 通过 factory 函数，可以避免性能隐患
export default function useCreation<T>(factory: () => T, deps: any[]) {
  const { current } = useRef({
    deps,
    obj: undefined as undefined | T,
    initialized: false,
  });
  if (current.initialized === false || !depsAreSame(current.deps, deps)) {
    current.deps = deps;
    current.obj = factory();
    current.initialized = true;
  }
  return current.obj as T;
}

// 比较新旧deps
function depsAreSame(oldDeps: any[], deps: any[]): boolean {
  if (oldDeps === deps) return true;
  for (let i = 0; i < oldDeps.length; i++) {
    if (oldDeps[i] !== deps[i]) return false;
  }
  return true;
}