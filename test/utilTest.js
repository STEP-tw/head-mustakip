const {deepEqual} = require("assert");
const {identity,doesIncludeNumber} = require("../src/util.js");

describe('Test for util functions', function () {
  describe('Test identity function', function () {
    it('should return me the same array as input array but with different reference', function () {
      deepEqual(identity([1,2,3,4]),[1,2,3,4]);
    });
    it('should return me empty array for empty array as input', function () {
      deepEqual(identity([]),[]);
    });
  });
  describe('Test doesIncludeNumber', function () {
    it('should return true for input string containing any numbers', function () {
      deepEqual(doesIncludeNumber("musta1"),true);
      deepEqual(doesIncludeNumber("mus4ta1"),true);
      deepEqual(doesIncludeNumber("3"),true);
    });
    it('should return false for input string not containg any numbers ', function () {
      deepEqual(doesIncludeNumber("musta"),false);
      deepEqual(doesIncludeNumber("step"),false);
      deepEqual(doesIncludeNumber("mack"),false);
    });
    it('should return false for empty input string ', function () {
      deepEqual(doesIncludeNumber(""),false);
    });
  }); 
}); 

