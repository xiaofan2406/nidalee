import {IconButton} from 'nidalee';

const IconButtonPage = () => {
  return (
    <>
      <IconButton name="airplay" />
      <IconButton name="x" size={12} />
      <IconButton name="align-left" size={24} />
      <IconButton name="align-right" accented />
      <IconButton name="align-right" circle />
    </>
  );
};

export default IconButtonPage;

export const info = {
  category: 'components',
};
