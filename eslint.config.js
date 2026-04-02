const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const globals = require('globals');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/**', '**/node_modules/**', '**/.cursor/**', 'coverage/**'],
  },
  {
    files: ['eslint.config.js', 'jest.config.js', 'babel.config.js', 'metro.config.js'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    files: ['jest.setup.js', '**/*.test.ts', '**/*.test.tsx'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
  {
    rules: {
      'react/display-name': 'off',
    },
  },
]);
