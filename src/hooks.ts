import * as React from 'react';

export function useForceRender() {
  const [, setState] = React.useState({});
  const forceRender = React.useCallback(() => {
    setState({});
  }, []);

  return forceRender;
}

export function useIsMounted() {
  const ref = React.useRef(false);

  React.useEffect(() => {
    ref.current = true;

    return () => {
      ref.current = false;
    };
  }, []);

  return ref;
}
