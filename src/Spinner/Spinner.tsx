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

const Spinner: FC<SpinnerProps> = ({
  size = 60,
  scale = 1,
  color = theme.primaryColor,
  ...rest
}) => {
  const maxBorder = size / 2;
  const scaledBorder = (size * scale) / 10;
  const borderSize = scaledBorder >= maxBorder ? maxBorder : scaledBorder;

  return (
    <div css={cssSpinner} {...rest}>
      <div
        css={css`
          width: ${size}px;
          height: ${size}px;
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

export default Spinner;
