import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {InputField} from './InputField';

it('renders with default class', () => {
  render(<InputField data-testid="target" />);
  const target = screen.getByTestId('target');
  expect(target).toHaveClass('ndl-input-field');
});

it('adds additional class', () => {
  render(<InputField data-testid="target" className="more" />);
  const target = screen.getByTestId('target');
  expect(target).toHaveClass('ndl-input-field');
  expect(target).toHaveClass('more');
});

it('takes html div props', () => {
  const onClick = jest.fn();
  render(<InputField data-testid="target" onClick={onClick} />);
  const target = screen.getByTestId('target');
  userEvent.click(target);
  expect(onClick).toHaveBeenCalledTimes(1);
});
