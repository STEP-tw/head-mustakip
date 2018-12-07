const { readFileSync, existsSync } = require('fs');
const { getHead } = require('./src/headLibrary.js');
const { extractArgs } = require('./src/parsingInput.js');

const main = function() {
  let args = extractArgs(process.argv);
  console.log(getHead(readFileSync,existsSync,args));
};

main();
