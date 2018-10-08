import React, { SFC } from 'react';
import { css, cx } from 'react-emotion';
import { spinAnimation, theme } from '../styles';

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The width and height for the spinner.
   */
  size?: number;
  /**
   * The thickness scale of the spinner.
   */
  scale?: number;
}

const Spinner: SFC<SpinnerProps> = ({ size, scale, className, ...rest }) => {
  const maxBorder = size! / 2;
  const scaledBorder = (size! * scale!) / 10;
  const borderSize = scaledBorder >= maxBorder ? maxBorder : scaledBorder;

  return (
    <div
      className={cx([
        css`
          display: inline-block;
        `,
        className,
      ])}
      {...rest}
    >
      <div
        className={css`
          width: ${size!}px;
          height: ${size!}px;
          border: ${borderSize}px solid ${theme.primaryColor};
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
};

export default Spinner;
