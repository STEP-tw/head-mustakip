const {getHeader, zip} = require("../util/util.js");
const {
  generateErrorMessage,
  findError,
  isValidCount
} = require("../library/handleError.js");

const getLines = function(type, fileContent, count) {
  let lines = fileContent.split("\n");
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

const getChars = function(type, fileContent, count) {
  let chars = fileContent.split("");
  if (count == 0) {
    return [];
  }
  let operation = {
    head: chars.slice(0, count),
    tail: chars.slice(-Math.abs(count))
  };
  return operation[type];
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
