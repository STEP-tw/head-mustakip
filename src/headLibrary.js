const getHeadLines = function(string,numberOfLines) {
  let lines = string.split("\n");
  return lines.slice(0,numberOfLines);
}

const extractArgs = function(argsList) {
  argsList = argsList.slice(0,argsList.length);
  let file = argsList[3] || argsList[2];
  let numberOfLines = argsList[2].split("n").reverse()[0];
  numberOfLines = +numberOfLines.split("-").reverse()[0] || 10;
  return {file,numberOfLines};
}

const callFunc = function(func,argument1,argument2) {
  return func(argument1,argument2);
}

module.exports = { getHeadLines,
  extractArgs,
  callFunc
};
