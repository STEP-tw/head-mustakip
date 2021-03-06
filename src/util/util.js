const doesIncludeNumber = function(string) {
  let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  return numbers.some(x => string.includes(x));
};

const zip = function(list1, list2) {
  let zippedList = [];
  for (index in list1) {
    zippedList[index] = list1[index].concat(list2[index]);
  }
  return zippedList;
};

module.exports = {
  doesIncludeNumber,
  zip
};
