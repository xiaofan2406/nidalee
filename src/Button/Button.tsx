import * as React from 'react';
import { css, cx } from 'react-emotion';
import Spinner from '../Spinner';
import { fontSizes, theme } from '../styles';
import { lighten } from '../utils';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: Size;
  color?: string;
  className?: string;
  showSpinner?: boolean;
}

const heightMap = (size: Size) => ({ small: 24, regular: 36, large: 48 }[size]);

const Button: React.SFC<ButtonProps> = ({
  children,
  size,
  color,
  className,
  showSpinner,
  ...rest
}) => {
  const height = heightMap(size!);
  const fontSize = fontSizes[size!];
  const lightenedColor = lighten(color!);
  return (
    <button
      className={cx(
        css`
          display: inline-flex;
          align-items: center;
          vertical-align: bottom;

          outline: none;
          cursor: pointer;
          user-select: none;
          &:hover,
          &:focus {
            outline: none;
            border-color: ${lightenedColor};
            background-color: ${lightenedColor};
            color: ${theme.textColorInverse};
          }

          &:active {
            outline: none;
            border-color: ${color};
            background-color: ${color};
            box-shadow: 0px 0px 2px 0px ${color};
          }

          font-family: ${theme.fontFamily};
          font-size: ${fontSize}px;
          line-height: 1.2;

          height: ${height}px;
          padding: 0.6em 0.8em;
          margin: 0px 8px 0px 0px;

          border-radius: 2px;
          border: 1px solid ${color};
          color: ${theme.textColorInverse};
          background-color: ${color};

          & > * {
            margin-left: 0px;
            margin-right: 6px;
            &:last-child {
              margin-right: 0px;
            }
            &:first-child {
              margin-left: 0px;
            }
          }
        `,
        className
      )}
      {...rest}
    >
      {showSpinner ? (
        <Spinner
          color={theme.textColorInverse}
          size={fontSize + 2}
          scale={1.5}
        />
      ) : null}
      {React.Children.map(
        children,
        child => (typeof child === 'string' ? <span>{child}</span> : child)
      )}
    </button>
  );
};

Button.defaultProps = {
  size: 'regular',
  color: theme.primaryColor,
  showSpinner: false,
};

export default Button;
