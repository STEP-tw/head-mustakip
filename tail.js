const fs = require("fs");
const {getContent} = require("./src/library/library");
const {parseInput} = require("./src/library/parseInput.js");

const main = function() {
  let args = parseInput(process.argv.slice(2));
  args.type = "tail";
  console.log(getContent(fs, args));
};

main();
