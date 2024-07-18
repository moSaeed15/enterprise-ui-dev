import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from '.';
import { renderComponent } from './test/utilities';

test.todo('it should render the component', () => {});

test('it should increment when the "Increment" button is pressed', async () => {
  const { user } = renderComponent(<Counter />);
  const currentCount = screen.getByTestId('current-count');
  const incrementButton = screen.getByRole('button', { name: /increment/i });

  expect(currentCount).toHaveTextContent('0');

  await user.click(incrementButton);

  
  expect(currentCount).toHaveTextContent('1');
  screen.debug();
});
