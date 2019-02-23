import React from 'react';
import { render } from 'react-testing-library';
import Icon from './Icon';

it('has the correct fa classes with type and name', () => {
  const { getByTestId } = render(
    <Icon type="solid" name="arrow-up" data-testid="icon" />
  );

  expect(getByTestId('icon')).toHaveClass('fas fa-arrow-up');
});

it('has the correct fa classes with className', () => {
  const { getByTestId } = render(
    <Icon className="fas fa-arrow-up" data-testid="icon" />
  );

  expect(getByTestId('icon')).toHaveClass('fas fa-arrow-up');
});
