const fs = require("fs");
const {getContent} = require("./src/library/library.js");
const {parseInput} = require("./src/library/parseInput.js");

const main = function() {
  let args = parseInput(process.argv.slice(2));
  args.type = "head";
  console.log(getContent(fs, args));
};

main();
