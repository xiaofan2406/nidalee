import {useLayoutEffect, useRef} from 'react';
import {Box} from '../Box';
import {useRestoreFocus, useTrapFocus} from '../hooks';
import {warn} from '../utils';
import './DialogContent.css';

export interface DialogContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const DialogContent = (props: DialogContentProps) => {
  const {onClick, onKeyDown, ...rest} = props;
  const contentRef = useRef<HTMLDivElement | null>(null);

  // Order of the following three hooks is important
  // ensure the dialogContent focus to work correctly
  useRestoreFocus();
  useLayoutEffect(() => {
    if (contentRef?.current) {
      contentRef.current.focus();
    }
  }, [contentRef]);
  useTrapFocus(contentRef);

  return (
    <Box
      {...rest}
      data-ndl-dialog=""
      layer="base"
      ref={contentRef}
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
      onClick={(event) => {
        event.stopPropagation();
        if (onClick) {
          onClick(event);
        }
      }}
      onKeyDown={(event) => {
        if (onKeyDown) {
          onKeyDown(event);
        }
        if (process.env.NODE_ENV !== 'production') {
          warn(
            event.key === 'Escape' && event.isPropagationStopped(),
            'DialogContent',
            `'onKeyDown' has 'event.stopPropagation()', which can break Dialog functionalities.`
          );
        }
      }}
    />
  );
};
