import {render, screen} from 'testUtils';

import {Input} from './Input';

it('renders with default class', () => {
  render(<Input data-testid="target" />);
  const target = screen.getByTestId('target');
  expect(target).toHaveAttribute('data-ndl-input', '');
});

it('takes html input props', async () => {
  const onClick = jest.fn();
  const {user} = render(<Input data-testid="target" onClick={onClick} />);

  const target = screen.getByTestId('target');
  await user.click(target);
  expect(onClick).toHaveBeenCalledTimes(1);
});
