import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {Button} from './Button';

it('has data-ndl-button attribute', () => {
  render(<Button>testButton</Button>);

  expect(screen.getByText('testButton')).toHaveAttribute('data-ndl-button');
});

it('has type="button" by default', () => {
  render(<Button>testButton</Button>);

  expect(screen.getByText('testButton')).toHaveAttribute('type', 'button');
});

it('type is overwritable', () => {
  render(<Button type="submit">testButton</Button>);

  expect(screen.getByText('testButton')).toHaveAttribute('type', 'submit');
});

it('accented prop adds data-accented attribute', () => {
  render(<Button accented>testButton</Button>);

  expect(screen.getByText('testButton')).toHaveAttribute('data-accented');
});

it('takes html button props', () => {
  const onClick = jest.fn();
  render(<Button onClick={onClick}>testButton</Button>);
  userEvent.click(screen.getByText('testButton'));

  expect(onClick).toHaveBeenCalledTimes(1);
});
