const env = process.env.NODE_ENV;

const isTest = env === 'test'; // used for testing lib src
const isProduction = env === 'production'; // used for esm build
const isEsmBuild = process.env.MODULE === 'esm';

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
      modules: false,
    };

module.exports = {
  presets: [
    !isEsmBuild && ['@babel/preset-env', presetEnvConfig],

    !isEsmBuild && [
      '@babel/preset-react',
      { development: !isProduction, useBuiltIns: true },
    ],

    '@babel/preset-typescript',

    !isEsmBuild && '@emotion/babel-preset-css-prop',
  ].filter(Boolean),
  plugins: [
    !isEsmBuild && ['@babel/plugin-proposal-class-properties', { loose: true }],

    !isEsmBuild && [
      '@babel/plugin-proposal-object-rest-spread',
      { useBuiltIns: true },
    ],
  ].filter(Boolean),
};
