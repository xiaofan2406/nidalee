/* @flow */
import React from 'react';
import { css } from 'react-emotion';
import UncontrolledFormDemo from './UncontrolledFormDemo';
import ControlledFormDemo from './ControlledFormDemo';

const cssContact = css`
  text-align: center;
`;

const Contact = () => (
  <div className={cssContact}>
    <h2>Uncontrolled:</h2>
    <UncontrolledFormDemo />
    <h2>Controlled:</h2>
    <ControlledFormDemo />
  </div>
);

export default Contact;
