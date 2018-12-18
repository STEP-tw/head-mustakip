const fs = require("fs");
const {getContent} = require("./src/library/library");
const {extractArgs} = require("./src/library/parseInput.js");

const main = function() {
  let args = extractArgs(process.argv);
  console.log(getContent(fs, args));
};

main();
