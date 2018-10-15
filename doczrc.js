import pkg from './package.json';

export default {
  typescript: true,
  indexHtml: './docs/index.html',
  dest: './dist/docs',
  ordering: 'ascending',
  description: pkg.description,
};
