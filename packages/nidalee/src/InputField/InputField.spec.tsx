import {render, screen} from 'testUtils';

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

it('takes html div props', async () => {
  const onClick = jest.fn();
  const {user} = render(<InputField data-testid="target" onClick={onClick} />);
  const target = screen.getByTestId('target');
  await user.click(target);
  expect(onClick).toHaveBeenCalledTimes(1);
});
