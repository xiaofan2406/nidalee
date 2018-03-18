/* @flow */
import React from 'react';
import { css } from 'react-emotion';
import Input from './Input';

const cssFormField = css`
  margin-bottom: 16px;
`;

type FormFieldProps = {
  error: string,
};

class FormField extends React.Component<FormFieldProps> {
  static defaultProps = {
    error: '',
  };

  renderError = () => {
    const { error } = this.props;
    return <div>{error || null}</div>;
  };

  render() {
    const { error, ...rest } = this.props;
    return (
      <div className={cssFormField}>
        <Input {...rest} />
        {this.renderError()}
      </div>
    );
  }
}

export default FormField;
