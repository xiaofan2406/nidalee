import ip from 'ip';
import pkg from './package.json';

const host = ip.address();

export default {
  typescript: true,
  indexHtml: './docs/index.html',
  dest: './dist/docs',
  ordering: 'ascending',
  description: pkg.description,
  host,
  websocketHost: host,
  modifyBabelRc: config => {
    config.presets.push('@emotion/babel-preset-css-prop');

    return config;
  },
};
