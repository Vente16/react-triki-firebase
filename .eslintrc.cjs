module.exports = {
  extends: [
    '@wolox/eslint-config',
    '@wolox/eslint-config-react',
    '@wolox/eslint-config-typescript',
    'plugin:testing-library/react',
    'plugin:import/typescript'
  ],
  rules: {
    complexity: 'off',
    'import/order': ['error', { 'newlines-between': 'always' }],
    'no-nested-ternary': 'off',
    'no-magic-numbers': 'off',
    'new-cap': 'off',
    'react/jsx-filename-extension': [
      1,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] }
    ]
  },
  settings: {
    react: {
      version: 'detect'
    },
    'import/ignore': ['node_modules'],
    'import/resolver': {
      typescript: {},
      node: {
        paths: ['./', 'src', 'tests'],
        settings: {
          'import/resolver': {
            node: {
              paths: ['src'],
              alias: {
                map: [
                  ['@', './src/'],
                  ['@components', './src/components'],
                  ['@config', './src/config'],
                  ['@constants', './src/constants'],
                  ['@interfaces', './src/interfaces'],
                  ['@sass', './src/sass'],
                  ['@screens', './src/screens'],
                  ['@utils', './src/utils'],
                  ['@assets', './src/assets'],
                  ['@hooks', './src/hooks'],
                  ['@appRedux', './src/redux'],
                  ['@mocks', './__mocks__']
                ],
                extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
              }
            }
          }
        }
      }
    }
  }
};
