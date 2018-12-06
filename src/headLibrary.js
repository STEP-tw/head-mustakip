const {getFancifiedText,zip} = require("./util.js");

const getHeadLines = function(string,numberOfLines) {
  let lines = string.split("\n");
  return lines.slice(0,numberOfLines);
}

const getHeadChars = function(string,numberOfChars) {
  let chars = string.split("");
  return chars.slice(0,numberOfChars);
}

const getHead = function(reader,args) {
  let {headType,files,numberOfLines} = args;
  fileContents = files.map(x => reader(x,"UTF8"));
  let head = { "n" : {func : getHeadLines,delimiter : "\n"},
    "c" : {func : getHeadChars,delimiter : ""}};
  let delimiter = head[headType].delimiter;
  let headList = fileContents.map(file => head[headType].func(file,numberOfLines).join(delimiter));
  let fancifiedFileNames = files.map(x => getFancifiedText(x));
  if(headList.length > 1) {
    headList = zip(fancifiedFileNames,headList);
  }
  return headList;
}

module.exports = { 
  getHeadLines,
  getHeadChars,
  getHead
};
