/* @flow */
import * as React from 'react';
import styled from 'react-emotion';
import { theme, fontSizes } from './styles';
import { lighten } from './helpers';
import { I } from './Icon';
import Spinner from './Spinner';

const EButton = styled.button`
  display: inline-flex;
  align-items: center;
  vertical-align: bottom;

  outline: none;
  cursor: pointer;
  user-select: none;
  &:hover,
  &:focus {
    background-color: ${({ color }) => lighten(color)};
  }

  &:active {
    background-color: ${({ color }) => color};
    box-shadow: 0px 0px 2px 0px ${({ color }) => color};
  }

  font-family: ${theme.fontFamily};
  font-size: ${({ size }) => size}px;
  line-height: 1.2;

  height: ${({ height }) => height}px;
  padding: 0.6em 0.8em;
  margin: 0px 8px 0px 0px;

  border: 1px solid transparent;
  border-radius: 2px;

  & > *,
  & > ${I} {
    margin-left: 0px;
    margin-right: 6px;
    &:last-child {
      margin-right: 0px;
    }
    &:first-child {
      margin-left: 0px;
    }
  }

  color: ${theme.textColor};
  background-color: ${({ color }) =>
    color !== theme.eleBgColor ? color : 'transparent'};
`;

const Button = ({
  children,
  primary,
  color,
  size,
  showSpinner,
  ...rest
}: ButtonProps) => {
  const buttonHeight = ({ small: 30, regular: 36, large: 46 }: {
    [key: Size]: number,
  })[size];

  return (
    <EButton
      {...rest}
      color={primary ? theme.primaryColor : color}
      size={fontSizes[size]}
      height={buttonHeight}
    >
      {showSpinner ? (
        <Spinner
          size={fontSizes[size] + 2}
          color={theme.textColor}
          className="spinner"
        />
      ) : null}
      {React.Children.map(
        children,
        child => (typeof child === 'string' ? <span>{child}</span> : child)
      )}
    </EButton>
  );
};

Button.defaultProps = {
  primary: false,
  size: 'regular',
  color: theme.eleBgColor,
  showSpinner: false,
};

export default Button;
