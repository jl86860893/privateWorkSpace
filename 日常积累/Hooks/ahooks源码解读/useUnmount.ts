import { useEffect } from 'react';
import usePersistFn from './usePersistFn';

const useUnmount = (fn: any) => {
  const fnPersist = usePersistFn(fn);

  useEffect(
    () => {
      return () => {
        if (typeof fnPersist === 'function') {
          fnPersist();
        }
      }
    },
    [],
  );
};

export default useUnmount;