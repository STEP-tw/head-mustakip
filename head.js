const {readFileSync} = require("fs");
const {getHeadLines,callFunc} = require("./src/headLibrary.js");
const {extractArgs} = require("./src/parsinginput.js");

const main = function() {
  let {headType,numberOfLines,files}= extractArgs(process.argv);
  let fileContents = callFunc(readFileSync,files[0],"UTF8");
  console.log(getHeadLines(fileContents,numberOfLines).join("\n"));
}

main();
  


