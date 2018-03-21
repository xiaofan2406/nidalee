/* @flow */
import * as React from 'react';
import { css, cx } from 'react-emotion';
import { theme, defaultText } from './styles';
import Input from './Input';

// by default if the helperText is >1 line, it will cause layout change
const cssFormField = css`
  ${defaultText};
  margin-bottom: 18px;
  min-height: 56px;

  & .field-control {
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
    & ${Input} {
      color: ${theme.colorDanger};
      border-color: ${theme.colorDanger};
    }
  }

  &.warning {
    color: ${theme.colorWarning};
    & ${Input} {
      color: ${theme.colorWarning};
      border-color: ${theme.colorWarning};
    }
  }

  &.success {
    color: ${theme.colorSuccess};
    & ${Input} {
      color: ${theme.colorSuccess};
      border-color: ${theme.colorSuccess};
    }
  }
`;

// TODO fix status enum optional
type FormFieldProps = {
  name: string,
  status: 'error' | 'warning' | 'success' | 'none',
  label?: string | React.Node,
  helperText?: string,
  className?: string,
  inputRef?: (?HTMLInputElement) => void,
  value?: ?string | number,
};

class FormField extends React.Component<FormFieldProps> {
  static defaultProps = {
    helperText: '',
  };

  // TODO flow enum?
  get isStatusValid(): boolean {
    return ['error', 'warning', 'success'].includes(this.props.status);
  }

  render() {
    const {
      name,
      label,
      status,
      helperText,
      inputRef,
      value,
      className,
      ...rest
    } = this.props;
    const classNames = cx([
      cssFormField,
      className,
      this.isStatusValid && status,
    ]);
    return (
      <div className={classNames}>
        <div className="field-control">
          <label htmlFor={name}>{label ? <>{label}:</> : null}</label>
          <Input name={name} {...rest} innerRef={inputRef} value={value} />
        </div>
        <div className="helper-text">{helperText}</div>
      </div>
    );
  }
}

export default FormField;
