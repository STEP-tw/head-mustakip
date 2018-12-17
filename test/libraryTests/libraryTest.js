const assert = require("assert");
const {
  getLines,
  isValidCount,
  getChars,
  generateErrorMessage,
  findError,
  getHead
} = require("../../src/library/library.js");

describe("Test for library.js", function() {
  describe("getLines", function() {
    it("should return array of first n number of lines when count is n", function() {
      let fileContent = "This is first line\n";
      fileContent += "This is second line\n";
      fileContent += "This is third line\n";
      fileContent += "This is fourth line\n";
      fileContent += "This is fifth line";

      expectedOutput_1 = ["This is first line"];
      expectedOutput_2 = ["This is first line", "This is second line"];

      assert.deepEqual(getLines("head", fileContent, 1), expectedOutput_1);
      assert.deepEqual(getLines("head", fileContent, 2), expectedOutput_2);
    });
    it("should return array of last n number of lines when count is n", function() {
      let fileContent = "This is first line\n";
      fileContent += "This is second line\n";
      fileContent += "This is third line\n";
      fileContent += "This is fourth line\n";
      fileContent += "This is fifth line";

      expectedOutput_1 = ["This is fifth line"];
      expectedOutput_2 = ["This is fourth line", "This is fifth line"];

      assert.deepEqual(getLines("tail", fileContent, 1), expectedOutput_1);
      assert.deepEqual(getLines("tail", fileContent, 2), expectedOutput_2);
    });
    it("should return empty array when input count is 0", function() {
      let fileContent = "This is first line\n";
      fileContent += "This is second line\n";
      fileContent += "This is third line\n";
      fileContent += "This is fourth line\n";
      fileContent += "This is fifth line";

      assert.deepEqual(getLines("tail", fileContent, 0), []);
    });
  });

  describe("getHead", function() {
    const readFileSync = function(fileName) {
      let file1 = "This is first line\n";
      file1 += "This is second line\n";
      file1 += "This is third line";

      let file2 = "This is fourth line\n";
      file2 += "This is fifth line\n";
      file2 += "This is sixth line";

      let contents = {file1, file2};
      return contents[fileName];
    };

    const existsSync = function(name) {
      if (name == "absentFile") {
        return false;
      }
      return true;
    };

    let fs = {readFileSync, existsSync};

    it("should return 2 lines for count 2 when one file is provided", function() {
      let args = {
        type: "head",
        files: ["file1"],
        count: 2,
        option: "n"
      };
      expectedOutput = "This is first line\nThis is second line";

      assert.deepEqual(getHead(fs, args), expectedOutput);
    });

    it("should return 1 line per file for count 1 when 2 input files are provided", function() {
      let args = {
        type: "head",
        files: ["file1", "file2"],
        count: 1,
        option: "n"
      };
      expectedOutput =
        "==> file1 <==\nThis is first line\n\n==> file2 <==\nThis is fourth line";

      assert.deepEqual(getHead(fs, args), expectedOutput);
    });

    it("should return a count error when count is a non integer value (head)", function() {
      let fileContent = "identity";

      let args = {
        type: "head",
        files: ["file1"],
        count: "file1",
        option: "n"
      };
      expectedOutput = "head: illegal line count -- file1";

      assert.deepEqual(getHead(fs, args), expectedOutput);
    });

    it("should return a count error when input count is -0 (head)", function() {
      let args = {
        type: "head",
        files: ["file1", "file2"],
        count: "-0",
        option: "n"
      };
      expectedOutput = "head: illegal line count -- -0";

      assert.deepEqual(getHead(fs, args), expectedOutput);
    });

    it("should return a empty string for input count 0 (tail)", function() {
      let args = {
        type: "tail",
        files: ["file1"],
        count: "0",
        option: "n"
      };
      expectedOutput = "";

      assert.deepEqual(getHead(fs, args), expectedOutput);
    });

    it("should return last 5 chars of 2 files when option c and count 5 (tail)", function() {
      let args = {
        type: "tail",
        files: ["file1", "file2"],
        count: "5",
        option: "c"
      };
      expectedOutput = "==> file1 <==\n line\n==> file2 <==\n line";

      assert.deepEqual(getHead(fs, args), expectedOutput);
    });

    it("should return last 5 chars of file for option c and count 5 (tail)", function() {
      let args = {
        type: "tail",
        files: ["file1"],
        count: "5",
        option: "c"
      };
      expectedOutput = " line";

      assert.deepEqual(getHead(fs, args), expectedOutput);
    });

    it("should return last line of file when count is 1 (tail)", function() {
      let args = {
        type: "tail",
        files: ["file1"],
        count: "1",
        option: "n"
      };
      expectedOutput = "This is third line";

      assert.deepEqual(getHead(fs, args), expectedOutput);
    });

    it("should return last 2 lines of file when count is 2 (tail)", function() {
      let args = {
        type: "tail",
        files: ["file1"],
        count: "2",
        option: "n"
      };
      expectedOutput = "This is second line\nThis is third line";

      assert.deepEqual(getHead(fs, args), expectedOutput);
    });
    it("should return an count error when input count is not a number", function() {
      let args = {type: "head", files: [], count: "identity", option: "n"};
      expectedOutput = "head: illegal line count -- identity";

      assert.deepEqual(getHead(fs, args), expectedOutput);
    });

    it("should return absentFile error if the input file name is invalid", function() {
      let args = {
        type: "head",
        files: ["absentFile"],
        count: "5",
        option: "n"
      };
      expectedOutput = "head: absentFile: No such file or directory";

      assert.deepEqual(getHead(fs, args), expectedOutput);
    });
  });

  describe("getChars", function() {
    it("should return array of n number of characters when input count is n", function() {
      fileContent = "This is first\n";
      fileContent += "This is second\n";
      fileContent += "This is third\n";
      fileContent += "This is fourth\n";
      fileContent += "This is fifth";

      expectedOutput_10 = ["T", "h", "i", "s", " ", "i", "s", " ", "f", "i"];
      expectedOutput_20 = [
        "T",
        "h",
        "i",
        "s",
        " ",
        "i",
        "s",
        " ",
        "f",
        "i",
        "r",
        "s",
        "t",
        "\n",
        "T"
      ];

      assert.deepEqual(getChars("head", fileContent, 10), expectedOutput_10);
      assert.deepEqual(getChars("head", fileContent, 15), expectedOutput_20);
    });

    it("should return empty array for empty input string", function() {
      assert.deepEqual(getChars("head", "", 1), []);
      assert.deepEqual(getChars("head", "", 5), []);
    });
  });
});
