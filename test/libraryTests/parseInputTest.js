const assert = require("assert");
const {parseInput} = require("../../src/library/parseInput.js");

describe("parseInput", function() {
  describe("head", function() {
    it("should return option n and count 10 when not provided in input", function() {
      let argsList = ["file1"];
      expectedOutput = {
        option: "line",
        filePaths: ["file1"],
        count: 10
      };

      assert.deepEqual(parseInput(argsList), expectedOutput);
    });
    it("should return option n and count 5 for -n5 as input", function() {
      let argsList = ["-n5", "file1"];
      expectedOutput = {
        option: "line",
        filePaths: ["file1"],
        count: 5
      };

      assert.deepEqual(parseInput(argsList), expectedOutput);
    });
    it('should return option n and count 5 for "-n" and "5" as input', function() {
      let argsList = ["-n", "5", "file"];
      expectedOutput = {
        option: "line",
        filePaths: ["file"],
        count: 5
      };

      assert.deepEqual(parseInput(argsList), expectedOutput);
    });
    it("should return option n and count 5 for -5 as input", function() {
      let argsList = ["-5", "file"];
      expectedOutput = {
        option: "line",
        filePaths: ["file"],
        count: 5
      };

      assert.deepEqual(parseInput(argsList), expectedOutput);
    });
    it("should return option n and count 10 when not provided in input", function() {
      let argsList = ["file1", "file2"];
      expectedOutput = {
        option: "line",
        filePaths: ["file1", "file2"],
        count: 10
      };

      assert.deepEqual(parseInput(argsList), expectedOutput);
    });
    it('should return option n and count 5 for "-n" and "5" as input(multiple filePaths)', function() {
      let argsList = ["-n", "5", "file1", "file2"];
      expectedOutput = {
        option: "line",
        filePaths: ["file1", "file2"],
        count: 5
      };

      assert.deepEqual(parseInput(argsList), expectedOutput);
    });
    it("should return option n and count 5 for -n5 as input(multiple filePaths)", function() {
      let argsList = ["-n5", "file1", "file2"];
      expectedOutput = {
        option: "line",
        filePaths: ["file1", "file2"],
        count: 5
      };

      assert.deepEqual(parseInput(argsList), expectedOutput);
    });
    it("should return option n and count 5 for -5 as input(multiple filePaths)", function() {
      let argsList = ["-5", "file1", "file2"];
      expectedOutput = {
        option: "line",
        filePaths: ["file1", "file2"],
        count: 5
      };

      assert.deepEqual(parseInput(argsList), expectedOutput);
    });
    it("should return option c and count 5 for -c5 as input", function() {
      let argsList = ["-c5", "file1"];
      expectedOutput = {
        option: "byte",
        filePaths: ["file1"],
        count: 5
      };

      assert.deepEqual(parseInput(argsList), expectedOutput);
    });
    it('should return option c and count 5 for "-c" and "5" as input', function() {
      let argsList = ["-c", "5", "file1"];
      expectedOutput = {
        option: "byte",
        filePaths: ["file1"],
        count: 5
      };

      assert.deepEqual(parseInput(argsList), expectedOutput);
    });
    it("should return option c and count 5 for -c5 as input(multiple filePaths)", function() {
      let argsList = ["-c5", "file1", "file2"];
      expectedOutput = {
        option: "byte",
        filePaths: ["file1", "file2"],
        count: 5
      };

      assert.deepEqual(parseInput(argsList), expectedOutput);
    });
    it('should return option c and count 5 for "-c" and "5" as input(multiple filePaths)', function() {
      let argsList = ["-c", "5", "file1", "file2"];
      expectedOutput = {
        option: "byte",
        filePaths: ["file1", "file2"],
        count: 5
      };

      assert.deepEqual(parseInput(argsList), expectedOutput);
    });
  });
});
