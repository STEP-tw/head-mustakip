const {deepEqual} = require("assert");
const {getHeadLines,extractArgs} = require("../src/headLibrary.js");



describe('Test for headLibrary.js', function () {
  describe('Test extractArgs', function () {
    it('should return object consisting numberOfLines and file name', function () {
      let argsList = ["node","head.js","-n5","file.js"];
      expectedOutput = {file : "file.js", numberOfLines : 5};

      deepEqual(extractArgs(argsList),expectedOutput);
    });
    it('should return object consisting numberOfLines and file name', function () {
      let argsList = ["node","head.js","-5","file.js"];
      expectedOutput = {file : "file.js", numberOfLines : 5};

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
});


