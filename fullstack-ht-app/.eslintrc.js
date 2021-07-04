module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'no-console': 'off',
    'default-case': 'off',
    'no-use-before-define': 'off',
    'no-unused-expressions': 'off',
    'no-lone-blocks': 'off',
    'no-underscore-dangle': 'off',
    'no-shadow': 'off',
    'no-plusplus': 'off',
    'no-sequences': 'off',
    'react/prop-types': 0,
    'react/jsx-props-no-spreading': 0,
    'react/jsx-curly-brace-presence': 0,
    'arrow-body-style': 'off',
    'implicit-arrow-linebreak': 0,
    'max-len': 300,
  },
};
