import * as React from 'react';
import {Disclosure, Box} from 'nidalee';

const DisclosurePage = () => {
  return (
    <>
      <Disclosure content={<Box>some content</Box>}>Toggle</Disclosure>
    </>
  );
};

export default DisclosurePage;

export const info = {
  category: 'components',
};
