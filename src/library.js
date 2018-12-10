const { getHeader, zip } = require("./util.js");

const getLines = function(type, string, count) {
  let lines = string.split("\n");
  let linesLength = lines.length;
  let operation = { 
    head : lines.slice(0, count),
    tail : lines.slice(linesLength - count, linesLength)
  };
  return operation[type];
};

const getChars = function(type, string, count) {
  let chars = string.split("");
  let charsLength = chars.length;
  let operation = { 
    head : chars.slice(0, count),
    tail : chars.slice(charsLength - count, charsLength)
  };
  return operation[type];
};

const isValidCount = function(count) {
  return count > 0 && isFinite(count);
}

const findError = function(args) {
  let { type, option, files, count } = args;
  
  let usage = {
    "head" : "usage: head [-n lines | -c bytes] [file ...]",
    "tail" : "usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]"
  }
  let countType = {
    n: "line",
    c: "byte"
  };
  let error = "none";
  let isValid = true;
  if (option != "n" && option != "c") {
    error =
      type+": illegal option -- "+option+"\n"+usage[type],    
    isValid = false;
    return { isValid, error };
  }
  if (!isValidCount(count)) {
    error =
      "head: illegal " + countType[option] + " count -- " + count;
    isValid = false;
    return { isValid, error };
  }
  return { isValid, error };
};

const getHead = function(reader, doesFileExist, args) {
  let {type, option, files, count } = args;
  fileContents = files.map(x =>
    doesFileExist(x)
      ? reader(x, "UTF8")
      : type+": " + x + ": No such file or directory"
  );
  let operation = {
    n: { func: getLines, delimiter: "\n" },
    c: { func: getChars, delimiter: "" }
  };
  let errorReport = findError(args);
  if (errorReport.isValid == false) {
    return errorReport.error;
  }
  let delimiter = operation[option].delimiter;
  let headList = fileContents.map(file =>
    operation[option].func(type, file, count).join(delimiter)
  );
  let fileHeaders = files.map(x => (doesFileExist(x) ? getHeader(x) : ""));
  delimiter = delimiter + operation.n.delimiter;
  if (headList.length > 1) {
    headList = zip(fileHeaders, headList);
  }
  return headList.join(delimiter);
};

module.exports = {
  getLines,
  getChars,
  isValidCount,
  findError,
  getHead
};
