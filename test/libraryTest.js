const { deepEqual } = require("assert");
const {
  getLines,
  isValidCount,
  getChars,
  generateErrorMessage,
  findError,
  getHead
} = require("../src/library.js");

describe("Test for library.js", function() {
  describe('Test isValidCount function', function () {
    it('should return true for input count as a nonzero positive integer', function () {
      deepEqual(isValidCount(9),true);
      deepEqual(isValidCount(1),true);
      deepEqual(isValidCount(12),true);
    });
    it('should return false for input count zero or negative integer', function () {
      deepEqual(isValidCount(-4),false);
      deepEqual(isValidCount(0),false);
      deepEqual(isValidCount(-1),false);
    });
    it('should return false for input count as any words string', function () {
      deepEqual(isValidCount("obvious"),false);
      deepEqual(isValidCount("iAm1"),false);
      deepEqual(isValidCount("m"),false);
    });
  }); 
  describe("Test getLines function", function() {
    it("should return array of first n number of lines for given input content for head", function() {
      let inputstring = "This is first line\n";
      inputstring += "This is second line\n";
      inputstring += "This is third line\n";
      inputstring += "This is fourth line\n";
      inputstring += "This is fifth line";

      expectedOutput_1 = ["This is first line"];
      expectedOutput_2 = ["This is first line", "This is second line"];

      deepEqual(getLines("head", inputstring, 1), expectedOutput_1);
      deepEqual(getLines("head", inputstring, 2), expectedOutput_2);
    });
     it("should return array of last n number of lines for given input content for tail", function() {
      let inputstring = "This is first line\n";
      inputstring += "This is second line\n";
      inputstring += "This is third line\n";
      inputstring += "This is fourth line\n";
      inputstring += "This is fifth line";

      expectedOutput_1 = ["This is fifth line"];
      expectedOutput_2 = ["This is fourth line", "This is fifth line"];

      deepEqual(getLines("tail", inputstring, 1), expectedOutput_1);
      deepEqual(getLines("tail", inputstring, 2), expectedOutput_2);
    });
    it("should return empty array for given input count 0 for tail", function() {
      let inputstring = "This is first line\n";
      inputstring += "This is second line\n";
      inputstring += "This is third line\n";
      inputstring += "This is fourth line\n";
      inputstring += "This is fifth line";

      deepEqual(getLines("tail", inputstring, 0), []);
    });
  });

  describe("Test findError function", function() {
    it("should return an object with isValid true and error none for valid input  ", function() {
      let args = {
        option: "n",
        count: 5,
        files: ["file1"]
      };
      let expectedOutput = {
        isValid: true,
        error: "none"
      };

      deepEqual(findError(args), expectedOutput);
    });

    it("should return an object with isValid false and error for invalid option", function() {
      let args = {
        type : "tail",
        option: "r",
        count: 5,
        files: ["file1"]
      };
      let expectedOutput = {
        isValid: false,
        error:
          "tail: illegal option -- r\nusage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]"
      };

      deepEqual(findError(args), expectedOutput);
    });

    it("should return an object with isValid false and error for -5 as count ", function() {
      let args = {
        type : "head",
        option: "n",
        count: "-5",
        files: ["file1"]
      };
      let expectedOutput = {
        isValid: false,
        error: "head: illegal line count -- -5"
      };

      deepEqual(findError(args), expectedOutput);
    });

    it("should return an object with isValid false and error for file name as count ", function() {
      let args = {
        type : "head",
        option: "n",
        count: "file1",
        files: []
      };
      let expectedOutput = {
        isValid: false,
        error: "head: illegal line count -- file1"
      };

      deepEqual(findError(args), expectedOutput);
    });

    it("should return an object with isValid false and error for file name as count ", function() {
      let args = {
        type : "tail",
        option: "n",
        count: "file1",
        files: []
      };
      let expectedOutput = {
        isValid: false,
        error: "tail: illegal offset -- file1"
      };

      deepEqual(findError(args), expectedOutput);
    });
  });
  describe("Test generateErrorMessage", function() {
    it("should return an object with isValid false and illegal count error for file name",function() {
      let args = {
        type : "tail",
        option: "n",
        count: "file1",
        files: []
      };
      let error  = "illegalOffset";
      let expectedOutput = {
        isValid: false,
        error: "tail: illegal offset -- file1"
      };

      deepEqual(generateErrorMessage(error,args), expectedOutput);
    });
    it("should return an object with isValid false and illegal count error for file name",function() {
      let args = {
        type : "head",
        option: "n",
        count: "file1",
        files: []
      };
      let error  = "illegalCount";
      let expectedOutput = {
        isValid: false,
        error: "head: illegal line count -- file1"
      };

      deepEqual(generateErrorMessage(error,args), expectedOutput);
    });
     it("should return isValid false and illegal option error for invalid option",function() {
      let args = {
        type : "head",
        option: "r",
        count: "file1",
        files: []
      };
      let error  = "illegalOption";
      let expectedOutput = {
        isValid: false,
        error: "head: illegal option -- r\nusage: head [-n lines | -c bytes] [file ...]"
      };

      deepEqual(generateErrorMessage(error,args), expectedOutput);
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

      let args = {type : "head", files: [inputstring_1], count: 2, option: "n" };
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
        type : "head",
        files: [inputstring_1, inputstring_2],
        count: 1,
        option: "n"
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
        type : "head",
        files: [inputstring_1, inputstring_2],
        count: "0",
        option: "n"
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
        type : "head",
        files: [inputstring_1, inputstring_2],
        count: "-0",
        option: "n"
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

      let args = { type : "head",files: [], count: "identity", option: "n" };
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
        type : "head",
        files: ["file"],
        count: "5",
        option: "n"
      };
      expectedOutput = "head: file: No such file or directory";

      deepEqual(
        getHead(getSameContent, isFilePresent.bind(null, false), args),
        expectedOutput
      );
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

      deepEqual(getChars("head", inputstring, 10), expectedOutput_10);
      deepEqual(getChars("head", inputstring, 20), expectedOutput_20);
      deepEqual(getChars("head", inputstring, 25), expectedOutput_25);
    });

    it("should return empty array for empty input string", function() {
      deepEqual(getChars("head", "", 1), []);
      deepEqual(getChars("head", "", 5), []);
    });
  });
});
