const { deepEqual } = require("assert");
const { extractArgs } = require("../src/parsingInput.js");

describe("Test for parsingInput.js", function() {
  describe("Test extractArgs", function() {
    it("should return option n and count 10 when not provided in input", function() {
      let argsList = ["node", "./head.js", "file1"];
      expectedOutput = { type : "head", option: "n", files: ["file1"], count: 10 };

      deepEqual(extractArgs(argsList), expectedOutput);
    });
    it("should return option n and count 5 for -n5 as input", function() {
      let argsList = ["node", "./head.js", "-n5", "file1"];
      expectedOutput = { type : "head", option: "n", files: ["file1"], count: 5 };

      deepEqual(extractArgs(argsList), expectedOutput);
    });
    it('should return option n and count 5 for "-n" and "5" as input', function() {
      let argsList = ["node", "./head.js", "-n", "5", "file"];
      expectedOutput = { type : "head", option: "n", files: ["file"], count: 5 };

      deepEqual(extractArgs(argsList), expectedOutput);
    });
    it("should return option n and count 5 for -5 as input", function() {
      let argsList = ["node", "./head.js", "-5", "file"];
      expectedOutput = { type : "head", option: "n", files: ["file"], count: 5 };

      deepEqual(extractArgs(argsList), expectedOutput);
    });
    it("should return option n and count 10 when not provided in input", function() {
      let argsList = ["node", "head.js", "file1", "file2"];
      expectedOutput = {
        type : "head",
        option: "n",
        files: ["file1", "file2"],
        count: 10
      };

      deepEqual(extractArgs(argsList), expectedOutput);
    });
    it('should return option n and count 5 for "-n" and "5" as input(multiple files)', function() {
      let argsList = ["node", "head.js", "-n", "5", "file1", "file2"];
      expectedOutput = {
        type : "head",
        option: "n",
        files: ["file1", "file2"],
        count: 5
      };

      deepEqual(extractArgs(argsList), expectedOutput);
    });
    it("should return option n and count 5 for -n5 as input(multiple files)", function() {
      let argsList = ["node", "head.js", "-n5", "file1", "file2"];
      expectedOutput = {
        type : "head",
        option: "n",
        files: ["file1", "file2"],
        count: 5
      };

      deepEqual(extractArgs(argsList), expectedOutput);
    });
    it("should return option n and count 5 for -5 as input(multiple files)", function() {
      let argsList = ["node", "head.js", "-5", "file1", "file2"];
      expectedOutput = {
        type : "head",
        option: "n",
        files: ["file1", "file2"],
        count: 5
      };

      deepEqual(extractArgs(argsList), expectedOutput);
    });
    it("should return option c and count 5 for -c5 as input", function() {
      let argsList = ["node", "head.js", "-c5", "file1"];
      expectedOutput = { type : "head", option: "c", files: ["file1"], count: 5 };

      deepEqual(extractArgs(argsList), expectedOutput);
    });
    it('should return option c and count 5 for "-c" and "5" as input', function() {
      let argsList = ["node", "head.js", "-c", "5", "file1"];
      expectedOutput = { type : "head", option: "c", files: ["file1"], count: 5 };

      deepEqual(extractArgs(argsList), expectedOutput);
    });
    it("should return option c and count 5 for -c5 as input(multiple files)", function() {
      let argsList = ["node", "head.js", "-c5", "file1", "file2"];
      expectedOutput = {
        type : "head",
        option: "c",
        files: ["file1", "file2"],
        count: 5
      };

      deepEqual(extractArgs(argsList), expectedOutput);
    });
    it('should return option c and count 5 for "-c" and "5" as input(multiple files)', function() {
      let argsList = ["node", "head.js", "-c", "5", "file1", "file2"];
      expectedOutput = {
        type : "head",
        option: "c",
        files: ["file1", "file2"],
        count: 5
      };

      deepEqual(extractArgs(argsList), expectedOutput);
    });
  });
});
