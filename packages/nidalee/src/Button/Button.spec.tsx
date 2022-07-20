import {render, screen} from 'testUtils';

import {Button} from './Button';

it('renders button mode by default', () => {
  render(<Button data-testid="button">Click</Button>);
  const button = screen.getByTestId('button');
  expect(button).toHaveClass('ndl-button');
  expect(button).toHaveClass('mode-button');
});

it('adds additional class', () => {
  render(
    <Button data-testid="button" className="more">
      Click
    </Button>
  );
  const button = screen.getByTestId('button');
  expect(button).toHaveClass('ndl-button');
  expect(button).toHaveClass('more');
});

it('takes html button props', async () => {
  const onClick = jest.fn();
  const {user} = render(
    <Button data-testid="button" onClick={onClick}>
      Click
    </Button>
  );
  expect(onClick).toHaveBeenCalledTimes(0);

  await user.click(screen.getByTestId('button'));
  expect(onClick).toHaveBeenCalledTimes(1);
});

it('has type="button" by default', () => {
  render(<Button data-testid="button">Click</Button>);
  const button = screen.getByTestId('button');
  expect(button).toHaveAttribute('type', 'button');
});

it('can overwrite type prop', () => {
  render(
    <Button data-testid="button" type="submit">
      Click
    </Button>
  );
  const button = screen.getByTestId('button');
  expect(button).toHaveAttribute('type', 'submit');
});

it('has accented class', () => {
  render(
    <Button data-testid="button" accented>
      Click
    </Button>
  );
  const button = screen.getByTestId('button');
  expect(button).toHaveClass('accented');
});

it('has text mode class', () => {
  render(
    <Button data-testid="button" mode="text">
      Click
    </Button>
  );
  const button = screen.getByTestId('button');
  expect(button).toHaveClass('mode-text');
});
