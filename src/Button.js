/* @flow */
import * as React from 'react';
import styled from 'react-emotion';
import Color from 'color';
import { theme, colors, defaultFont } from './styles';
import { I } from './Icon';
import Spinner from './Spinner';

const getContentColor = colorProp =>
  colorProp === theme.eleBgColor ? theme.color : colors.white;

const ButtonE = styled.button`
  display: inline-flex;
  align-items: center;
  vertical-align: top;

  cursor: pointer;
  user-select: none;

  ${defaultFont};
  min-height: 36px;
  padding: 8px 12px;
  margin: 0px 8px 0px 0px;

  border: none;
  border-radius: 2px;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1),
    0px 2px 2px 0px rgba(0, 0, 0, 0.08), 0px 3px 1px -2px rgba(0, 0, 0, 0.04);

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

  color: ${({ color }) => getContentColor(color)};
  background-color: ${({ color }) => color};

  background-position: center;
  transition: background 0.6s;
  &:hover {
    background: ${({ color }) => color}
      radial-gradient(
        circle,
        transparent 1%,
        ${({ color }) =>
            Color(color)
              .darken(0.1)
              .string()}
          1%
      )
      center/15000%;
  }
  &:active {
    background-color: ${({ color }) =>
      Color(color)
        .lighten(0.2)
        .string()};
    background-size: 100%;
    transition: background 0s;
  }
`;

type ButtonProp = {
  children: React.Node,
  primary: boolean,
  color: string,
  showSpinner: boolean,
};

// TODO button size
class Button extends React.Component<ButtonProp> {
  static defaultProps = {
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
      <Spinner
        size={16}
        color={getContentColor(this.color)}
        className="spinner"
      />
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
