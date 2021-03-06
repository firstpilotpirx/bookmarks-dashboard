/* eslint-disable @typescript-eslint/naming-convention */
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'plugin:storybook/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['react', '@typescript-eslint'],
  parserOptions: {
    project: 'tsconfig.eslint.json',
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'max-len': [
      'warn',
      {
        code: 140,
      },
    ],
    'react/destructuring-assignment': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    'react/require-default-props': 'off',
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowExpressions: true,
        allowHigherOrderFunctions: true,
        allowDirectConstAssertionInArrowFunctions: true,
        allowConciseArrowFunctionExpressionsStartingWithVoid: true,
      },
    ],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'no-useless-constructor': 'warn',
    'no-empty-function': 'warn',
    '@typescript-eslint/no-explicit-any': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    'class-methods-use-this': 'off',
    'implicit-arrow-linebreak': 'off',
    '@typescript-eslint/ban-ts-comment': 'warn',
    '@typescript-eslint/indent': 'off',
    'object-curly-newline': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'default',
        format: ['camelCase', 'strictCamelCase', 'PascalCase', 'StrictPascalCase', 'snake_case', 'UPPER_CASE'],
        leadingUnderscore: 'allow',
        trailingUnderscore: 'allow',
        filter: {
          regex: '^_',
          match: false,
        },
      },
    ],
    'operator-linebreak': 'warn',
    'function-paren-newline': 'warn',
    'no-restricted-syntax': 'warn',
    'no-await-in-loop': 'warn',
    '@typescript-eslint/restrict-template-expressions': ['off'],
    'no-plusplus': 'warn',
    'prefer-regex-literals': 'warn',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'warn',
    'no-empty': [
      'error',
      {
        allowEmptyCatch: true,
      },
    ],
    'no-continue': 'off',
    'global-require': 'warn',
    'max-classes-per-file': 'warn',
    '@typescript-eslint/no-unsafe-return': 'warn',
    'no-underscore-dangle': 'off',
    '@typescript-eslint/no-floating-promises': 'warn',
    'guard-for-in': 'warn',
    'jsx-quotes': ['off'],
    'jsx-a11y/media-has-caption': ['off'],
    'react/jsx-one-expression-per-line': ['off'],
    'react/jsx-no-bind': ['off'],
    'react/jsx-filename-extension': [
      2,
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'no-undef': 'off',
    'react/function-component-definition': ['off'],
    'react/react-in-jsx-scope': ['off'],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
/* eslint-enable */
