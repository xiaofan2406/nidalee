import ip from 'ip';
import pkg from './package.json';

export default {
  typescript: true,
  indexHtml: './docs/index.html',
  dest: './dist/docs',
  ordering: 'ascending',
  description: pkg.description,
  host: ip.address(),
  modifyBabelRc: config => {
    config.presets.push('@emotion/babel-preset-css-prop');

    return config;
  },
};
