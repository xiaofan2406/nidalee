import { useState, useEffect, useRef } from 'react';

export const useSafeState = initialState => {
  const isUnmountedRef = useRef(false);
  const [state, setState] = useState(initialState);

  const safeSetState = setter => {
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
