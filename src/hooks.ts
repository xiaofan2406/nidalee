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

export function useCombinedRef<T>(
  ...refs: Array<
    | React.MutableRefObject<T | null>
    | React.RefCallback<T | null>
    | React.ForwardedRef<T | null>
  >
) {
  const targetRef = React.useRef<T>(null);

  React.useEffect(() => {
    refs.forEach((ref) => {
      if (!ref) return;

      if (typeof ref === 'function') {
        ref(targetRef.current);
      } else {
        ref.current = targetRef.current;
      }
    });
  }, [refs]);

  return targetRef;
}

export function useTrapFocus(
  containerRef: React.RefObject<HTMLElement>,
  ...deps: Array<unknown>
) {
  React.useLayoutEffect(() => {
    console.log(containerRef.current);
    if (!containerRef.current) return;

    const focusableSelector = [
      'a[href]',
      'area[href]',
      'iframe',
      'object',
      'embed',
      '*[contenteditable]',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'button:not([disabled])',
      '[tabindex]:not([tabindex="-1"]',
    ].join(',');

    const candidates = containerRef.current.querySelectorAll(focusableSelector);

    // prevent the parent itself being tabbed onto
    const first = (
      containerRef.current.activeElement === containerRef.current
        ? candidates[0]
        : document.activeElement
    ) as HTMLElement;
    const last = candidates[candidates.length - 1] as HTMLElement;

    console.log({
      first,
      candidates,
    });
    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      if (event.shiftKey) {
        // if shift + tab, add focus for the last element
        if (document.activeElement === first) {
          last.focus();
          event.preventDefault();
        }
      } else {
        if (document.activeElement === last) {
          first.focus();
          event.preventDefault();
        }
      }
    };

    // adding the event to container so that event.stopPropagation() wont break the behavior
    let target = containerRef.current;
    target.addEventListener('keydown', trapFocus);

    return () => {
      console.log('cleanup');
      target.removeEventListener('keydown', trapFocus);
    };
  }, [containerRef, ...deps]);
}
