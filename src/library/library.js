const {getHeader, zip} = require("../util/util.js");
const {
  generateErrorMessage,
  findError,
  isValidCount
} = require("../library/handleError.js");

const delimiters = {
  n: "\n",
  c: ""
};
const getHead = function(fileContent, option, count) {
  let delimiter = delimiters[option];
  return sliceContent(delimiter, "head", fileContent, count);
};

const getTail = function(fileContent, option, count) {
  let delimiter = delimiters[option];
  return sliceContent(delimiter, "tail", fileContent, count);
};

const sliceContent = function(delimiter, type, fileContent, count) {
  let data = fileContent.split(delimiter);
  if (count == 0) {
    return [];
  }
  let operation = {
    head: data.slice(0, count),
    tail: data.slice(-Math.abs(count))
  };
  return operation[type];
};

const read = function(fs, type, filePath) {
  let {readFileSync, existsSync} = fs;
  if (existsSync(filePath)) {
    let fileContent = readFileSync(filePath, "UTF8");
    return {fileContent, error: ""};
  }
  let error = type + ": " + filePath + ": No such file or directory";
  return {fileContent: "", error};
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
  fileContents = filePaths
    .map(read.bind(null, fs, type))
    .map(x => x.fileContent || x.error);

  let operations = {
    head: getHead,
    tail: getTail
  };
  let errorReport = findError(args);
  if (!errorReport.isValid) {
    return errorReport.error;
  }
  let delimiter = delimiters[option];
  let headList = fileContents.map(fileContent =>
    operations[type](fileContent, option, count).join(delimiter)
  );
  let fileHeaders = filePaths.map(applyHeader.bind(null, fs));
  delimiter = delimiter + delimiters["n"];
  if (headList.length > 1) {
    headList = zip(fileHeaders, headList);
  }
  return headList.join(delimiter);
};

module.exports = {
  sliceContent,
  getHead,
  getTail,
  isValidCount,
  generateErrorMessage,
  findError,
  applyHeader,
  read,
  getContent
};
