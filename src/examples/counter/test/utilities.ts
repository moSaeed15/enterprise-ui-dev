import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactElement } from 'react';

export * from '@testing-library/react';

type RenderOptions = Parameters<typeof render>[1];

export const renderComponent = (ui: ReactElement, options?: RenderOptions) => {
  return { ...render(ui, options), user: userEvent.setup() };
};
