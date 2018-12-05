const getHeadLines = function(string,numberOfLines) {
  let lines = string.split("\n");
  return lines.slice(0,numberOfLines);
}

const callFunc = function(func,argument1,argument2) {
  return func(argument1,argument2);
}

module.exports = { 
  getHeadLines,
  callFunc
};
