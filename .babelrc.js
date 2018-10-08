const env = process.env.NODE_ENV;

const isTest = env === 'test'; // used for testing lib src
const isProduction = env === 'production'; // used for rollup build

if (!isTest && !isProduction) {
  throw new Error(
    `Invalid NODE_ENV "${env}". Use only from ["test", "production"]`
  );
}

const emotionConfig = isProduction
  ? { hoist: true }
  : { sourceMap: true, autoLabel: true };

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: { node: 'current' },
        useBuiltIns: 'usage',
        modules: isTest ? 'commonjs' : false,
      },
    ],
    ['@babel/preset-react', { useBuiltIns: true }],
    '@babel/preset-typescript',
  ],
  plugins: [
    ['babel-plugin-emotion', emotionConfig],
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
  ],
};
