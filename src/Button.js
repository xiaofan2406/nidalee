/* @flow */
import * as React from 'react';
import styled from 'react-emotion';
import Color from 'color';
import { theme, fontSizes } from './styles';
import { I } from './Icon';
import Spinner from './Spinner';

const EButton = styled.button`
  display: inline-flex;
  align-items: center;
  vertical-align: top;

  outline: none;
  cursor: pointer;
  user-select: none;
  &:focus {
    background-color: ${({ color }) =>
      Color(color)
        .darken(0.2)
        .string()};
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
  box-shadow: ${({ color }) =>
    color !== theme.eleBgColor
      ? '0px 1px 3px 0px rgba(0, 0, 0, 0.4), 0px 2px 2px 0px rgba(0, 0, 0, 0.2), 0px 2px 0px 0px rgba(0, 0, 0, 0.1)'
      : 'unset'};

  background-position: center;
  transition: background 0.6s;
  &:hover {
    background: ${({ color }) => color}
      radial-gradient(
        circle,
        transparent 1%,
        ${({ color }) =>
            Color(color)
              .lighten(0.2)
              .string()}
          1%
      )
      center/15000%;
  }
  &:active {
    background-color: ${({ color }) =>
      Color(color)
        .darken(0.2)
        .string()};
    background-size: 100%;
    transition: background 0s;
  }
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

Button.defaultProps = ({
  primary: false,
  size: 'regular',
  color: theme.eleBgColor,
  showSpinner: false,
}: ButtonDefaultProps);

export default Button;
