const fs = require("fs");
const {tail} = require("./src/library/library.js");
const {parseInput} = require("./src/library/parseInput.js");

const main = function() {
  let args = parseInput(process.argv.slice(2));
  console.log(tail(fs, args));
};

main();
