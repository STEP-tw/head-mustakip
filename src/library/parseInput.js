const {doesIncludeNumber} = require("../util/util.js");

const parseInput = function(argsList) {
  let option = "n";
  if (argsList[0].startsWith("-")) {
    option = argsList[0].slice(1, 2);
  }
  if (isFinite(option)) {
    option = "n";
  }
  let count = 10;
  let filePaths = argsList;
  if (doesIncludeNumber(argsList[0]) && argsList[0].startsWith("-")) {
    count = argsList[0].match(/\d+/)[0];
    filePaths = argsList.slice(1);
  }

  if (argsList[0].length > 2 && argsList[0].startsWith("-" + option)) {
    count = argsList[0].slice(2);
    filePaths = argsList.slice(1);
  }

  if (argsList[0].length === 2 && !doesIncludeNumber(argsList[0])) {
    count = argsList[1];
    filePaths = argsList.slice(2);
  }
  option = linesOrBytes(option) || option;
  return {option, count, filePaths};
};

const linesOrBytes = function(option) {
  let representation = {
    n: "line",
    c: "byte"
  };
  return representation[option];
};

module.exports = {parseInput};
