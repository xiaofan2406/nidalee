import {Box, Anchor} from 'nidalee';

const AnchorPage = () => {
  return (
    <>
      <Box className="p-4">
        <Anchor
          target="_blank"
          href="https://www.w3.org/TR/wai-aria-practices-1.1"
        >
          WAI-ARIA Authoring Practices 1.1
        </Anchor>
      </Box>

      <Box className="p-4">
        <Anchor href="#">link1</Anchor>
      </Box>
    </>
  );
};

export default AnchorPage;

export const info = {
  category: 'components',
};
