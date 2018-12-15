const {deepEqual} = require("assert");
const {
  getLines,
  isValidCount,
  getChars,
  generateErrorMessage,
  findError,
  getHead
} = require("../../src/library/library.js");

describe("Test for library.js", function() {
  describe("Test isValidCount function", function() {
    it("should return true for input count as a nonzero positive integer", function() {
      deepEqual(isValidCount(9), true);
      deepEqual(isValidCount(1), true);
      deepEqual(isValidCount(12), true);
    });
    it("should return false for input count zero or negative integer", function() {
      deepEqual(isValidCount(-4), false);
      deepEqual(isValidCount(0), false);
      deepEqual(isValidCount(-1), false);
    });
    it("should return false for input count as any words string", function() {
      deepEqual(isValidCount("obvious"), false);
      deepEqual(isValidCount("iAm1"), false);
      deepEqual(isValidCount("m"), false);
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
    it("should return an object with isValid true and error none for valid input count (head)", function() {
      let args = {
        type: "head",
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

    it("should return error none for valid input count (tail)", function() {
      let args = {
        type: "tail",
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

    it("should return an object with isValid true and error none for valid input file name", function() {
      let args = {
        type: "head",
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
        type: "tail",
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

    it("should return an object with isValid false and error for -5 as count for head ", function() {
      let args = {
        type: "head",
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

    it("should return an object with isValid false and error for 0 as count (head) ", function() {
      let args = {
        type: "head",
        option: "n",
        count: "0",
        files: ["file1"]
      };
      let expectedOutput = {
        isValid: false,
        error: "head: illegal line count -- 0"
      };

      deepEqual(findError(args), expectedOutput);
    });

    it("should return an object with isValid true and error none for 0 as count (tail) ", function() {
      let args = {
        type: "tail",
        option: "n",
        count: "0",
        files: ["file1"]
      };
      let expectedOutput = {
        isValid: true,
        error: "none"
      };

      deepEqual(findError(args), expectedOutput);
    });

    it("should return an object with isValid true and error none for -5 as count (tail) ", function() {
      let args = {
        type: "tail",
        option: "n",
        count: "-5",
        files: ["file1"]
      };
      let expectedOutput = {
        isValid: true,
        error: "none"
      };

      deepEqual(findError(args), expectedOutput);
    });

    it("should return an object with isValid false and error for file name as count (head)", function() {
      let args = {
        type: "head",
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

    it("should return an object with isValid false and error for file name as count (tail)", function() {
      let args = {
        type: "tail",
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
    it("should return an object with isValid false and illegal count error for file name", function() {
      let args = {
        type: "tail",
        option: "n",
        count: "file1",
        files: []
      };
      let error = "illegalOffset";
      let expectedOutput = {
        isValid: false,
        error: "tail: illegal offset -- file1"
      };

      deepEqual(generateErrorMessage(error, args), expectedOutput);
    });
    it("should return an object with isValid false and illegal count error for file name", function() {
      let args = {
        type: "head",
        option: "n",
        count: "file1",
        files: []
      };
      let error = "illegalCount";
      let expectedOutput = {
        isValid: false,
        error: "head: illegal line count -- file1"
      };

      deepEqual(generateErrorMessage(error, args), expectedOutput);
    });
    it("should return isValid false and illegal option error for invalid option", function() {
      let args = {
        type: "head",
        option: "r",
        count: "file1",
        files: []
      };
      let error = "illegalOption";
      let expectedOutput = {
        isValid: false,
        error:
          "head: illegal option -- r\nusage: head [-n lines | -c bytes] [file ...]"
      };

      deepEqual(generateErrorMessage(error, args), expectedOutput);
    });
  });

  describe("Test getHead", function() {
    const readFileSync = function(content) {
      return content;
    };

    const existsSync = function(name) {
      if (name == "absentFile") {
        return false;
      }
      return true;
    };

    let fs = {readFileSync, existsSync};

    it("should return a string of two lines for one input file in args.files", function() {
      let inputstring_1 = "This is first line\n";
      inputstring_1 += "This is second line\n";
      inputstring_1 += "This is third line\n";

      let args = {
        type: "head",
        files: [inputstring_1],
        count: 2,
        option: "n"
      };
      expectedOutput = "This is first line\nThis is second line";

      deepEqual(getHead(fs, args), expectedOutput);
    });

    it("should return a string of two lines one of each file for two input files", function() {
      let inputstring_1 = "This is first";
      let inputstring_2 = "identity";

      let args = {
        type: "head",
        files: [inputstring_1, inputstring_2],
        count: 1,
        option: "n"
      };
      expectedOutput =
        "==> This is first <==\nThis is first\n\n==> identity <==\nidentity";

      deepEqual(getHead(fs, args), expectedOutput);
    });

    it("should return a count error for input as a non integer value (head)", function() {
      let inputstring = "identity";

      let args = {
        type: "head",
        files: [inputstring],
        count: "inputstring_1",
        option: "n"
      };
      expectedOutput = "head: illegal line count -- inputstring_1";

      deepEqual(getHead(fs, args), expectedOutput);
    });

    it("should return a count error if the input count is -0 (head)", function() {
      let inputstring_1 = "This is first";
      let inputstring_2 = "identity";

      let args = {
        type: "head",
        files: [inputstring_1, inputstring_2],
        count: "-0",
        option: "n"
      };
      expectedOutput = "head: illegal line count -- -0";

      deepEqual(getHead(fs, args), expectedOutput);
    });

    it("should return a empty string for input count 0 instead of an count error (tail)", function() {
      let inputstring = "functionality";

      let args = {
        type: "tail",
        files: [inputstring],
        count: "0",
        option: "n"
      };
      expectedOutput = "";

      deepEqual(getHead(fs, args), expectedOutput);
    });

    it("should return last 5 characters of 2 files for option c and count 5 (tail)", function() {
      let inputstring_1 = "functionality";
      let inputstring_2 = "identity";

      let args = {
        type: "tail",
        files: [inputstring_1, inputstring_2],
        count: "5",
        option: "c"
      };
      expectedOutput = "==> functionality <==\nality\n==> identity <==\nntity";

      deepEqual(getHead(fs, args), expectedOutput);
    });

    it("should return last 5 characters of file for option c and count 5 (tail)", function() {
      let inputstring_1 = "functionality";
      let inputstring_2 = "identity";

      let args = {
        type: "tail",
        files: [inputstring_1, inputstring_2],
        count: "5",
        option: "c"
      };
      expectedOutput = "==> functionality <==\nality\n==> identity <==\nntity";

      deepEqual(getHead(fs, args), expectedOutput);
    });

    it("should return last line of file for count 1 (tail)", function() {
      let inputstring_1 = "functionality\n";
      inputstring_1 += "identity";

      let args = {
        type: "tail",
        files: [inputstring_1],
        count: "1",
        option: "n"
      };
      expectedOutput = "identity";

      deepEqual(getHead(fs, args), expectedOutput);
    });

    it("should return last 2 lines of file for count 2 (tail)", function() {
      let inputstring_1 = "functionality\n";
      inputstring_1 += "identity";

      let args = {
        type: "tail",
        files: [inputstring_1],
        count: "2",
        option: "n"
      };
      expectedOutput = "functionality\nidentity";

      deepEqual(getHead(fs, args), expectedOutput);
    });
    it("should return a error message if the input count is not valid", function() {
      let args = {type: "head", files: [], count: "identity", option: "n"};
      expectedOutput = "head: illegal line count -- identity";

      deepEqual(getHead(fs, args), expectedOutput);
    });

    it("should return a error message if the input file name is invalid", function() {
      let args = {
        type: "head",
        files: ["absentFile"],
        count: "5",
        option: "n"
      };
      expectedOutput = "head: absentFile: No such file or directory";

      deepEqual(getHead(fs, args), expectedOutput);
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
