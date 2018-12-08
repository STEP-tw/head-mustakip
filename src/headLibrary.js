const { getHeader, zip } = require("./util.js");

const getHeadLines = function(string, count) {
  let lines = string.split("\n");
  return lines.slice(0, count);
};

const getHeadChars = function(string, numberOfChars) {
  let chars = string.split("");
  return chars.slice(0, numberOfChars);
};

const isValidCount = function(count) {
  return count > 0 && isFinite(count);
}

const findError = function(args) {
  let { headType, files, count } = args;
  let countType = {
    n: "line",
    c: "byte"
  };
  let error = "none";
  let isValid = true;
  if (headType != "n" && headType != "c") {
    error =
      "head: illegal option -- r\nusage: head [-n lines | -c bytes] [file ...]";
    isValid = false;
    return { isValid, error };
  }
  if (!isValidCount(count)) {
    error =
      "head: illegal " + countType[headType] + " count -- " + count;
    isValid = false;
    return { isValid, error };
  }
  return { isValid, error };
};

const getHead = function(reader, doesFileExist, args) {
  let { headType, files, count } = args;
  fileContents = files.map(x =>
    doesFileExist(x)
      ? reader(x, "UTF8")
      : "head: " + x + ": No such file or directory"
  );
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
    head[headType].func(file, count).join(delimiter)
  );
  let fileHeaders = files.map(x => (doesFileExist(x) ? getHeader(x) : ""));
  delimiter = delimiter + head.n.delimiter;
  if (headList.length > 1) {
    headList = zip(fileHeaders, headList);
  }
  return headList.join(delimiter);
};

module.exports = {
  getHeadLines,
  getHeadChars,
  isValidCount,
  findError,
  getHead
};
