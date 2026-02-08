/** @type {import('jest').Config} */
const config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/app'],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  collectCoverageFrom: [
    'app/lib/patterns/**/*.ts',
    '!app/lib/patterns/**/*.test.ts',
  ],
  coverageDirectory: 'coverage',
  verbose: true,
};

module.exports = config;
