module.exports = {
  extends: ['eslint:recommended', 'plugin:react/recommended', 'google'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    jsx: true
  },
  env: {
    node: true
  },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect'
    }
  },
  rules: {
    'comma-dangle': 'off',
    'max-len': ['error', { code: 120 }],
    'new-cap': 'off',
    'no-console': 'off',
    'no-unused-vars': 'off',
    'no-undef': 'off',
    'require-jsdoc': 'off',
    'valid-jsdoc': 'off',
    'react/prop-types': 0,
    'react/no-deprecated': 'off',
    'no-useless-catch': 'off',
    indent: ['error', 2]
  }
};