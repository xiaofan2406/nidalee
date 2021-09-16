import React from 'react';
import {render, screen} from '@testing-library/react';

import {Box} from './Box';

it('renders default box layer', () => {
  render(<Box data-testid="box">box</Box>);
  const box = screen.getByTestId('box');
  expect(box).toHaveClass('ndl-box');
  expect(box).toHaveClass('layer-default');
});

it('adds additional class', () => {
  render(
    <Box data-testid="box" className="more">
      box
    </Box>
  );
  const box = screen.getByTestId('box');
  expect(box).toHaveClass('ndl-box');
  expect(box).toHaveClass('more');
});

it('takes html Box props', () => {
  render(
    <Box data-testid="box" tabIndex={0}>
      testButton
    </Box>
  );
  const box = screen.getByTestId('box');
  expect(box).toHaveAttribute('tabIndex', '0');
});

it('has base layer class', () => {
  render(
    <Box data-testid="box" layer="base">
      box
    </Box>
  );
  const box = screen.getByTestId('box');
  expect(box).toHaveClass('layer-base');
});

it('has root layer class', () => {
  render(
    <Box data-testid="box" layer="root">
      box
    </Box>
  );
  const box = screen.getByTestId('box');
  expect(box).toHaveClass('layer-root');
});
