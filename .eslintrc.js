module.exports = {
  root: true,
  extends: ['universe/native'],
  rules: {
    'import/order': 0,
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/no-unused-vars': 'off',
  },
};
