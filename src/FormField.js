/* @flow */
import * as React from 'react';
import { css, cx } from 'react-emotion';
import { theme } from './styles';
import Input from './Input';

const cssFormField = css`
  margin-bottom: 24px;
  min-height: 48px;

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
    margin: 4px 0px 0px 136px;
    font-size: 12px;
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

type FormFieldProps = {
  name: string,
  label: string | React.Node,
  status: 'error' | 'warning' | 'success' | 'none',
  helperText?: string,
  className?: string,
};

class FormField extends React.Component<FormFieldProps> {
  static defaultProps = {
    status: 'none',
    helperText: '',
  };

  renderHelperContent = () => {
    const { helperText } = this.props;
    return <div className="helper-text">{helperText}</div>;
  };

  render() {
    const { name, label, status, helperText, className, ...rest } = this.props;
    const classNames = cx([cssFormField, className, status]);
    return (
      <div className={classNames}>
        <div className="field-control">
          <label htmlFor={name}>{label}:</label>
          <Input name={name} {...rest} />
        </div>
        {this.renderHelperContent()}
      </div>
    );
  }
}

export default FormField;
