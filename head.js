const fs = require("fs");
const {getContent} = require("./src/library/library.js");
const {parseInput} = require("./src/library/parseInput.js");

const main = function() {
  let args = parseInput(process.argv);
  console.log(getContent(fs, args));
};

main();
