import React from 'react';
import {render, screen} from 'testUtils';

import {Anchor} from './Anchor';

it('renders an anchor', () => {
  render(<Anchor data-testid="link">link</Anchor>);
  const anchor = screen.getByTestId('link');
  expect(anchor).toHaveClass('ndl-anchor');
});

it('adds additional class', () => {
  render(
    <Anchor data-testid="link" className="more">
      link
    </Anchor>
  );
  const anchor = screen.getByTestId('link');
  expect(anchor).toHaveClass('ndl-anchor');
  expect(anchor).toHaveClass('more');
});

it('takes html anchor props', () => {
  render(
    <Anchor data-testid="link" href="#">
      testButton
    </Anchor>
  );
  const anchor = screen.getByTestId('link');
  expect(anchor).toHaveAttribute('href', '#');
});

it('has rel attribute set when target is blank', () => {
  render(
    <Anchor data-testid="link" target="_blank">
      link
    </Anchor>
  );
  const anchor = screen.getByTestId('link');
  expect(anchor).toHaveAttribute('target', '_blank');
  expect(anchor).toHaveAttribute('rel', 'noopener noreferrer');
});
