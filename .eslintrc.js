module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'vue',
  ],
  rules: {
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [['~', './']],
        extensions: ['.ts', '.js', '.tsx', '.vue'],
      },
    },
  },
};
