const { deepEqual } = require("assert");
const {
  getHeadLines,
  getHeadChars,
  findError,
  getHead
} = require("../src/headLibrary.js");

describe("Test for headLibrary.js", function() {
  describe("Test getHeadLines function", function() {
    it("should return array of n number of lines for given input content", function() {
      let inputstring = "This is first line\n";
      inputstring += "This is second line\n";
      inputstring += "This is third line\n";
      inputstring += "This is fourth line\n";
      inputstring += "This is fifth line";

      expectedOutput_1 = ["This is first line"];
      expectedOutput_2 = ["This is first line", "This is second line"];

      deepEqual(getHeadLines(inputstring, 1), expectedOutput_1);
      deepEqual(getHeadLines(inputstring, 2), expectedOutput_2);
    });
  });

  describe("Test findError function", function() {
    it("should return an object with isValid true and error none for valid input  ", function() {
      let args = {
        headType: "n",
        numberOfLines: 5,
        files: ["file1"]
      };
      let expectedOutput = {
        isValid: true,
        error: "none"
      };

      deepEqual(findError(args), expectedOutput);
    });

    it("should return an object with isValid false and error for invalid headType", function() {
      let args = {
        headType: "r",
        numberOfLines: 5,
        files: ["file1"]
      };
      let expectedOutput = {
        isValid: false,
        error:
          "head: illegal option -- r\nusage: head [-n lines | -c bytes] [file ...]"
      };

      deepEqual(findError(args), expectedOutput);
    });

    it("should return an object with isValid false and error for -5 as numberOfLines ", function() {
      let args = {
        headType: "n",
        numberOfLines: "-5",
        files: ["file1"]
      };
      let expectedOutput = {
        isValid: false,
        error: "head: illegal line count -- -5"
      };

      deepEqual(findError(args), expectedOutput);
    });

    it("should return an object with isValid false and error for file name as numberOfLines ", function() {
      let args = {
        headType: "n",
        numberOfLines: "file1",
        files: []
      };
      let expectedOutput = {
        isValid: false,
        error: "head: illegal line count -- file1"
      };

      deepEqual(findError(args), expectedOutput);
    });
  });

  describe("Test getHead", function() {
    const getSameContent = function(content) {
      return content;
    };

    const isFilePresent = function(state, fileName) {
      return state;
    };

    it("should return a string of two lines for one input file in args.files", function() {
      let inputstring_1 = "This is first line\n";
      inputstring_1 += "This is second line\n";
      inputstring_1 += "This is third line\n";
      let inputstring_2 = "identification\nrealization\nclassification";

      let args = { files: [inputstring_1], numberOfLines: 2, headType: "n" };
      expectedOutput = "This is first line\nThis is second line";

      deepEqual(
        getHead(getSameContent, isFilePresent.bind(null, true), args),
        expectedOutput
      );
    });

    it("should return a string of two lines one of each file for two input files", function() {
      let inputstring_1 = "This is first";
      let inputstring_2 = "identity";

      let args = {
        files: [inputstring_1, inputstring_2],
        numberOfLines: 1,
        headType: "n"
      };
      expectedOutput =
        "==> This is first <==\nThis is first\n\n==> identity <==\nidentity";

      deepEqual(
        getHead(getSameContent, isFilePresent.bind(null, true), args),
        expectedOutput
      );
    });

    it("should return a error message if the input count is not valid", function() {
      let inputstring_1 = "This is first";
      let inputstring_2 = "identity";

      let args = {
        files: [inputstring_1, inputstring_2],
        numberOfLines: "0",
        headType: "n"
      };
      expectedOutput = "head: illegal line count -- 0";

      deepEqual(
        getHead(getSameContent, isFilePresent.bind(null, true), args),
        expectedOutput
      );
    });

    it("should return a error message if the input count is not valid", function() {
      let inputstring_1 = "This is first";
      let inputstring_2 = "identity";

      let args = {
        files: [inputstring_1, inputstring_2],
        numberOfLines: "-0",
        headType: "n"
      };
      expectedOutput = "head: illegal line count -- -0";

      deepEqual(
        getHead(getSameContent, isFilePresent.bind(null, true), args),
        expectedOutput
      );
    });

    it("should return a error message if the input count is not valid", function() {
      let inputstring_1 = "This is first";
      let inputstring_2 = "identity";

      let args = { files: [], numberOfLines: "identity", headType: "n" };
      expectedOutput = "head: illegal line count -- identity";

      deepEqual(
        getHead(getSameContent, isFilePresent.bind(null, true), args),
        expectedOutput
      );
    });

    it("should return a error message if the input file name is invalid", function() {
      let inputstring_1 = "This is first";
      let inputstring_2 = "identity";

      let args = {
        files: ["file"],
        numberOfLines: "5",
        headType: "n"
      };
      expectedOutput = "head: file: No such file or directory";

      deepEqual(
        getHead(getSameContent, isFilePresent.bind(null, false), args),
        expectedOutput
      );
    });
  });

  describe("Test getHeadChars function", function() {
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

      deepEqual(getHeadChars(inputstring, 10), expectedOutput_10);
      deepEqual(getHeadChars(inputstring, 20), expectedOutput_20);
      deepEqual(getHeadChars(inputstring, 25), expectedOutput_25);
    });

    it("should return empty array for empty input string", function() {
      deepEqual(getHeadChars("", 1), []);
      deepEqual(getHeadChars("", 5), []);
    });
  });
});
