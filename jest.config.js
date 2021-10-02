// https://jestjs.io/docs/getting-started
// https://testing-library.com/docs/react-testing-library/setup
// https://github.com/testing-library/jest-dom
// https://testing-library.com/docs/ecosystem-user-event
// https://github.com/testing-library/eslint-plugin-testing-library
// https://github.com/testing-library/eslint-plugin-jest-dom

module.exports = {
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts'],

  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{ts,tsx}',
    '<rootDir>/src/**/*.{spec,test}.{ts,tsx}',
  ],

  setupFilesAfterEnv: ['<rootDir>/scripts/jestSetup.ts'],

  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': [
      'babel-jest',
      {configFile: './scripts/babel.jest.js'},
    ],
    '^.+\\.css$': '<rootDir>/scripts/cssTransform.js',
  },
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(ts|tsx|js|jsx|mjs|cjs)$',
    '^.+\\.module\\.css$',
  ],
  // coverageThreshold: {
  //   global: {
  //     branches: 80,
  //     functions: 80,
  //     lines: 80,
  //     statements: 80,
  //   },
  // },
};
