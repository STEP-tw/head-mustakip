const {readFileSync} = require("fs");
const {getHead,callFunc} = require("./src/headLibrary.js");
const {extractArgs} = require("./src/parsingInput.js");

const main = function() {
  let args= extractArgs(process.argv);
  console.log(getHead(readFileSync,args).join("\n\n"));
}

main();
  


