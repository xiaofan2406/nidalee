module.exports = {
  collectCoverageFrom: ['<rootDir>/src/**/*.spec.{ts,tsx,js,mjs}'],
  setupFilesAfterEnv: [
    'react-testing-library/cleanup-after-each',
    'jest-dom/extend-expect',
  ],
  testMatch: ['<rootDir>/src/**/*.spec.{ts,tsx,js,mjs}'],
  testEnvironment: 'jsdom',
  testURL: 'http://localhost',
  transform: {
    '^.+\\.(ts|tsx|js|mjs)$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'mjs', 'json'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
