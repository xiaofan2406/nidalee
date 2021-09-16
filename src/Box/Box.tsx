import * as React from 'react';

import {cx} from '../utils';
import './Box.css';

export type BoxLayer = 'root' | 'default' | 'base';

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  layer?: BoxLayer;
}

export const Box = React.forwardRef<HTMLDivElement, BoxProps>(function Box(
  props,
  ref
) {
  const {layer = 'default', className, ...rest} = props;
  return (
    <div
      {...rest}
      className={cx('ndl-box', `layer-${layer}`, className)}
      ref={ref}
    />
  );
});
