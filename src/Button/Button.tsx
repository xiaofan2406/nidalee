import React, { FunctionComponent } from 'react';
import { css } from '@emotion/core';
import { fontSizes, theme, noFirefoxOutline } from '../styles';
import { lighten } from '../utils';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size?: 'small' | 'regular' | 'large';
  color?: string;
}

const heightMap = (size: ButtonProps['size']) =>
  ({ small: 28, regular: 36, large: 48 }[size!]);

const Button: FunctionComponent<ButtonProps> = ({
  children,
  size,
  color,
  ...rest
}) => {
  const height = heightMap(size!);
  const fontSize = fontSizes[size!];
  const lightenedColor = lighten(color!);

  return (
    <button
      css={css`
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

        ${noFirefoxOutline};
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
      `}
      type="button"
      {...rest}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  size: 'regular',
  color: theme.primaryColor,
};

export default Button;
