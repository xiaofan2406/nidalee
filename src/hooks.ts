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

export function useTrapFocus(containerRef: React.RefObject<HTMLElement>) {
  React.useLayoutEffect(() => {
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
  React.useLayoutEffect(() => {
    let target = document.activeElement as HTMLElement;

    return () => {
      target.focus();
    };
  }, []);
}

export function useLockBodyScroll() {
  React.useLayoutEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;

    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);
}

export const useCallBackRef = (callback?: Function) => {
  const callbackRef = React.useRef(callback);

  React.useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  return callbackRef;
};

export function useOnClickOutside(
  ref: React.RefObject<HTMLElement>,
  handler?: (event: TouchEvent | MouseEvent) => void
) {
  const handlerRef = useCallBackRef(handler);

  React.useEffect(() => {
    const listener = (event: TouchEvent | MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }

      handlerRef.current?.(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handlerRef]);
}
