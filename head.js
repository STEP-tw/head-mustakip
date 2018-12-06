const {readFileSync} = require("fs");
const {getHead,callFunc} = require("./src/headLibrary.js");
const {extractArgs} = require("./src/parsingInput.js");

const main = function() {
  let args= extractArgs(process.argv);
  args.files = (args.files).map(file => callFunc(readFileSync,file,"UTF8"));
  console.log(getHead(args).join("\n\n"));
}

main();
  


