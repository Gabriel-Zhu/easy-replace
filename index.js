const path = require('path');
const fs = require('fs');

const startSingleReplace = config => {
  if (!config.baseDir) {
    throw new Error('baseDir is required.');
  }

  if (!config.replacements || !config.replacements.length) {
    throw new Error('replacements is required.');
  }

  const excludeList = Array.isArray(config.exclude) ? config.exclude : [config.exclude];
  const includeList = Array.isArray(config.include) ? config.include : [config.include];

  const fileList = fs.readdirSync(config.baseDir);
  const validFileList = fileList.filter(filename => {
    const isInvalid = (
      excludeList && excludeList.find(symbol =>
        symbol instanceof RegExp ? filename.match(symbol) : filename.includes(symbol)
      )
    ) || (
      includeList && includeList.find(symbol =>
        symbol instanceof RegExp ? !filename.match(symbol) : !filename.includes(symbol)  
      )
    );

    return !isInvalid;
  });

  validFileList.forEach(filename => {
    const filePath = path.resolve(config.baseDir, filename);
    const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });
    let newFileContent = fileContent;
    config.replacements.forEach(replacement => {
      newFileContent = newFileContent.replace(new RegExp(replacement.from, 'g'), replacement.to);
    });
    fs.writeFileSync(filePath, newFileContent);
    console.log(filePath, ' 替换成功')
  });
};
const startReplace = config => {
  if (Array.isArray(config)) {
    config.forEach(startSingleReplace);
  } else if (typeof config === 'object') {
    startSingleReplace(config);
  } else {
    throw new Error('config must be object or array.');
  }
};

module.exports = startReplace;
