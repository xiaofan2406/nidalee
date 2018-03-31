/* @flow */
import React from 'react';
import AllStatesDemo from './AllStatesDemo';
import ControlledDemo from './ControlledDemo';
import UncontrolledDemo from './UncontrolledDemo';

const Form = () => (
  <div>
    <h2>Form fields</h2>
    <AllStatesDemo />
    <h2>Controlled Form Demo</h2>
    <ControlledDemo />
    <h2>Uncontrolled Form Demo</h2>
    <UncontrolledDemo />
  </div>
);

export default Form;
