import { useRef } from 'react';

/**
 * class Counter extends React.Component {
  state = {
    count: 0,
  };

  increment = () => {
    this.setState((prev) => ({
      count: prev.count + 1,
    }));
  };

  render() {
    const { count } = this.state;
    return <ChildComponent count={count} onClick={this.increment} />;
  }
}

function Counter() {
  const [count, setCount] = React.useState(0);

  function increment() {
    setCount((n) => n + 1);
  }
  return <ChildComponent count={count} onClick={increment} />;
}

hooks书写时，在 count 状态更新的时候， Counter 组件会重新执行，
这个时候会重新创建一个新的函数 increment。
这样传递给 ChildComponent 的 onClick 每次都是一个新的函数，
从而导致 ChildComponent 组件的 React.memo 失效

// 建议使用 `usePersistFn`
const increment = usePersistFn(() => {
  setCount((n) => n + 1);
});
// 或者使用 useCallback
const increment = React.useCallback(() => {
  setCount((n) => n + 1);
}, []);
 */

export type noop = (...args: any[]) => any;

function usePersistFn<T extends noop>(fn: T) {
  const fnRef = useRef<T>(fn);
  fnRef.current = fn;

  const persistFn = useRef<T>();
  if (!persistFn.current) {
    persistFn.current = function (...args) {
      // @ts-ignore
      return fnRef.current!.apply(this, args);
    } as T;
  }

  return persistFn.current!;
}

export default usePersistFn;