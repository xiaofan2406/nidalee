import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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

it('takes html input props', () => {
  const onClick = jest.fn();
  render(<Input data-testid="target" onClick={onClick} />);
  const target = screen.getByTestId('target');
  userEvent.click(target);
  expect(onClick).toHaveBeenCalledTimes(1);
});
