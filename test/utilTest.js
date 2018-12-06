const {deepEqual} = require("assert");
const {identity,doesIncludeNumber,} = require("../src/util.js");
const {getFancifiedText,zip} = require("../src/util.js");

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
    describe('Test getFancifiedText function', function () {
      it('should return text in fancified form like ==> text <== for input text', function () {
        deepEqual(getFancifiedText("file"),"==> file <==");
        deepEqual(getFancifiedText("STEP"),"==> STEP <==");
      });
      it('should return string of numbers in fancified form for input string of numbers', function () {
        deepEqual(getFancifiedText("1"),"==> 1 <==");
        deepEqual(getFancifiedText("456"),"==> 456 <==");
      });
      it('should return fancified form even if empty input string is provided', function () {
        deepEqual(getFancifiedText(""),"==>  <==");
      });
    });
    describe('Test zip function', function () {
      it('should return an array for two input arrays with their respective elements concated', function () {
        let list1 = ["cake","mango"];
        let list2 = [["chocolate cake","pineapple cake"],["raw mango","ripen mango"]];
        let expectedOutput = [["cake","chocolate cake","pineapple cake"],
          ["mango","raw mango","ripen mango"]];
        deepEqual(zip(list1,list2),expectedOutput);
      }); 
    });
  }); 
}); 
