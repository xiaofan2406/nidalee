import React from 'react';
import { render } from 'react-testing-library';
import Spinner from './Spinner';
import { theme } from '../styles';

test('snapshot matches', () => {
  const { container } = render(<Spinner />);
  expect(container.firstChild).toMatchSnapshot();
});

test('the border width will not exceed half of the size', () => {
  const { container } = render(<Spinner size={120} scale={7} />);
  expect(container.firstChild.firstChild).toHaveStyleRule(
    'border',
    `60px solid ${theme.primaryColor}`
  );
});
