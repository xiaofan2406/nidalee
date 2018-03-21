/* @flow */
import React from 'react';
import UncontrolledFormDemo from './UncontrolledFormDemo';
import ControlledFormDemo from './ControlledFormDemo';

const Contact = () => (
  <div>
    <h2>Uncontrolled:</h2>
    <UncontrolledFormDemo />
    <h2>Controlled:</h2>
    <ControlledFormDemo />
  </div>
);

export default Contact;
