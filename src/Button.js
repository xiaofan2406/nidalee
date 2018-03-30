/* @flow */
import * as React from 'react';
import styled from 'react-emotion';
import Color from 'color';
import { theme, defaultText } from './styles';
import { I } from './Icon';
import Spinner from './Spinner';

const ButtonE = styled.button`
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

  ${defaultText};
  min-height: 36px;
  padding: 8px 12px;
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
      ? '0px 1px 3px 0px rgba(0, 0, 0, 0.5), 0px 2px 2px 0px rgba(0, 0, 0, 0.2), 0px 2px 0px 0px rgba(0, 0, 0, 0.1)'
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

type ButtonProp = {
  children: React.Node,
  type: string,
  primary: boolean,
  color: string,
  showSpinner: boolean,
};

// TODO button size
class Button extends React.Component<ButtonProp> {
  static defaultProps = {
    type: 'button',
    primary: false,
    color: theme.eleBgColor,
    showSpinner: false,
  };

  get color(): string {
    const { primary, color } = this.props;
    return primary ? theme.primaryColor : color;
  }

  renderSpinner = () => {
    const { showSpinner } = this.props;

    return showSpinner ? (
      <Spinner size={16} color={theme.textColor} className="spinner" />
    ) : null;
  };

  renderChildren = () =>
    React.Children.map(
      this.props.children,
      child => (typeof child === 'string' ? <span>{child}</span> : child)
    );

  render() {
    const { primary, color, showSpinner, ...rest } = this.props;

    return (
      <ButtonE color={this.color} {...rest}>
        {this.renderSpinner()}
        {this.renderChildren()}
      </ButtonE>
    );
  }
}

export default Button;
