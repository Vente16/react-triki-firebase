module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript'
  ],
  plugins: [
    'import-glob',
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
          '.json',
          '.svg',
          '.scss',
          '.cjs'
        ],
        alias: {
          '@components': './src/components',
          '@config': './src/config',
          '@constants': './src/constants',
          '@hooks': './src/app/hooks',
          '@interfaces': './src/interfaces',
          '@screens': './src/app/screens',
          '@utils': './src/utils',
          '@assets': './src/assets',
          '@sass': './src/sass',
          '@appRedux': './src/redux'
        }
      }
    ]
  ]
};
