const { identity, doesIncludeNumber } = require("./util.js");

const extractArgs = function(argsList) {
  let length = argsList[1].length;
  let type = argsList[1].slice(length-7, length-3);
  argsList = argsList.slice(2);
  let option = "n"; 
  if(argsList[0].startsWith("-")) {
    option = argsList[0].match(/-\w/)[0].substring(1,2);
  }
  if (isFinite(option)) {
    option = "n";
  }
  let count = 10;
  let files = argsList;
  if (doesIncludeNumber(argsList[0]) && argsList[0].startsWith("-")) {
    count = argsList[0].match(/\d+/)[0];
    files = argsList.slice(1);
  }

  if (
    doesIncludeNumber(argsList[0]) &&
    argsList[0].startsWith("-" + option)
  ) {
    count = argsList[0].match(/-*\d+\w*/)[0];
    files = argsList.slice(1);
  }

  if (!doesIncludeNumber(argsList[0]) && argsList[0].startsWith("-")) {
    count = argsList[0].substring(2);
    if (count == "") {
      count = argsList[1];
    }
    files = argsList.slice(2);
  }
  return {type, option, count, files };
};

module.exports = { extractArgs };
