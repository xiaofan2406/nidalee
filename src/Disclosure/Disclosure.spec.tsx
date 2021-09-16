import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {Disclosure} from './Disclosure';

it('renders a text button with content hidden by default', () => {
  render(
    <Disclosure
      data-testid="disclosure"
      content={<div data-testid="content">some content</div>}
    >
      Toggle
    </Disclosure>
  );
  const disclosure = screen.getByTestId('disclosure');
  expect(disclosure).toHaveClass('ndl-disclosure');
  expect(screen.queryByTestId('content')).not.toBeInTheDocument();
});

it('adds additional class', () => {
  render(
    <Disclosure
      data-testid="disclosure"
      content={<div data-testid="content">some content</div>}
      className="more"
    >
      Toggle
    </Disclosure>
  );
  const disclosure = screen.getByTestId('disclosure');
  expect(disclosure).toHaveClass('ndl-disclosure');
  expect(disclosure).toHaveClass('more');
});

it('takes html button props', () => {
  const onDoubleClick = jest.fn();
  render(
    <Disclosure
      data-testid="disclosure"
      content={<div data-testid="content">some content</div>}
      onDoubleClick={onDoubleClick}
    >
      Toggle
    </Disclosure>
  );
  expect(onDoubleClick).toHaveBeenCalledTimes(0);

  userEvent.dblClick(screen.getByTestId('disclosure'));
  expect(onDoubleClick).toHaveBeenCalledTimes(1);
});

it('forwards the onClick event', () => {
  const onClick = jest.fn();
  render(
    <Disclosure
      data-testid="disclosure"
      content={<div data-testid="content">some content</div>}
      onClick={onClick}
    >
      Toggle
    </Disclosure>
  );
  expect(onClick).toHaveBeenCalledTimes(0);

  userEvent.click(screen.getByTestId('disclosure'));
  expect(onClick).toHaveBeenCalledTimes(1);
});

it('cannot have type=submit', () => {
  render(
    <Disclosure
      data-testid="disclosure"
      content={<div data-testid="content">some content</div>}
      type="submit"
    >
      Toggle
    </Disclosure>
  );
  const disclosure = screen.getByTestId('disclosure');
  expect(disclosure).toHaveAttribute('type', 'button');
});

it('toggles the visibility of the content', () => {
  render(
    <Disclosure
      data-testid="disclosure"
      content={<div data-testid="content">some content</div>}
    >
      Toggle
    </Disclosure>
  );
  expect(screen.queryByTestId('content')).not.toBeInTheDocument();

  userEvent.click(screen.getByTestId('disclosure'));
  expect(screen.queryByTestId('content')).toBeInTheDocument();

  userEvent.click(screen.getByTestId('disclosure'));
  expect(screen.queryByTestId('content')).not.toBeInTheDocument();
});

it('has the aria-expanded attribute based on the content visibility', () => {
  render(
    <Disclosure
      data-testid="disclosure"
      content={<div data-testid="content">some content</div>}
    >
      Toggle
    </Disclosure>
  );
  expect(screen.getByTestId('disclosure')).toHaveAttribute(
    'aria-expanded',
    'false'
  );

  userEvent.click(screen.getByTestId('disclosure'));
  expect(screen.getByTestId('disclosure')).toHaveAttribute(
    'aria-expanded',
    'true'
  );

  userEvent.click(screen.getByTestId('disclosure'));
  expect(screen.getByTestId('disclosure')).toHaveAttribute(
    'aria-expanded',
    'false'
  );
});
