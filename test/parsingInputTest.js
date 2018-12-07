const { deepEqual } = require("assert");
const { extractArgs } = require("../src/parsingInput.js");

describe("Test for parsingInput.js", function() {
  describe("Test extractArgs", function() {
    it("should return headType n and numberOfLines 10 when not provided in input", function() {
      let argsList = ["node", "./head.js", "file1"];
      expectedOutput = { headType: "n", files: ["file1"], numberOfLines: 10 };

      deepEqual(extractArgs(argsList), expectedOutput);
    });
    it("should return headType n and numberOfLines 5 for -n5 as input", function() {
      let argsList = ["node", "./head.js", "-n5", "file1"];
      expectedOutput = { headType: "n", files: ["file1"], numberOfLines: 5 };

      deepEqual(extractArgs(argsList), expectedOutput);
    });
    it('should return headType n and numberOfLines 5 for "-n" and "5" as input', function() {
      let argsList = ["node", "./head.js", "-n", "5", "file"];
      expectedOutput = { headType: "n", files: ["file"], numberOfLines: 5 };

      deepEqual(extractArgs(argsList), expectedOutput);
    });
    it("should return headType n and numberOfLines 5 for -5 as input", function() {
      let argsList = ["node", "./head.js", "-5", "file"];
      expectedOutput = { headType: "n", files: ["file"], numberOfLines: 5 };

      deepEqual(extractArgs(argsList), expectedOutput);
    });
    it("should return headType n and numberOfLines 10 when not provided in input", function() {
      let argsList = ["node", "head.js", "file1", "file2"];
      expectedOutput = {
        headType: "n",
        files: ["file1", "file2"],
        numberOfLines: 10
      };

      deepEqual(extractArgs(argsList), expectedOutput);
    });
    it('should return headType n and numberOfLines 5 for "-n" and "5" as input(multiple files)', function() {
      let argsList = ["node", "head.js", "-n", "5", "file1", "file2"];
      expectedOutput = {
        headType: "n",
        files: ["file1", "file2"],
        numberOfLines: 5
      };

      deepEqual(extractArgs(argsList), expectedOutput);
    });
    it("should return headType n and numberOfLines 5 for -n5 as input(multiple files)", function() {
      let argsList = ["node", "head.js", "-n5", "file1", "file2"];
      expectedOutput = {
        headType: "n",
        files: ["file1", "file2"],
        numberOfLines: 5
      };

      deepEqual(extractArgs(argsList), expectedOutput);
    });
    it("should return headType n and numberOfLines 5 for -5 as input(multiple files)", function() {
      let argsList = ["node", "head.js", "-5", "file1", "file2"];
      expectedOutput = {
        headType: "n",
        files: ["file1", "file2"],
        numberOfLines: 5
      };

      deepEqual(extractArgs(argsList), expectedOutput);
    });
    it("should return headType c and numberOfLines 5 for -c5 as input", function() {
      let argsList = ["node", "head.js", "-c5", "file1"];
      expectedOutput = { headType: "c", files: ["file1"], numberOfLines: 5 };

      deepEqual(extractArgs(argsList), expectedOutput);
    });
    it('should return headType c and numberOfLines 5 for "-c" and "5" as input', function() {
      let argsList = ["node", "head.js", "-c", "5", "file1"];
      expectedOutput = { headType: "c", files: ["file1"], numberOfLines: 5 };

      deepEqual(extractArgs(argsList), expectedOutput);
    });
    it("should return headType c and numberOfLines 5 for -c5 as input(multiple files)", function() {
      let argsList = ["node", "head.js", "-c5", "file1", "file2"];
      expectedOutput = {
        headType: "c",
        files: ["file1", "file2"],
        numberOfLines: 5
      };

      deepEqual(extractArgs(argsList), expectedOutput);
    });
    it('should return headType c and numberOfLines 5 for "-c" and "5" as input(multiple files)', function() {
      let argsList = ["node", "head.js", "-c", "5", "file1", "file2"];
      expectedOutput = {
        headType: "c",
        files: ["file1", "file2"],
        numberOfLines: 5
      };

      deepEqual(extractArgs(argsList), expectedOutput);
    });
  });
});
