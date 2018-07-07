import Prism from 'prismjs';

Prism.plugins.NormalizeWhitespace.setDefaults({
  'break-lines': 80,
});

export default code => Prism.highlight(code, Prism.languages.tsx, 'tsx');
