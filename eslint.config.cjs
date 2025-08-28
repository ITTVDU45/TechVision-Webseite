const { FlatCompat } = require('@eslint/eslintrc');

const compat = new FlatCompat({ baseDirectory: __dirname });

module.exports = [
  ...compat.extends('eslint:recommended', 'plugin:@typescript-eslint/recommended', 'next'),
  {
    ignores: ['node_modules/**', '.next/**'],
    languageOptions: {
      parser: '@typescript-eslint/parser',
      parserOptions: { ecmaVersion: 2024, sourceType: 'module' },
    },
    plugins: {
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
    },
    rules: {
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];
