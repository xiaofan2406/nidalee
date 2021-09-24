import * as React from 'react';
import {Button, Box} from 'nidalee';

const ButtonPage = () => {
  return (
    <>
      <Box className="w-64 h-64" layer="base">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque non
        vestibulum justo. Donec tortor ligula, vestibulum ac ipsum ac, fringilla
        semper nulla. Etiam lobortis vulputate mollis. Curabitur id velit et
        augue vestibulum tempus.
        <Button>Normal Button</Button>
        <Button mode="text">Text Button</Button>
      </Box>

      <Box>
        <Button accented>Normal Accented</Button>
      </Box>

      <Box>
        <Button accented mode="text">
          Text Accented
        </Button>
      </Box>

      <Box>
        <Button disabled>Disabled</Button>
      </Box>

      <Box>
        <Button disabled mode="text">
          Disabled Text
        </Button>
      </Box>

      <Box>
        <Button disabled accented>
          Disabled Accented
        </Button>
      </Box>

      <Box>
        <Button disabled accented mode="text">
          Disabled Text Accented
        </Button>
      </Box>
    </>
  );
};

export default ButtonPage;

export const info = {
  category: 'components',
};
