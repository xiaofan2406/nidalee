/* @flow */
import React from 'react';
import { shallow } from 'enzyme';
import Button from '../Button';

test('Button component matches snapshot', () => {
  const component = shallow(<Button />);

  expect(component).toMatchSnapshot();
});
