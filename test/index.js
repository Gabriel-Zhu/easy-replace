const path = require('path')
const startReplace = require('..');

const testConfig = {
  baseDir: path.resolve(__dirname, './demo'),
  exclude: [],
  include: [/\.js$/],
  replacements: [
    {
      from: 'abc',
      to: 'ABC'
    },
  ]
};

startReplace(testConfig)
