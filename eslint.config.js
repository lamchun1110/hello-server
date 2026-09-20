'use strict';

const js = require('@eslint/js');

module.exports = [
  {
    files: ['src/**/*.js', 'test/**/*.js'],
languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'commonjs',
    globals: { fetch: 'readonly' },
  },
    plugins: {
      js: js,
    },
    rules: js.configs.recommended.rules,
  },
];
