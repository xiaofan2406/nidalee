import {render, screen} from 'testUtils';

import {Anchor} from './Anchor';

it('renders an anchor', () => {
  render(<Anchor data-testid="link">link</Anchor>);
  const anchor = screen.getByTestId('link');
  expect(anchor).toHaveAttribute('data-ndl-anchor', '');
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

it('has rel attribute set when target is _blank', () => {
  render(
    <Anchor data-testid="link" target="_blank">
      link
    </Anchor>
  );
  const anchor = screen.getByTestId('link');
  expect(anchor).toHaveAttribute('target', '_blank');
  expect(anchor).toHaveAttribute('rel', 'noopener noreferrer');
});

it('has rel attribute when target is not _blank', () => {
  render(
    <Anchor data-testid="link" rel="help">
      link
    </Anchor>
  );
  const anchor = screen.getByTestId('link');
  expect(anchor).toHaveAttribute('rel', 'help');
});

it('takes in additional rel attribute when target is _blank', () => {
  render(
    <Anchor data-testid="link" target="_blank" rel="help">
      link
    </Anchor>
  );
  const anchor = screen.getByTestId('link');
  expect(anchor).toHaveAttribute('target', '_blank');
  expect(anchor).toHaveAttribute('rel', 'noopener noreferrer help');
});

it('removes duplicated rel attribute when target is _blank', () => {
  render(
    <Anchor data-testid="link" target="_blank" rel="noopener help help">
      link
    </Anchor>
  );
  const anchor = screen.getByTestId('link');
  expect(anchor).toHaveAttribute('target', '_blank');
  expect(anchor).toHaveAttribute('rel', 'noopener noreferrer help');
});

it('removes duplicated rel attribute when target is not _blank', () => {
  render(
    <Anchor data-testid="link" rel="noopener help help">
      link
    </Anchor>
  );
  const anchor = screen.getByTestId('link');
  expect(anchor).toHaveAttribute('rel', 'noopener help');
});
