import {useState, useCallback, useRef, useEffect, useLayoutEffect} from 'react';

export function useForceRender() {
  const [, setState] = useState({});
  const forceRender = useCallback(() => {
    setState({});
  }, []);

  return forceRender;
}

export function useIsMounted() {
  const ref = useRef(false);

  useEffect(() => {
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
  const targetRef = useRef<T>(null);

  useEffect(() => {
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

export function useTrapFocus(containerRef: React.RefObject<HTMLElement>) {
  useLayoutEffect(() => {
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
      document.activeElement === containerRef.current
        ? candidates[0]
        : document.activeElement
    ) as HTMLElement;
    const last = candidates[candidates.length - 1] as HTMLElement;

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
      target.removeEventListener('keydown', trapFocus);
    };
  }, [containerRef]);
}

export function useRestoreFocus() {
  useLayoutEffect(() => {
    let target = document.activeElement as HTMLElement;

    return () => {
      target.focus();
    };
  }, []);
}

export function useBooleanToggle(defaultValue: boolean | (() => boolean)) {
  const [value, setValue] = useState(defaultValue);

  const toggle = useCallback(() => setValue((prev) => !prev), []);
  const on = useCallback(() => setValue(true), []);
  const off = useCallback(() => setValue(false), []);

  return [value, {toggle, on, off}] as const;
}

export const useFnRef = <T>(fn: T) => {
  const ref = useRef(fn);

  useLayoutEffect(() => {
    ref.current = fn;
  });

  return ref;
};
