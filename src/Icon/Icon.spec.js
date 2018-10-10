import React from 'react';
import { render } from 'react-testing-library';
import Icon from './Icon';

test('snapshot matches with type and name', () => {
  const { container } = render(<Icon type="solid" name="arrow-up" />);
  expect(container.firstChild).toMatchSnapshot();
});

test('snapshot matches with className', () => {
  const { container } = render(<Icon className="fas fa-arrow-up" />);
  expect(container.firstChild).toMatchSnapshot();
});
