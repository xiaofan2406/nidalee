import * as React from 'react';
import {Box, Tag} from 'nidalee';

const Demo1 = () => {
  const [tags, setTags] = React.useState<{[key: string]: boolean}>({
    Trending: false,
    Latest: false,
    All: false,
  });

  return (
    <Box>
      {Object.keys(tags).map((tag) => {
        return (
          <Tag
            key={tag}
            onActivate={() => setTags((prev) => ({...prev, [tag]: true}))}
            onRemove={() => setTags((prev) => ({...prev, [tag]: false}))}
          >
            {tag}
            {tags[tag] ? '*' : ''}
          </Tag>
        );
      })}
    </Box>
  );
};

const TagPage = () => {
  return (
    <>
      <Demo1 />
    </>
  );
};

export default TagPage;

export const info = {
  category: 'components',
};
