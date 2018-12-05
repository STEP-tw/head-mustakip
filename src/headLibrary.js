const getHeadLines = function(string,numberOfLines) {
  let lines = string.split("\n");
  return lines.slice(0,numberOfLines);
}

const getHeadChars = function(string,numberOfChars) {
  let chars = string.split("");
  return chars.slice(0,numberOfChars);
}

const getHead = function(args) {
  let {headType,files,numberOfLines} = args;
  let head = { "n" : {func : getHeadLines,delimiter : "\n"},
    "c" : {func : getHeadChars,delimiter : ""}};
  let delimiter = head[headType].delimiter;
  return files.map(file => head[headType].func(file,numberOfLines).join(delimiter));
}


const callFunc = function(func,argument1,argument2) {
  return func(argument1,argument2);
}

module.exports = { 
  getHeadLines,
  getHeadChars,
  getHead,
  callFunc
};
