import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import Button from './Button';

it('takes html button props', () => {
  const onClick = jest.fn();
  const { getByText } = render(<Button onClick={onClick}>Click</Button>);

  fireEvent.click(getByText('Click'));
  expect(onClick).toHaveBeenCalledTimes(1);
});

it('sets background color', () => {
  const { getByText } = render(<Button color="red">Click</Button>);

  expect(getByText('Click')).toHaveStyle('background-color: red');
});
