import {Box, Input} from 'nidalee';

const Demo1 = () => {
  return <Input />;
};

const InputPage = () => {
  return (
    <>
      <Demo1 />
      <Box className="w-100 h-48 p-4" layer="base">
        <Input />
      </Box>
    </>
  );
};

export default InputPage;

export const info = {
  category: 'components',
};
