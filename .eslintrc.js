module.exports = {
  'env': {
    'browser': true,
    'es6': true
  },
  'extends': 'airbnb-base/legacy',
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly'
  },
  'parserOptions': {
    'ecmaVersion': 2018,
    'sourceType': 'module'
  },
  'rules': {
    'semi': [2, 'always'],
    //max-length дописать
    'no-unused-vars': [1],
    'linebreak-style': [
      'error',
      'unix'
    ]
  }
};
