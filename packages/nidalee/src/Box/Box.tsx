import {forwardRef} from 'react';
import './Box.css';

export type BoxLayer = 'root' | '' | 'base';

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  layer?: BoxLayer;
}

export const Box = forwardRef<HTMLDivElement, BoxProps>(function Box(
  props,
  ref
) {
  const {layer = '', ...rest} = props;
  return <div {...rest} data-ndl-box={layer} ref={ref} />;
});
