/* @flow */
import React from 'react';
import { render } from 'react-testing-library';
import Button from './Button';

test('Button component matches snapshot', () => {
  const { container } = render(<Button>Click</Button>);

  expect(container.firstChild).toMatchSnapshot();
});
