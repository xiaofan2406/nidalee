import Prism from 'prismjs';
import loadLanguages from 'prismjs/components/index';
import Normalizer from 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace';

loadLanguages(['tsx']);
const normalizer = new Normalizer({
  'break-lines': 80,
});

export default code =>
  Prism.highlight(normalizer.normalize(code), Prism.languages.tsx, 'tsx');
