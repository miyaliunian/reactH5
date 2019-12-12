module.exports = {
  // 为我们提供运行环境，一个环境定义了一组预定义的全局变量
  env: {
    browser: true,
    es6: true
  },
  // 一个配置文件可以被基础配置中的已启用的规则继承。
  extends: ['airbnb', 'plugin:react/recommended', 'prettier'],
  // 自定义全局变量
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  // ESLint 默认使用Espree作为其解析器，你可以在配置文件中指定一个不同的解析器
  parser: 'babel-eslint',
  // 配置解析器支持的语法
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  // ESLint 支持使用第三方插件。在使用插件之前，你必须使用 npm 安装它。
  // 在配置文件里配置插件时，可以使用 plugins 关键字来存放插件名字的列表。插件名称可以省略 eslint-plugin- 前缀。
  plugins: ['react', 'prettier'],
  rules: {
    semi: 'error',
    'no-unused-vars': [
      2,
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: true,
        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_|^err|^ev' // _xxx, err, error, ev, event
      }
    ],
    'no-useless-escape': 2,
    'no-console': 2
  }
}
