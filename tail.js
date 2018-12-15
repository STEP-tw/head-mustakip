const fs = require("fs");
const {getHead} = require("./src/library");
const {extractArgs} = require("./src/parsingInput.js");

const main = function() {
  let args = extractArgs(process.argv);
  console.log(getHead(fs, args));
};

main();
