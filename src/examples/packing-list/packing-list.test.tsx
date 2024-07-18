import { render as _render, screen } from 'test/utilities';
import { PackingList } from '.';
import userEvent from '@testing-library/user-event';
import { createStore } from './store';
import { Provider } from 'react-redux';
import { ReactElement } from 'react';

const render = (ui: ReactElement) => {
  return _render(<Provider store={createStore()}>{ui}</Provider>);
};

it('renders the Packing List application', () => {
  render(<PackingList />);
});

it('has the correct title', async () => {
  render(<PackingList />);
  screen.getByText('Packing List');
});

it('has an input field for a new item', () => {
  render(<PackingList />);
  const input = screen.getByPlaceholderText('New Item');

  expect(input).toBeInTheDocument();
});

it('has a "Add New Item" button that is disabled when the input is empty', () => {
  render(<PackingList />);
  const input = screen.getByPlaceholderText('New Item');
  const addButton = screen.getByRole('button', { name: /Add New Item/i });
  expect(input).toHaveValue('');

  expect(addButton).toBeDisabled();
});

it('enables the "Add New Item" button when there is text in the input field', async () => {
  const { user } = render(<PackingList />);

  const input = screen.getByPlaceholderText('New Item');
  const addButton = screen.getByRole('button', { name: /Add New Item/i });

  expect(input).toHaveValue('');

  await user.type(input, 'MacBook Pro');

  expect(addButton).toBeEnabled();
});

it('adds a new item to the unpacked item list when the clicking "Add New Item"', async () => {
  const { user } = render(<PackingList />);

  const input = screen.getByPlaceholderText('New Item');
  const addButton = screen.getByRole('button', { name: /Add New Item/i });

  await user.type(input, 'MacBook Pro');

  await user.click(addButton);

  const label = screen.getByLabelText('MacBook Pro');

  expect(label).not.toBeChecked();
});
