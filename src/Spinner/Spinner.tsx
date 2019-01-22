import { css } from '@emotion/core';
import React, { SFC } from 'react';
import { spinAnimation, theme } from '../styles';

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The width and height for the spinner.
   */
  size?: number;
  /**
   * The thickness scale for the spinner.
   */
  scale?: number;
  /**
   * The color for the spinner.
   */
  color?: string;
}

const Spinner: SFC<SpinnerProps> = ({
  size,
  scale,
  color,
  className,
  ...rest
}) => {
  const maxBorder = size! / 2;
  const scaledBorder = (size! * scale!) / 10;
  const borderSize = scaledBorder >= maxBorder ? maxBorder : scaledBorder;

  return (
    <div
      css={css`
        display: inline-block;
      `}
      {...rest}
    >
      <div
        css={css`
          width: ${size!}px;
          height: ${size!}px;
          border: ${borderSize}px solid ${color};
          border-bottom-color: transparent;
          border-radius: 100%;
          background: transparent;
          animation: ${spinAnimation} 0.75s 0s infinite linear both;
        `}
      />
    </div>
  );
};

Spinner.defaultProps = {
  size: 60,
  scale: 1,
  color: theme.primaryColor,
};

export default Spinner;
