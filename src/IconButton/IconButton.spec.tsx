import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {IconButton} from './IconButton';

it('renders with default class', () => {
  render(<IconButton name="x" data-testid="target" />);
  const target = screen.getByTestId('target');
  expect(target).toHaveClass('ndl-icon-button');
  const svg = screen.queryByRole('img');
  expect(svg).toHaveAttribute('width', '20');
  expect(svg).toHaveAttribute('height', '20');
});

it('adds additional class', () => {
  render(<IconButton name="x" data-testid="target" className="more" />);
  const target = screen.getByTestId('target');
  expect(target).toHaveClass('ndl-icon-button');
  expect(target).toHaveClass('more');
});

it('takes Button props', () => {
  const onClick = jest.fn();
  render(
    <IconButton name="x" data-testid="target" accented onClick={onClick} />
  );
  const target = screen.getByTestId('target');
  expect(target).toHaveClass('accented');
  userEvent.click(target);
  expect(onClick).toHaveBeenCalledTimes(1);
});

it('has circle class', () => {
  render(<IconButton name="x" data-testid="target" circle />);
  const target = screen.getByTestId('target');
  expect(target).toHaveClass('ndl-icon-button');
  expect(target).toHaveClass('circle');
});

it('forwards the size & color prop to svg', () => {
  render(<IconButton name="x" data-testid="target" color="red" size={36} />);
  const svg = screen.queryByRole('img');
  expect(svg).toHaveAttribute('width', '36');
  expect(svg).toHaveAttribute('height', '36');
  expect(svg).toHaveAttribute('stroke', 'red');
});
