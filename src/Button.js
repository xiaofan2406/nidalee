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

class Button extends React.Component<ButtonProps> {
  static defaultProps: ButtonDefaultProps = {
    primary: false,
    size: 'regular',
    color: theme.eleBgColor,
    showSpinner: false,
  };

  get size(): number {
    return fontSizes[this.props.size];
  }

  get height(): number {
    return ({ small: 30, regular: 36, large: 46 }: {
      [key: Size]: number,
    })[this.props.size];
  }

  get color(): string {
    const { primary, color } = this.props;
    return primary ? theme.primaryColor : color;
  }

  renderSpinner = () => {
    const { showSpinner } = this.props;

    return showSpinner ? (
      <Spinner
        size={this.size + 2}
        color={theme.textColor}
        className="spinner"
      />
    ) : null;
  };

  render() {
    const { children, primary, color, showSpinner, ...rest } = this.props;

    return (
      <EButton
        {...rest}
        color={this.color}
        size={this.size}
        height={this.height}
      >
        {this.renderSpinner()}
        {React.Children.map(
          children,
          child => (typeof child === 'string' ? <span>{child}</span> : child)
        )}
      </EButton>
    );
  }
}

export default Button;
