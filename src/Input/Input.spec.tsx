import * as React from 'react';
import {render, screen} from 'testUtils';

import {Input} from './Input';

it('renders with default class', () => {
  render(<Input data-testid="target" />);
  const target = screen.getByTestId('target');
  expect(target).toHaveClass('ndl-input');
});

it('adds additional class', () => {
  render(<Input data-testid="target" className="more" />);
  const target = screen.getByTestId('target');
  expect(target).toHaveClass('ndl-input');
  expect(target).toHaveClass('more');
});

it('takes html input props', async () => {
  const onClick = jest.fn();
  const {user} = render(<Input data-testid="target" onClick={onClick} />);
  const target = screen.getByTestId('target');
  await user.click(target);
  expect(onClick).toHaveBeenCalledTimes(1);
});
