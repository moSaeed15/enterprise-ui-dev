import Counter from '.';
import { renderComponent, screen } from './test/utilities';

test('it should render the component', () => {
  renderComponent(<Counter />);
  const currentCount = screen.getByTestId('current-count');
  expect(currentCount).toHaveTextContent('0');
});

test('it should increment when the "Increment" button is pressed', async () => {
  const { user } = renderComponent(<Counter />);

  const currentCount = screen.getByTestId('current-count');
  const incrementButton = screen.getByRole('button', { name: 'Increment' });

  await user.click(incrementButton);

  expect(currentCount).toHaveTextContent('1');
});

test('it should render the component with an initial count', () => {
  renderComponent(<Counter initialCount={400} />);
  const currentCount = screen.getByTestId('current-count');
  expect(currentCount).toHaveTextContent('400');
});

test('it should reset the count when the "Reset" button is pressed', async () => {
  const { user } = renderComponent(<Counter />);
  const currentCount = screen.getByTestId('current-count');
  const incrementButton = screen.getByRole('button', { name: 'Increment' });
  const reset = screen.getByRole('button', { name: 'Reset' });

  expect(currentCount).toHaveTextContent('0');
  await user.click(incrementButton);
  expect(currentCount).toHaveTextContent('1');
  await user.click(reset);
  expect(currentCount).toHaveTextContent('0');
});
