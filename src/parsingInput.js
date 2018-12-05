const {identity,doesIncludeNumber} = require("./util.js");

const validateType = function(list) {
  if(doesIncludeNumber(list[0]) && list[0].startsWith("-")) {
    list.splice(0,0,"-n");
  }
  if(!list[0].startsWith("-")) {
    list.splice(0,0,"-n10");
  }
  return list;
}

const getParameters = function(list) {
  let type = "n";
  if(list[0].includes("c")) {
    type = "c";
  };
  let headType = type;;
  let numberOfLines = list[0].split(type).reverse()[0];
  numberOfLines = +numberOfLines.split("-").reverse()[0];
  let files = list.slice(1,list.length);
  return {headType,numberOfLines,files}
}

const extractArgs = function(argsList) {
  let list = identity(argsList).slice(2,argsList.length);
  list = validateType(list);
  if(!doesIncludeNumber(list[0])) {
    list[0] = list[0]+list[1];
    list.splice(1,1);
    return getParameters(list);
  }
  return getParameters(list);
}
module.exports = { 
  extractArgs,
  getParameters,
  validateType
};
