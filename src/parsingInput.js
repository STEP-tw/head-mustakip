const { identity, doesIncludeNumber } = require("./util.js");

const extractArgs = function(argsList) {
  argsList = argsList.slice(2);
  let type = "n"; 
  if(argsList[0].startsWith("-")) {
    type = argsList[0].match(/-\w/)[0].substring(1,2);
  }
  if (isFinite(type)) {
    type = "n";
  }
  let option = type;
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
  return { option, count, files };
};

module.exports = { extractArgs };
