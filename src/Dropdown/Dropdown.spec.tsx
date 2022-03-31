import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {Dropdown} from './Dropdown';

it('renders with default class', () => {
  render(<Dropdown data-testid="target">Dropdown</Dropdown>);
  const target = screen.getByTestId('target');
  expect(target).toHaveClass('ndl-dropdown');
});

it('adds additional class', () => {
  render(
    <Dropdown data-testid="target" className="more">
      Dropdown
    </Dropdown>
  );
  const target = screen.getByTestId('target');
  expect(target).toHaveClass('ndl-dropdown');
  expect(target).toHaveClass('more');
});

it('takes html div props', () => {
  const onClick = jest.fn();
  render(
    <Dropdown data-testid="target" onClick={onClick}>
      Dropdown
    </Dropdown>
  );
  const target = screen.getByTestId('target');
  userEvent.click(target);
  expect(onClick).toHaveBeenCalledTimes(1);
});
