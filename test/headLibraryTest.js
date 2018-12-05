const {deepEqual} = require("assert");
const {getHeadLines,extractArgs,callFunc} = require("../src/headLibrary.js");



describe('Test for headLibrary.js', function () {
  describe('Test extractArgs', function () {
    it('should return object consisting numberOfLines and file name for head type - n', function () {
      let argsList = ["node","head.js","-n5","file.js"];
      expectedOutput = {file : "file.js", numberOfLines : 5};

      deepEqual(extractArgs(argsList),expectedOutput);
    });
    it('should return object consisting numberOfLines and file name when type is not given', function () {
      let argsList = ["node","head.js","-5","file.js"];
      expectedOutput = {file : "file.js", numberOfLines : 5};

      deepEqual(extractArgs(argsList),expectedOutput);
    });
    it('should return numberOfLines as 10 if not provided in process.argv', function () {
      let argsList = ["node","head.js","","file.js"];
      expectedOutput = {file : "file.js", numberOfLines : 10};

      deepEqual(extractArgs(argsList),expectedOutput);
    });
  }); 
  describe("Test getHeadLines function",function() {
    it("should return array of n number of lines for given input content",function() {
      inputstring = "This is first line\n";
      inputstring += "This is second line\n";
      inputstring += "This is third line\n";
      inputstring += "This is fourth line\n";
      inputstring += "This is fifth line";

      expectedOutput_1 = ["This is first line"];
      expectedOutput_2 = ["This is first line","This is second line"];

      deepEqual(getHeadLines(inputstring,1),expectedOutput_1);
      deepEqual(getHeadLines(inputstring,2),expectedOutput_2);
    });
  });
  describe('Test callFunc', function () {
    it('should return addition of two numbers when add function is provided', function () {
      const add = function(a,b) { return a+b;}
      deepEqual(callFunc(add,2,3),5);
      deepEqual(callFunc(add,10,3),13);
    });
    it('should return multiplication of two numbers when mul function is provided', function () {
      const mul = function(a,b) { return a*b;}
      deepEqual(callFunc(mul,2,3),6);
      deepEqual(callFunc(mul,10,3),30);
    });
  }); 
});


