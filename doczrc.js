import pkg from './package.json';

export default {
  typescript: true,
  indexHtml: './docs/index.html',
  dest: './dist/docs',
  ordering: 'ascending',
  description: pkg.description,
  host: '192.168.1.67',
  hotHost: '192.168.1.67',
  modifyBabelRc: config => {
    config.presets.push([
      '@emotion/babel-preset-css-prop',
      {
        autoLabel: true,
        labelFormat: '[local]',
      },
    ]);
    return config;
  },
};
