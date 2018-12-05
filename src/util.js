const identity = function(list) {
  return list.map(x => x);
}

const doesIncludeNumber = function(string) {
  let numbers = [1,2,3,4,5,6,7,8,9,0];
  return numbers.some(x => string.includes(x));
}

module.exports = { 
  identity,
  doesIncludeNumber
};
