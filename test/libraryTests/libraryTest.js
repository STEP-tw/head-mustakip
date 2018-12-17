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
  describe("Test getLines function", function() {
    it("should return array of first n number of lines for given input content for head", function() {
      let inputstring = "This is first line\n";
      inputstring += "This is second line\n";
      inputstring += "This is third line\n";
      inputstring += "This is fourth line\n";
      inputstring += "This is fifth line";

      expectedOutput_1 = ["This is first line"];
      expectedOutput_2 = ["This is first line", "This is second line"];

      assert.deepEqual(getLines("head", inputstring, 1), expectedOutput_1);
      assert.deepEqual(getLines("head", inputstring, 2), expectedOutput_2);
    });
    it("should return array of last n number of lines for given input content for tail", function() {
      let inputstring = "This is first line\n";
      inputstring += "This is second line\n";
      inputstring += "This is third line\n";
      inputstring += "This is fourth line\n";
      inputstring += "This is fifth line";

      expectedOutput_1 = ["This is fifth line"];
      expectedOutput_2 = ["This is fourth line", "This is fifth line"];

      assert.deepEqual(getLines("tail", inputstring, 1), expectedOutput_1);
      assert.deepEqual(getLines("tail", inputstring, 2), expectedOutput_2);
    });
    it("should return empty array for given input count 0 for tail", function() {
      let inputstring = "This is first line\n";
      inputstring += "This is second line\n";
      inputstring += "This is third line\n";
      inputstring += "This is fourth line\n";
      inputstring += "This is fifth line";

      assert.deepEqual(getLines("tail", inputstring, 0), []);
    });
  });

  describe("Test getHead", function() {
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

    it("should return a string of two lines for one input file in args.files", function() {
      let args = {
        type: "head",
        files: ["file1"],
        count: 2,
        option: "n"
      };
      expectedOutput = "This is first line\nThis is second line";

      assert.deepEqual(getHead(fs, args), expectedOutput);
    });

    it("should return a string of two lines one of each file for two input files", function() {
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

    it("should return a count error for input as a non integer value (head)", function() {
      let inputstring = "identity";

      let args = {
        type: "head",
        files: ["file1"],
        count: "file1",
        option: "n"
      };
      expectedOutput = "head: illegal line count -- file1";

      assert.deepEqual(getHead(fs, args), expectedOutput);
    });

    it("should return a count error if the input count is -0 (head)", function() {
      let args = {
        type: "head",
        files: ["file1", "file2"],
        count: "-0",
        option: "n"
      };
      expectedOutput = "head: illegal line count -- -0";

      assert.deepEqual(getHead(fs, args), expectedOutput);
    });

    it("should return a empty string for input count 0 instead of an count error (tail)", function() {
      let args = {
        type: "tail",
        files: ["file1"],
        count: "0",
        option: "n"
      };
      expectedOutput = "";

      assert.deepEqual(getHead(fs, args), expectedOutput);
    });

    it("should return last 5 characters of 2 files for option c and count 5 (tail)", function() {
      let args = {
        type: "tail",
        files: ["file1", "file2"],
        count: "5",
        option: "c"
      };
      expectedOutput = "==> file1 <==\n line\n==> file2 <==\n line";

      assert.deepEqual(getHead(fs, args), expectedOutput);
    });

    it("should return last 5 characters of file for option c and count 5 (tail)", function() {
      let args = {
        type: "tail",
        files: ["file1"],
        count: "5",
        option: "c"
      };
      expectedOutput = " line";

      assert.deepEqual(getHead(fs, args), expectedOutput);
    });

    it("should return last line of file for count 1 (tail)", function() {
      let args = {
        type: "tail",
        files: ["file1"],
        count: "1",
        option: "n"
      };
      expectedOutput = "This is third line";

      assert.deepEqual(getHead(fs, args), expectedOutput);
    });

    it("should return last 2 lines of file for count 2 (tail)", function() {
      let args = {
        type: "tail",
        files: ["file1"],
        count: "2",
        option: "n"
      };
      expectedOutput = "This is second line\nThis is third line";

      assert.deepEqual(getHead(fs, args), expectedOutput);
    });
    it("should return a error message if the input count is not valid", function() {
      let args = {type: "head", files: [], count: "identity", option: "n"};
      expectedOutput = "head: illegal line count -- identity";

      assert.deepEqual(getHead(fs, args), expectedOutput);
    });

    it("should return a error message if the input file name is invalid", function() {
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

  describe("Test getChars function", function() {
    it("should return array of n number of characters for given input content", function() {
      inputstring = "This is first\n";
      inputstring += "This is second\n";
      inputstring += "This is third\n";
      inputstring += "This is fourth\n";
      inputstring += "This is fifth";

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
        "T",
        "h",
        "i",
        "s",
        " ",
        "i"
      ];
      expectedOutput_25 = [
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
        "T",
        "h",
        "i",
        "s",
        " ",
        "i",
        "s",
        " ",
        "s",
        "e",
        "c"
      ];

      assert.deepEqual(getChars("head", inputstring, 10), expectedOutput_10);
      assert.deepEqual(getChars("head", inputstring, 20), expectedOutput_20);
      assert.deepEqual(getChars("head", inputstring, 25), expectedOutput_25);
    });

    it("should return empty array for empty input string", function() {
      assert.deepEqual(getChars("head", "", 1), []);
      assert.deepEqual(getChars("head", "", 5), []);
    });
  });
});
