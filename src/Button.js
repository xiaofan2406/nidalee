/* @flow */
import * as React from 'react';
import { css, cx } from 'react-emotion';
import { theme, ripple } from './styles';
import Spinner from './Spinner';

const cssButton = css`
  display: inline-flex;
  align-items: center;
  vertical-align: middle;

  ${ripple};
  cursor: pointer;
  user-select: none;

  padding: 8px 12px;
  margin: 0px 8px 8px 0px;

  font-size: 14px;
  min-height: 36px;

  border: none;
  border-radius: 2px;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1),
    0px 2px 2px 0px rgba(0, 0, 0, 0.08), 0px 3px 1px -2px rgba(0, 0, 0, 0.04);

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

  color: ${theme.color};
  background-color: #f5f5f5;
  &.primary {
    color: #ffffff;
    background-color: ${theme.primaryColor};
  }
`;

type ButtonProp = {
  children: React.Node,
  primary: boolean,
  showSpinner: boolean,
};

class Button extends React.Component<ButtonProp> {
  static defaultProps = {
    primary: false,
    showSpinner: false,
  };

  renderSpinner = () => {
    const { primary, showSpinner } = this.props;
    return showSpinner ? (
      <Spinner
        size={16}
        color={primary ? '#ffffff' : theme.color}
        className="spinner"
      />
    ) : null;
  };

  render() {
    const { children, primary, ...rest } = this.props;
    const wrappedChildren = React.Children.map(
      children,
      child => (typeof child === 'string' ? <span>{child}</span> : child)
    );
    const classNames = cx([cssButton, primary && 'primary']);
    return (
      <button className={classNames} {...rest}>
        {this.renderSpinner()}
        {wrappedChildren}
      </button>
    );
  }
}

export default Button;
