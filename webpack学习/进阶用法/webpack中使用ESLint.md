### 使用ESLint
.eslintrc.js
>npm i eslint-plugin-import eslint-plugin-react eslint-plugin-jsx-ally -D

>npm i eslint-loader -D
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader',
          'eslint-loader',
        ]
      }
    ]
  }
}
```
>npm i eslint-config-airbnb -D
```js
module.exports = {
  "parser": "babel-eslint",
  "extends": "airbnb",
  "env": {
    "browser": true,
    "node": true,
  }
  "rules": {
    "indent": ["error", 2]
  }
}
```