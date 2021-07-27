import {throttle} from 'lodash';
import { useRef } from 'react';
import useCreation from './useCreation';
import useUnmount from './useUnmount';

export interface ThrottleOptions {
  wait?: number;
  leading?: boolean;
  trailing?: boolean;
}

type Fn = (...args: any) => any;

export default function useThrottleFn<T extends Fn>(fn: T, options?: ThrottleOptions) {
  const fnRef = useRef<T>(fn);
  fnRef.current = fn;

  const wait = options?.wait ?? 1000;

  // useThrottle父组件更新重新执行useThrottle的hook。
  // 此时fn进来不应该改变throttled，所以使用useCreation避免重新创建
  const throttled = useCreation(
    () =>
      throttle<T>(
        ((...args: any[]) => {
          return fnRef.current(...args);
        }) as T,
        wait,
        options,
      ),
    [],
  );

  // 组件卸载后需要清除throttled
  useUnmount(() => {
    throttled.cancel();
  });

  return {
    run: (throttled as unknown) as T,
    cancel: throttled.cancel,
    flush: throttled.flush,
  };
}