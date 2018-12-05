const {deepEqual} = require("assert");
const {getHeadLines,getHeadChars,extractArgs} = require("../src/headLibrary.js");
const {getHead,callFunc} = require("../src/headLibrary.js");
const {validateType,getParameters} = require("../src/headLibrary.js");

describe('Test for headLibrary.js', function () {

  describe("Test getHeadLines function",function() {
    it("should return array of n number of lines for given input content",function() {
      let inputstring = "This is first line\n";
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

  describe('Test getHead', function () {
    it('should return array with two elements for two input files in args.files', function () {
      let inputstring_1 = "This is first line\n";
      inputstring_1 += "This is second line\n";
      inputstring_1 += "This is third line\n";

      let inputstring_2 = "This is fourth line\n";
      inputstring_2 += "This is fifth line";

      let args = { files : [inputstring_1,inputstring_2],
        numberOfLines : 2,headType : "n"};

      expectedOutput = ["This is first line\nThis is second line",
        "This is fourth line\nThis is fifth line"];

      deepEqual(getHead(args),expectedOutput);
    });
  }); 

  describe("Test getHeadChars function",function() {
    it("should return array of n number of characters for given input content",function() {
      inputstring = "This is first\n";
      inputstring += "This is second\n";
      inputstring += "This is third\n";
      inputstring += "This is fourth\n";
      inputstring += "This is fifth";

      expectedOutput_10 = ["T","h","i","s"," ","i","s"," ","f","i"];
      expectedOutput_20 = ["T","h","i","s"," ","i","s"," ","f","i",
        "r","s","t","\n","T","h","i","s"," ","i"];
      expectedOutput_25 = ["T","h","i","s"," ","i","s"," ","f",
        "i","r","s","t","\n","T","h","i","s"," ","i","s"," ","s","e","c"];

      deepEqual(getHeadChars(inputstring,10),expectedOutput_10);
      deepEqual(getHeadChars(inputstring,20),expectedOutput_20);
      deepEqual(getHeadChars(inputstring,25),expectedOutput_25);
    });
    it('should return empty array for empty input string', function () {
      deepEqual(getHeadChars("",1),[]);
      deepEqual(getHeadChars("",5),[]);
    });
  });

  describe('Test callFunc function', function () {
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


