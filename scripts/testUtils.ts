import * as React from 'react';
import {render, RenderOptions} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const customRender = (ui: React.ReactElement, options?: RenderOptions) => ({
  user: userEvent.setup(),
  ...render(ui, options),
});

// re-export everything
export * from '@testing-library/react';

// override render method
export {customRender as render};
