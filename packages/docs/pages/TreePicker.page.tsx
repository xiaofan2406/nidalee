import {TreePicker} from 'nidalee';

const getPosts = async () => {
  const result = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await result.json();

  const nodes = posts
    .map((post) => ({
      ...post,
      label: post.title,
      type: 'post',
    }))
    .slice(0, 11);
  return nodes;
};

const getComments = async (postId) => {
  const result = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
  );
  const comments = await result.json();
  const nodes = comments
    .map((comment) => ({
      ...comment,
      label: comment.name,
      type: 'comment',
    }))
    .slice(0, 11);
  return nodes;
};

const Demo1 = () => {
  return (
    <TreePicker
      renderNode={(node) =>
        node.type === 'post' ? (
          <TreePicker.Node node={node}>
            <TreePicker.Node.Content>{node.label}</TreePicker.Node.Content>
            <TreePicker.Node.Expand resolveNodes={() => getComments(node.id)} />
          </TreePicker.Node>
        ) : (
          <TreePicker.Node node={node}>
            <TreePicker.Node.Content>{node.label}</TreePicker.Node.Content>
            <TreePicker.Node.Add />
          </TreePicker.Node>
        )
      }
    >
      <TreePicker.Tree resolveNodes={getPosts} />
    </TreePicker>
  );
};

const TreePickerPage = () => {
  return (
    <>
      <Demo1 />
    </>
  );
};

export default TreePickerPage;

export const info = {
  category: 'components',
};
