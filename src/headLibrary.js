const getHeadLines = function(string,numberOfLines) {
  let lines = string.split("\n");
  return lines.slice(0,numberOfLines);
}

const getHeadChars = function(string,numberOfChars) {
  let chars = string.split("");
  return chars.slice(0,numberOfChars);
}

const getHead = function(reader,args) {
  let {headType,files,numberOfLines} = args;
  files = files.map(x => reader(x,"UTF8"));
  let head = { "n" : {func : getHeadLines,delimiter : "\n"},
    "c" : {func : getHeadChars,delimiter : ""}};
  let delimiter = head[headType].delimiter;
  return files.map(file => head[headType].func(file,numberOfLines).join(delimiter));
}

module.exports = { 
  getHeadLines,
  getHeadChars,
  getHead
};
