const { FlatCompat } = require('@eslint/eslintrc');

// Provide a minimal recommendedConfig to satisfy FlatCompat's constructor
// (an empty object is sufficient for our usage here)
const compat = new FlatCompat({ baseDirectory: __dirname, recommendedConfig: {} });

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
