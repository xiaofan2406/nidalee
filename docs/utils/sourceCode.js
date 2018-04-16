import Prism from 'prismjs';
import loadLanguages from 'prismjs/components/index';

loadLanguages(['tsx']);

export default code => Prism.highlight(code, Prism.languages.tsx, 'tsx');
