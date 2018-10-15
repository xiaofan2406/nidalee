import pkg from './package.json';

const libName = pkg.name;

export default {
  typescript: true,
  indexHtml: './docs-index.html',
  dest: './docs',
  hashRouter: true,
  base: `/${libName}/`,
  ordering: 'ascending',
  description: pkg.description,
};
