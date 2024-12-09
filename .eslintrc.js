module.exports = {
  extends: require.resolve('@umijs/lint/dist/config/eslint'),
  rules: {
    "no-unused-expressions": "off",
    "@typescript-eslint/no-unused-expressions": "off",
    "array-callback-return": "off",
    "no-param-reassign": "off",
  }
};
