const { getHeader, zip } = require("./util.js");

const getHeadLines = function(string, numberOfLines) {
  let lines = string.split("\n");
  return lines.slice(0, numberOfLines);
};

const getHeadChars = function(string, numberOfChars) {
  let chars = string.split("");
  return chars.slice(0, numberOfChars);
};

const findError = function(args) {
  let { headType, files, numberOfLines } = args;
  let countType = {
    n: "line",
    c: "byte"
  };
  let error = "none";
  let isValid = true;
  if (numberOfLines <= 0) {
    error =
      "head: illegal " + countType[headType] + " count -- " + numberOfLines;
    isValid = false;
    return { isValid, error };
  }
  if (!isFinite(numberOfLines)) {
    error =
      "head: illegal " + countType[headType] + " count -- " + numberOfLines;
    isValid = false;
    return { isValid, error };
  }
  return { isValid, error };
};

const getHead = function(reader, args) {
  let { headType, files, numberOfLines } = args;
  fileContents = files.map(x => reader(x, "UTF8"));
  let head = {
    n: { func: getHeadLines, delimiter: "\n" },
    c: { func: getHeadChars, delimiter: "" }
  };
  let errorReport = findError(args);
  if (errorReport.isValid == false) {
    return errorReport.error;
  }
  let delimiter = head[headType].delimiter;
  let headList = fileContents.map(file =>
    head[headType].func(file, numberOfLines).join(delimiter)
  );
  let fancifiedFileNames = files.map(getHeader);
  delimiter = delimiter + head.n.delimiter;
  if (headList.length > 1) {
    headList = zip(fancifiedFileNames, headList);
  }
  return headList.join(delimiter);
};

module.exports = {
  getHeadLines,
  getHeadChars,
  getHead
};
