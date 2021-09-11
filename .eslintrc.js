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
};
