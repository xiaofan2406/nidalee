module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 9,
    ecmaFeatures: {
      impliedStrict: true,
      jsx: true,
    },
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx', '.js', '.mjs'],
      },
    },
  },
  plugins: ['react'],
  extends: ['airbnb', 'prettier', 'prettier/react'],
  rules: {
    'no-console': 0,
    'global-require': 0,
    'no-nested-ternary': 0,
    'import/no-extraneous-dependencies': 0, // allow import devDependencies
    'import/prefer-default-export': 0,
    'jsx-a11y/label-has-for': [2, { required: { every: ['name'] } }],
    'react/jsx-filename-extension': 0, // enforce all .js extension
    'react/require-default-props': 0, // allow undefined as prop value
    'react/button-has-type': [
      2,
      {
        button: true,
        submit: true,
        reset: true,
      },
    ],
  },
};
