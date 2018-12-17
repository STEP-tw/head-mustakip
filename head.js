const fs = require("fs");
const {getHead} = require("./src/library/library.js");
const {extractArgs} = require("./src/library/parseInput.js");

const main = function() {
  let args = extractArgs(process.argv);
  console.log(getHead(fs, args));
};

main();
