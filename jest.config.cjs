/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  roots: ['<rootDir>/tests', '<rootDir>/__mocks__', '<rootDir>/src'],
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: ['/node_modules'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '\\.(css|scss)$': '<rootDir>/__mocks__/styleMock.js',
    'i18next': '<rootDir>/__mocks__/reacti18nextMock.ts',
    '@components/(.*)': '<rootDir>/src/components/$1',
    '@mocks/(.*)': '<rootDir>/__mocks__/$1',
    '@config/(.*)': '<rootDir>/src/config/$1',
    '@constants/(.*)': '<rootDir>/src/constants/$1',
    '@hooks/(.*)': '<rootDir>/src/hooks/$1',
    '@interfaces/(.*)': '<rootDir>/src/interfaces/$1',
    '@screens/(.*)': '<rootDir>/src/screens/$1',
    '@utils/(.*)': '<rootDir>/src/utils/$1',
    '@assets/(.*)': '<rootDir>/src/assets/$1',
    '@sass/(.*)': '<rootDir>/src/sass/$1',
    '@appRedux/(.*)': '<rootDir>/src/redux/$1'
  },
  globals: {
    window: {}
  }
};