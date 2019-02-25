import React, { FC } from 'react';
import { css } from '@emotion/core';
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

const cssSpinner = css`
  display: inline-block;
`;

const Spinner: FC<SpinnerProps> = ({ size, scale, color, ...rest }) => {
  const sizeValue = size!;
  const maxBorder = sizeValue / 2;
  const scaledBorder = (sizeValue * scale!) / 10;
  const borderSize = scaledBorder >= maxBorder ? maxBorder : scaledBorder;

  return (
    <div css={cssSpinner} {...rest}>
      <div
        css={css`
          width: ${sizeValue}px;
          height: ${sizeValue}px;
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
