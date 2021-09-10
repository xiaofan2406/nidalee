import * as React from 'react';

import './Box.css';

export type BoxLayer = 'root' | 'default' | 'base';

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  layer?: BoxLayer;
}

export const Box = React.forwardRef<HTMLDivElement, BoxProps>(function Box(
  props,
  ref
) {
  const {layer = 'default', ...rest} = props;
  return <div {...rest} ref={ref} data-ndl-box="" data-box-layer={layer} />;
});
