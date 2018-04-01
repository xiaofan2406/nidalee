/* @flow */
import * as React from 'react';
import { css, cx } from 'react-emotion';
import { theme, defaultFont } from './styles';
import Input from './Input';

// by default if the helperText is >1 line, it will cause layout change
const cssFormField = css`
  ${defaultFont};
  margin-bottom: 18px;
  min-height: 56px;
  color: ${theme.subTextColor};

  & > .field-control {
    display: flex;
    align-items: center;

    & > label {
      text-align: right;
      width: 120px;
      margin-right: 16px;
    }

    & ${Input} {
      flex: 1;
    }
  }

  & > .helper-text {
    margin: 2px 0px 0px 136px;
    font-size: 12px;
    line-height: 1.4;
  }

  &.error {
    color: ${theme.colorDanger};
    & > .field-control > ${Input} {
      color: ${theme.colorDanger};
      border-color: ${theme.colorDanger};
    }
  }

  &.warning {
    color: ${theme.colorWarning};
    & > .field-control > ${Input} {
      color: ${theme.colorWarning};
      border-color: ${theme.colorWarning};
    }
  }

  &.success {
    color: ${theme.colorSuccess};
    & > .field-control > ${Input} {
      color: ${theme.colorSuccess};
      border-color: ${theme.colorSuccess};
    }
  }
`;

// TODO fix status enum optional
type FormFieldProps = {|
  children: React.Node,
  name: string,
  status: 'error' | 'warning' | 'success' | '',
  label: string | React.Node,
  helperText: string,
  className: string,
|};

class FormField extends React.Component<FormFieldProps> {
  static defaultProps = {
    name: '',
    status: '',
    label: '',
    helperText: '',
    className: '',
  };

  // TODO flow enum?
  get isStatusValid(): boolean {
    return ['error', 'warning', 'success'].includes(this.props.status);
  }

  renderChildren = () =>
    React.Children.map(
      this.props.children,
      child =>
        child.props.name
          ? child
          : React.cloneElement(child, {
              name: this.props.name,
            })
    );

  render() {
    const { name, label, status, helperText, className } = this.props;
    const classNames = cx([
      cssFormField,
      className,
      this.isStatusValid && status,
    ]);
    return (
      <div className={classNames}>
        <div className="field-control">
          <label htmlFor={name}>{label}</label>
          {this.renderChildren()}
        </div>
        <div className="helper-text">{helperText}</div>
      </div>
    );
  }
}

export default FormField;
