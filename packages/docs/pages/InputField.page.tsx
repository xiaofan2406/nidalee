import {Box, IconButton, InputField} from 'nidalee';

const Demo1 = () => {
  return (
    <Box className="w-72 flex flex-col" layer="base">
      <InputField
        label="Feedback"
        start={<IconButton name="aperture" />}
        end={<IconButton name="award" />}
        error="something went wrong"
      />

      <InputField
        label="Feedback"
        start={<IconButton name="aperture" />}
        end={<IconButton name="award" />}
        error="something went wrong"
      />
    </Box>
  );
};

const InputFieldPage = () => {
  return (
    <>
      <Demo1 />
    </>
  );
};

export default InputFieldPage;

export const info = {
  category: 'components',
};
