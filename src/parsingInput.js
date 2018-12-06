const {identity,doesIncludeNumber} = require("./util.js");

const extractArgs = function(argsList) {
  argsList = argsList.slice(2);
  let type = "n";
  if(argsList[0].includes("-c")) {
    type = "c";
  };
  let headType = type;;
  let numberOfLines = 10;
  let files = argsList;
  if(doesIncludeNumber(argsList[0]) && argsList[0].startsWith("-")) {
    numberOfLines = argsList[0].split(type).reverse()[0];
    numberOfLines = +numberOfLines.split("-").reverse()[0];
    files = argsList.slice(1);
  }
  if(!doesIncludeNumber(argsList[0]) && argsList[0].startsWith("-")) {
    numberOfLines = argsList[1];
    files = argsList.slice(2);
  }
  return {headType,numberOfLines,files} 
}

module.exports = {extractArgs};
