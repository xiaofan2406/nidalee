import {Box} from 'nidalee';

const BoxPage = () => {
  return (
    <>
      <Box className="w-36 h-36" layer="root">
        Root layer has darkest color
      </Box>

      <Box className="w-36 h-36">Default layer, transparent</Box>

      <Box className="w-36 h-36" layer="base">
        Base layer
      </Box>
    </>
  );
};

export default BoxPage;

export const info = {
  category: 'components',
};
