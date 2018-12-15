const {getHeader, zip} = require("../util/util.js");

const getLines = function(type, string, count) {
  let lines = string.split("\n");
  let linesLength = lines.length;
  if (count > linesLength) {
    count = linesLength;
  }
  let operation = {
    head: lines.slice(0, count),
    tail: lines.slice(linesLength - count, linesLength)
  };
  return operation[type];
};

const getChars = function(type, string, count) {
  let chars = string.split("");
  let charsLength = chars.length;
  if (count > charsLength) {
    count = charsLength;
  }
  let operation = {
    head: chars.slice(0, count),
    tail: chars.slice(charsLength - count, charsLength)
  };
  return operation[type];
};

const isValidCount = function(count) {
  return count > 0 && isFinite(count);
};

const findError = function(args) {
  let {type, option, count} = args;
  let error = "none";
  let isValid = true;
  let errorType;
  if (option != "n" && option != "c") {
    errorType = "illegalOption";
    return generateErrorMessage(errorType, args);
  }
  if (!isValidCount(count) && type === "head") {
    errorType = "illegalCount";
    return generateErrorMessage(errorType, args);
  }
  if (!isFinite(count)) {
    errorType = "illegalOffset";
    return generateErrorMessage(errorType, args);
  }
  return {isValid, error};
};

const generateErrorMessage = function(errorType, args) {
  let {type, option, count} = args;
  let countType = {
    n: "line",
    c: "byte"
  };
  let usage = {
    head: "usage: head [-n lines | -c bytes] [file ...]",
    tail: "usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]"
  };
  let errors = {
    illegalCount:
      type + ": illegal " + countType[option] + " count -- " + count,
    illegalOffset: type + ": illegal offset -- " + count,
    illegalOption: type + ": illegal option -- " + option + "\n" + usage[type]
  };
  let error = errors[errorType];
  let isValid = false;
  return {isValid, error};
};

const getHead = function(fs, args) {
  let {readFileSync, existsSync} = fs;
  let {type, option, files, count} = args;
  fileContents = files.map(x =>
    existsSync(x)
      ? readFileSync(x, "UTF8")
      : type + ": " + x + ": No such file or directory"
  );
  let operation = {
    n: {func: getLines, delimiter: "\n"},
    c: {func: getChars, delimiter: ""}
  };
  let errorReport = findError(args);
  if (errorReport.isValid == false) {
    return errorReport.error;
  }
  let delimiter = operation[option].delimiter;
  let headList = fileContents.map(file =>
    operation[option].func(type, file, count).join(delimiter)
  );
  let fileHeaders = files.map(x => (existsSync(x) ? getHeader(x) : ""));
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
  generateErrorMessage,
  findError,
  getHead
};
