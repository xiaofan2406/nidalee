module.exports = {
  root: true,

  extends: ['free'],

  overrides: [
    {
      files: ['**/*.spec.ts?(x)'],
      plugins: ['testing-library', 'jest-dom'],
      extends: ['plugin:testing-library/react', 'plugin:jest-dom/recommended'],
    },
  ],

  settings: {
    'import/resolver': {
      alias: {
        map: [['testUtils', './scripts/testUtils']],
        extensions: ['.ts', '.js', '.jsx', '.json'],
      },
    },
  },

  rules: {
    'import/namespace': [2, {allowComputed: true}],
    'import/export': 0,
  },
};
