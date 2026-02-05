const { FlatCompat } = require('@eslint/eslintrc');
const typescriptParser = require('@typescript-eslint/parser');
const typescriptPlugin = require('@typescript-eslint/eslint-plugin');

// Provide a minimal recommendedConfig to satisfy FlatCompat's constructor
// (an empty object is sufficient for our usage here)
const compat = new FlatCompat({ baseDirectory: __dirname, recommendedConfig: {} });

module.exports = [
  ...compat.extends('eslint:recommended', 'plugin:@typescript-eslint/recommended', 'next'),
  {
    ignores: ['node_modules/**', '.next/**'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: { 
        ecmaVersion: 2024, 
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
    },
    rules: {
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];
