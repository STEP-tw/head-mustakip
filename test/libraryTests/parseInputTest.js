const assert = require("assert");
const {extractArgs} = require("../../src/library/parseInput.js");

describe("Test for parsingInput.js", function() {
  describe("extractArgs", function() {
    describe("head", function() {
      it("should return option n and count 10 when not provided in input", function() {
        let argsList = ["node", "./head.js", "file1"];
        expectedOutput = {
          type: "head",
          option: "n",
          filePaths: ["file1"],
          count: 10
        };

        assert.deepEqual(extractArgs(argsList), expectedOutput);
      });
      it("should return option n and count 5 for -n5 as input", function() {
        let argsList = ["node", "./head.js", "-n5", "file1"];
        expectedOutput = {
          type: "head",
          option: "n",
          filePaths: ["file1"],
          count: 5
        };

        assert.deepEqual(extractArgs(argsList), expectedOutput);
      });
      it('should return option n and count 5 for "-n" and "5" as input', function() {
        let argsList = ["node", "./head.js", "-n", "5", "file"];
        expectedOutput = {
          type: "head",
          option: "n",
          filePaths: ["file"],
          count: 5
        };

        assert.deepEqual(extractArgs(argsList), expectedOutput);
      });
      it("should return option n and count 5 for -5 as input", function() {
        let argsList = ["node", "./head.js", "-5", "file"];
        expectedOutput = {
          type: "head",
          option: "n",
          filePaths: ["file"],
          count: 5
        };

        assert.deepEqual(extractArgs(argsList), expectedOutput);
      });
      it("should return option n and count 10 when not provided in input", function() {
        let argsList = ["node", "head.js", "file1", "file2"];
        expectedOutput = {
          type: "head",
          option: "n",
          filePaths: ["file1", "file2"],
          count: 10
        };

        assert.deepEqual(extractArgs(argsList), expectedOutput);
      });
      it('should return option n and count 5 for "-n" and "5" as input(multiple filePaths)', function() {
        let argsList = ["node", "head.js", "-n", "5", "file1", "file2"];
        expectedOutput = {
          type: "head",
          option: "n",
          filePaths: ["file1", "file2"],
          count: 5
        };

        assert.deepEqual(extractArgs(argsList), expectedOutput);
      });
      it("should return option n and count 5 for -n5 as input(multiple filePaths)", function() {
        let argsList = ["node", "head.js", "-n5", "file1", "file2"];
        expectedOutput = {
          type: "head",
          option: "n",
          filePaths: ["file1", "file2"],
          count: 5
        };

        assert.deepEqual(extractArgs(argsList), expectedOutput);
      });
      it("should return option n and count 5 for -5 as input(multiple filePaths)", function() {
        let argsList = ["node", "head.js", "-5", "file1", "file2"];
        expectedOutput = {
          type: "head",
          option: "n",
          filePaths: ["file1", "file2"],
          count: 5
        };

        assert.deepEqual(extractArgs(argsList), expectedOutput);
      });
      it("should return option c and count 5 for -c5 as input", function() {
        let argsList = ["node", "head.js", "-c5", "file1"];
        expectedOutput = {
          type: "head",
          option: "c",
          filePaths: ["file1"],
          count: 5
        };

        assert.deepEqual(extractArgs(argsList), expectedOutput);
      });
      it('should return option c and count 5 for "-c" and "5" as input', function() {
        let argsList = ["node", "head.js", "-c", "5", "file1"];
        expectedOutput = {
          type: "head",
          option: "c",
          filePaths: ["file1"],
          count: 5
        };

        assert.deepEqual(extractArgs(argsList), expectedOutput);
      });
      it("should return option c and count 5 for -c5 as input(multiple filePaths)", function() {
        let argsList = ["node", "head.js", "-c5", "file1", "file2"];
        expectedOutput = {
          type: "head",
          option: "c",
          filePaths: ["file1", "file2"],
          count: 5
        };

        assert.deepEqual(extractArgs(argsList), expectedOutput);
      });
      it('should return option c and count 5 for "-c" and "5" as input(multiple filePaths)', function() {
        let argsList = ["node", "head.js", "-c", "5", "file1", "file2"];
        expectedOutput = {
          type: "head",
          option: "c",
          filePaths: ["file1", "file2"],
          count: 5
        };

        assert.deepEqual(extractArgs(argsList), expectedOutput);
      });
    });
    describe("tail", function() {
      it("should return option n and count 10 when not provided in input", function() {
        let argsList = ["node", "./tail.js", "file1"];
        expectedOutput = {
          type: "tail",
          option: "n",
          filePaths: ["file1"],
          count: 10
        };

        assert.deepEqual(extractArgs(argsList), expectedOutput);
      });
      it("should return option n and count 5 for -n5 as input", function() {
        let argsList = ["node", "./tail.js", "-n5", "file1"];
        expectedOutput = {
          type: "tail",
          option: "n",
          filePaths: ["file1"],
          count: 5
        };

        assert.deepEqual(extractArgs(argsList), expectedOutput);
      });
      it('should return option n and count 5 for "-n" and "5" as input', function() {
        let argsList = ["node", "./tail.js", "-n", "5", "file"];
        expectedOutput = {
          type: "tail",
          option: "n",
          filePaths: ["file"],
          count: 5
        };

        assert.deepEqual(extractArgs(argsList), expectedOutput);
      });
      it("should return option n and count 5 for -5 as input", function() {
        let argsList = ["node", "./tail.js", "-5", "file"];
        expectedOutput = {
          type: "tail",
          option: "n",
          filePaths: ["file"],
          count: 5
        };

        assert.deepEqual(extractArgs(argsList), expectedOutput);
      });
      it("should return option n and count 10 when not provided in input", function() {
        let argsList = ["node", "tail.js", "file1", "file2"];
        expectedOutput = {
          type: "tail",
          option: "n",
          filePaths: ["file1", "file2"],
          count: 10
        };

        assert.deepEqual(extractArgs(argsList), expectedOutput);
      });
      it('should return option n and count 5 for "-n" and "5" as input(multiple filePaths)', function() {
        let argsList = ["node", "tail.js", "-n", "5", "file1", "file2"];
        expectedOutput = {
          type: "tail",
          option: "n",
          filePaths: ["file1", "file2"],
          count: 5
        };

        assert.deepEqual(extractArgs(argsList), expectedOutput);
      });
      it("should return option n and count 5 for -n5 as input(multiple filePaths)", function() {
        let argsList = ["node", "tail.js", "-n5", "file1", "file2"];
        expectedOutput = {
          type: "tail",
          option: "n",
          filePaths: ["file1", "file2"],
          count: 5
        };

        assert.deepEqual(extractArgs(argsList), expectedOutput);
      });
      it("should return option n and count 5 for -5 as input(multiple filePaths)", function() {
        let argsList = ["node", "tail.js", "-5", "file1", "file2"];
        expectedOutput = {
          type: "tail",
          option: "n",
          filePaths: ["file1", "file2"],
          count: 5
        };

        assert.deepEqual(extractArgs(argsList), expectedOutput);
      });
      it("should return option c and count 5 for -c5 as input", function() {
        let argsList = ["node", "tail.js", "-c5", "file1"];
        expectedOutput = {
          type: "tail",
          option: "c",
          filePaths: ["file1"],
          count: 5
        };

        assert.deepEqual(extractArgs(argsList), expectedOutput);
      });
      it('should return option c and count 5 for "-c" and "5" as input', function() {
        let argsList = ["node", "tail.js", "-c", "5", "file1"];
        expectedOutput = {
          type: "tail",
          option: "c",
          filePaths: ["file1"],
          count: 5
        };

        assert.deepEqual(extractArgs(argsList), expectedOutput);
      });
      it("should return option c and count 5 for -c5 as input(multiple filePaths)", function() {
        let argsList = ["node", "tail.js", "-c5", "file1", "file2"];
        expectedOutput = {
          type: "tail",
          option: "c",
          filePaths: ["file1", "file2"],
          count: 5
        };

        assert.deepEqual(extractArgs(argsList), expectedOutput);
      });
      it('should return option c and count 5 for "-c" and "5" as input(multiple filePaths)', function() {
        let argsList = ["node", "tail.js", "-c", "5", "file1", "file2"];
        expectedOutput = {
          type: "tail",
          option: "c",
          filePaths: ["file1", "file2"],
          count: 5
        };

        assert.deepEqual(extractArgs(argsList), expectedOutput);
      });
    });
  });
});
