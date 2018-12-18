const {getHeader, zip} = require("../util/util.js");
const {
  generateErrorMessage,
  findError,
  isValidCount
} = require("../library/handleError.js");

const getLines = function(option, type, fileContent, count) {
  let delimiter = {
    n: "\n",
    c: ""
  };

  let lines = fileContent.split(delimiter[option]);
  if (count == 0) {
    return [];
  }
  let operation = {
    head: lines.slice(0, count),
    tail: lines.slice(-Math.abs(count))
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

const read = function(fs, type, filePath) {
  let {readFileSync, existsSync} = fs;
  if (existsSync(filePath)) {
    return readFileSync(filePath, "UTF8");
  }
  return type + ": " + filePath + ": No such file or directory";
};

const applyHeader = function(fs, filePath) {
  let {existsSync} = fs;
  if (existsSync(filePath)) {
    return getHeader(filePath);
  }
  return "";
};

const getContent = function(fs, args) {
  let {type, option, filePaths, count} = args;
  let {existsSync} = fs;
  fileContents = filePaths.map(read.bind(null, fs, type));
  let operation = {
    n: {func: getLines, delimiter: "\n"},
    c: {func: getChars, delimiter: ""}
  };
  let errorReport = findError(args);
  if (!errorReport.isValid) {
    return errorReport.error;
  }
  let delimiter = operation[option].delimiter;
  let headList = fileContents.map(file =>
    getLines(option, type, file, count).join(delimiter)
  );
  let fileHeaders = filePaths.map(applyHeader.bind(null, fs));
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
  getContent
};
