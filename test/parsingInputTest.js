const deepEqual = require("assert");
const {getParameters,extractArgs,validateType} = require("../src/parsingInput.js");

describe('Test for parsingInput.js', function () {

  describe('Test extractArgs', function () {
    it('should return object consisting numberOfLines and file name for head type - n', function () {
      let argsList = ["node","head.js","-n5","file.js"];
      expectedOutput = {headType : "n", files : ["file.js"], numberOfLines : 5};

      deepEqual(extractArgs(argsList),expectedOutput);
    });
    it('should return object consisting numberOfLines and file name when type is not given', function () {
      let argsList = ["node","head.js","-5","file.js"];
      expectedOutput = {headType : "n", files : ["file.js"], numberOfLines : 5};

      deepEqual(extractArgs(argsList),expectedOutput);
    });
    it('should return numberOfLines as 10 if not provided in process.argv', function () {
      let argsList = ["node","head.js","file.js"];
      expectedOutput = {headType : "n", files : ["file.js"], numberOfLines : 10};

      deepEqual(extractArgs(argsList),expectedOutput);
    });
  }); 

  describe('Test validateType function', function () {
    it('it should return type and number of lines as 10 default when not provided', function () {
      let argsList = ["file.js"];
      let expectedOutput = ["-n10","file.js"];
      deepEqual(validateType(argsList),expectedOutput);
    });
    it('it should return type -n as first element when number of lines is provided', function () {
      let argsList = ["-5","file1.js"];
      let expectedOutput = ["-n","-5","file1.js"];
      deepEqual(validateType(argsList),expectedOutput);
    });
  }); 

  describe('Test getParameters', function () {
    it('should return headType,numberOfLines and files array in object(single file,-n-5)', function () {
      let argsList = ["-n-5","file1.js"];
      expectedOutput = {headType : "n",numberOfLines : 5, files :["file1.js"]};
      deepEqual(getParameters(argsList),expectedOutput);
    });
    it('should return headType,numberOfLines and files array in object(multiple files)', function () {
      let argsList = ["-n-5","file1.js","file2.js"];
      expectedOutput = {headType : "n",numberOfLines : 5, files :["file1.js","file2.js"]};
      deepEqual(getParameters(argsList),expectedOutput);
    });
    it('should return headType,numberOfLines and files array in object(multiple files,-n5)', function () {
      let argsList = ["-n5","file1.js","file2.js"];
      expectedOutput = {headType : "n",numberOfLines : 5, files :["file1.js","file2.js"]};
      deepEqual(getParameters(argsList),expectedOutput);
    });
  }); 
});
