import { useState, useEffect, useRef } from 'react';

export const useSafeState = <ValueType>(initialState: ValueType) => {
  const isUnmountedRef = useRef(false);
  const [state, setState] = useState(initialState);

  const safeSetState: typeof setState = setter => {
    if (!isUnmountedRef.current) {
      setState(setter);
    }
  };

  useEffect(() => {
    return () => {
      isUnmountedRef.current = true;
    };
  }, []);

  return [state, safeSetState];
};
