const path = require('path')
const startReplace = require('..');

const testConfig = [
  {
    baseDir: path.resolve(__dirname, './demo'),
    exclude: [],
    include: [/\.js$/],
    replacements: [
      {
        from: '我我',
        to: '你你'
      },
    ]
  },
  {
    baseDir: path.resolve(__dirname, './demo'),
    exclude: [],
    include: [/\.css$/],
    replacements: [
      {
        from: '222',
        to: '888'
      },
    ]
  },
];

startReplace(testConfig)
