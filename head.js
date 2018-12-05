const {readFileSync} = require("fs");
const {getHeadLines,extractArgs,callFunc} = require("./src/headLibrary.js");

const main = function() {
  let {file,numberOfLines} = extractArgs(process.argv);
  let fileContents = callFunc(readFileSync,file,"UTF8");
  console.log(getHeadLines(fileContents,numberOfLines).join("\n"));
}

main();
  


