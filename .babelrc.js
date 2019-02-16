const env = process.env.NODE_ENV;

const isTest = env === 'test'; // used for testing lib src
const isProduction = env === 'production'; // used for rollup build
const cjs = process.env.MODULE === 'cjs';

if (!isTest && !isProduction) {
  throw new Error(
    `Invalid NODE_ENV "${env}". Use only from ["test", "production"]`
  );
}

const presetEnvConfig = isTest
  ? {
      targets: { node: 'current' },
    }
  : {
      useBuiltIns: 'usage',
      modules: cjs ? 'commonjs' : false,
    };

module.exports = {
  presets: [
    ['@babel/preset-env', presetEnvConfig],

    ['@babel/preset-react', { development: !isProduction, useBuiltIns: true }],

    '@babel/preset-typescript',

    [
      '@emotion/babel-preset-css-prop',
      { autoLabel: true, labelFormat: '[local]' },
    ],
  ],
  plugins: [
    '@babel/plugin-transform-destructuring',

    ['@babel/plugin-proposal-class-properties', { loose: true }],

    ['@babel/plugin-proposal-object-rest-spread', { useBuiltIns: true }],
  ],
};
