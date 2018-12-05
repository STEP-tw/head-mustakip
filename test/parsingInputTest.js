const {deepEqual} = require("assert");
const {getParameters,extractArgs,validateType} = require("../src/parsingInput.js");

describe('Test for parsingInput.js', function () {

  describe('Test extractArgs', function () {
    it('should return headType n and numberOfLines 10 when not provided in input', function () {
      let argsList = ["node","./head.js","file1"];
      expectedOutput = {headType : "n", files : ["file1"], numberOfLines : 10};

      deepEqual(extractArgs(argsList),expectedOutput);
    });
    it('should return headType n and numberOfLines 5 for -n5 as input', function () {
      let argsList = ["node","./head.js","-n5","file1"];
      expectedOutput = {headType : "n", files : ["file1"], numberOfLines : 5};

      deepEqual(extractArgs(argsList),expectedOutput);
    });
    it('should return headType n and numberOfLines 5 for "-n" and "5" as input', function () {
      let argsList = ["node","./head.js","-n","5","file"];
      expectedOutput = {headType : "n", files : ["file"], numberOfLines : 5};

      deepEqual(extractArgs(argsList),expectedOutput);
    });
    it('should return headType n and numberOfLines 5 for -5 as input', function () {
      let argsList = ["node","./head.js","-5","file"];
      expectedOutput = {headType : "n", files : ["file"], numberOfLines : 5};

      deepEqual(extractArgs(argsList),expectedOutput);
    });
    it('should return headType n and numberOfLines 10 when not provided in input', function () {
      let argsList = ["node","head.js","file1","file2"];
      expectedOutput = {headType : "n", files : ["file1","file2"], numberOfLines : 10};

      deepEqual(extractArgs(argsList),expectedOutput);
    });
    it('should return headType n and numberOfLines 5 for "-n" and "5" as input(multiple files)', function () {
      let argsList = ["node","head.js","-n","5","file1","file2"];
      expectedOutput = {headType : "n", files : ["file1","file2"], numberOfLines : 5};

      deepEqual(extractArgs(argsList),expectedOutput);
    });
    it('should return headType n and numberOfLines 5 for -n5 as input(multiple files)', function () {
      let argsList = ["node","head.js","-n5","file1","file2"];
      expectedOutput = {headType : "n", files : ["file1","file2"], numberOfLines : 5};

      deepEqual(extractArgs(argsList),expectedOutput);
    });
    it('should return headType n and numberOfLines 5 for -5 as input(multiple files)', function () {
      let argsList = ["node","head.js","-5","file1","file2"];
      expectedOutput = {headType : "n", files : ["file1","file2"], numberOfLines : 5};

      deepEqual(extractArgs(argsList),expectedOutput);
    });
    it('should return headType c and numberOfLines 5 for -c5 as input', function () {
      let argsList = ["node","head.js","-c5","file1",];
      expectedOutput = {headType : "c", files : ["file1"], numberOfLines : 5};

      deepEqual(extractArgs(argsList),expectedOutput);
    });
    it('should return headType c and numberOfLines 5 for "-c" and "5" as input', function () {
      let argsList = ["node","head.js","-c","5","file1"];
      expectedOutput = {headType : "c", files : ["file1"], numberOfLines : 5};

      deepEqual(extractArgs(argsList),expectedOutput);
    });
    it('should return headType c and numberOfLines 5 for -c5 as input(multiple files)', function () {
      let argsList = ["node","head.js","-c5","file1","file2"];
      expectedOutput = {headType : "c", files : ["file1","file2"], numberOfLines : 5};

      deepEqual(extractArgs(argsList),expectedOutput);
    });
    it('should return headType c and numberOfLines 5 for "-c" and "5" as input(multiple files)', function () {
      let argsList = ["node","head.js","-c","5","file1","file2"];
      expectedOutput = {headType : "c", files : ["file1","file2"], numberOfLines : 5};

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
      let argsList = ["-n10","file1.js"];
      expectedOutput = {headType : "n",numberOfLines : 10, files :["file1.js"]};
      deepEqual(getParameters(argsList),expectedOutput);
    });
  }); 
});
