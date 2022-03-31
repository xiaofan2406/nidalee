import * as React from 'react';
import {Box, Dropdown} from 'nidalee';

const Demo1 = () => {
  return (
    <Dropdown
      content={
        <ul>
          <li>test</li>
          <li>test</li>
        </ul>
      }
    >
      open
    </Dropdown>
  );
};

const DropdownPage = () => {
  return (
    <Box className="w-96 h-96">
      <Demo1 />
    </Box>
  );
};

export default DropdownPage;

export const info = {
  category: 'components',
};
