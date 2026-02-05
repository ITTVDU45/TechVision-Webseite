const { FlatCompat } = require('@eslint/eslintrc');
const typescriptParser = require('@typescript-eslint/parser');
const typescriptPlugin = require('@typescript-eslint/eslint-plugin');

// Provide a minimal recommendedConfig to satisfy FlatCompat's constructor
// (an empty object is sufficient for our usage here)
const compat = new FlatCompat({ baseDirectory: __dirname, recommendedConfig: {} });

module.exports = [
  ...compat.extends('eslint:recommended', 'plugin:@typescript-eslint/recommended', 'next'),
  {
    ignores: [
      'node_modules/**', 
      '.next/**',
      'app/components/multi-step-form/**', // Ignoriere Dateien mit Parsing-Fehlern
    ],
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
      '@typescript-eslint/no-unused-vars': ['warn', { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      }],
      '@typescript-eslint/no-empty-object-type': 'off',
      'react-hooks/exhaustive-deps': 'warn',
      'react-hooks/rules-of-hooks': 'error',
      'react/no-unescaped-entities': 'warn',
      '@next/next/no-img-element': 'warn',
      '@next/next/no-html-link-for-pages': 'warn',
      'prefer-const': 'warn',
      'react/jsx-no-undef': 'error',
    },
  },
];
