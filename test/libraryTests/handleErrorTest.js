const assert = require("assert");

const {
  findError,
  generateErrorMessage,
  isCountValid,
  isOptionValid
} = require("../../src/library/handleError.js");

describe("findError", function() {
  describe("head", function() {
    it("should return an object with isValid true and error none for valid input count", function() {
      let args = {
        type: "head",
        option: "n",
        count: 5,
        filePaths: ["file1"]
      };
      let expectedOutput = {
        isValid: true,
        error: "none"
      };

      assert.deepEqual(findError(args), expectedOutput);
    });

    it("should return an object with isValid true and error none for valid input file name", function() {
      let args = {
        type: "head",
        option: "n",
        count: 5,
        filePaths: ["file1"]
      };
      let expectedOutput = {
        isValid: true,
        error: "none"
      };

      assert.deepEqual(findError(args), expectedOutput);
    });

    it("should return an object with isValid false and error for -5 as count", function() {
      let args = {
        type: "head",
        option: "n",
        count: "-5",
        filePaths: ["file1"]
      };
      let expectedOutput = {
        isValid: false,
        error: "head: illegal line count -- -5"
      };

      assert.deepEqual(findError(args), expectedOutput);
    });

    it("should return an object with isValid false and error for 0 as count", function() {
      let args = {
        type: "head",
        option: "n",
        count: "0",
        filePaths: ["file1"]
      };
      let expectedOutput = {
        isValid: false,
        error: "head: illegal line count -- 0"
      };

      assert.deepEqual(findError(args), expectedOutput);
    });

    it("should return an object with isValid false and error for file name as count", function() {
      let args = {
        type: "head",
        option: "n",
        count: "file1",
        filePaths: []
      };
      let expectedOutput = {
        isValid: false,
        error: "head: illegal line count -- file1"
      };

      assert.deepEqual(findError(args), expectedOutput);
    });
  });
  describe("tail", function() {
    it("should return error none for valid input count", function() {
      let args = {
        type: "tail",
        option: "n",
        count: 5,
        filePaths: ["file1"]
      };
      let expectedOutput = {
        isValid: true,
        error: "none"
      };

      assert.deepEqual(findError(args), expectedOutput);
    });

    it("should return an object with isValid false and error for invalid option", function() {
      let args = {
        type: "tail",
        option: "r",
        count: 5,
        filePaths: ["file1"]
      };
      let expectedOutput = {
        isValid: false,
        error:
          "tail: illegal option -- r\nusage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]"
      };

      assert.deepEqual(findError(args), expectedOutput);
    });

    it("should return an object with isValid true and error none for 0 as count", function() {
      let args = {
        type: "tail",
        option: "n",
        count: "0",
        filePaths: ["file1"]
      };
      let expectedOutput = {
        isValid: true,
        error: "none"
      };

      assert.deepEqual(findError(args), expectedOutput);
    });

    it("should return an object with isValid true and error none for -5 as count", function() {
      let args = {
        type: "tail",
        option: "n",
        count: "-5",
        filePaths: ["file1"]
      };
      let expectedOutput = {
        isValid: true,
        error: "none"
      };

      assert.deepEqual(findError(args), expectedOutput);
    });

    it("should return an object with isValid false and error for file name as count", function() {
      let args = {
        type: "tail",
        option: "n",
        count: "file1",
        filePaths: ["file1"]
      };
      let expectedOutput = {
        isValid: false,
        error: "tail: illegal offset -- file1"
      };

      assert.deepEqual(findError(args), expectedOutput);
    });
  });
});

describe("generateErrorMessage", function() {
  describe("head", function() {
    it("should return an object with isValid false and illegal count error for file name", function() {
      let args = {
        type: "head",
        option: "n",
        count: "file1",
        filePaths: []
      };
      let error = "illegalCount";
      let expectedOutput = {
        isValid: false,
        error: "head: illegal line count -- file1"
      };

      assert.deepEqual(generateErrorMessage(error, args), expectedOutput);
    });
    it("should return isValid false and illegal option error for invalid option", function() {
      let args = {
        type: "head",
        option: "r",
        count: "file1",
        filePaths: []
      };
      let error = "illegalOption";
      let expectedOutput = {
        isValid: false,
        error:
          "head: illegal option -- r\nusage: head [-n lines | -c bytes] [file ...]"
      };

      assert.deepEqual(generateErrorMessage(error, args), expectedOutput);
    });
  });
  describe("tail", function() {
    it("should return an object with isValid false and illegal offset error for file name", function() {
      let args = {
        type: "tail",
        option: "n",
        count: "file1",
        filePaths: []
      };
      let error = "illegalOffset";
      let expectedOutput = {
        isValid: false,
        error: "tail: illegal offset -- file1"
      };

      assert.deepEqual(generateErrorMessage(error, args), expectedOutput);
    });

    it("should return isValid false and illegal option error for invalid option", function() {
      let args = {
        type: "tail",
        option: "r",
        count: "file1",
        filePaths: []
      };
      let error = "illegalOption";
      let expectedOutput = {
        isValid: false,
        error:
          "tail: illegal option -- r\nusage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]"
      };

      assert.deepEqual(generateErrorMessage(error, args), expectedOutput);
    });
  });
});

describe("isCountValid", function() {
  it("should return true for input count as a nonzero positive integer", function() {
    assert.deepEqual(isCountValid(9), true);
    assert.deepEqual(isCountValid(1), true);
    assert.deepEqual(isCountValid(12), true);
  });
  it("should return false for input count zero or negative integer", function() {
    assert.deepEqual(isCountValid(-4), false);
    assert.deepEqual(isCountValid(0), false);
    assert.deepEqual(isCountValid(-1), false);
  });
  it("should return false for input count as any alphanumeric string", function() {
    assert.deepEqual(isCountValid("obvious"), false);
    assert.deepEqual(isCountValid("iAm1"), false);
    assert.deepEqual(isCountValid("m"), false);
  });
});
describe("isOptionValid", function() {
  it("should return true for input option as either n or c", function() {
    assert.deepEqual(isOptionValid("c"), true);
    assert.deepEqual(isOptionValid("n"), true);
  });
  it("should return false for any input other than n and c", function() {
    assert.deepEqual(isOptionValid("nc"), false);
    assert.deepEqual(isOptionValid("1"), false);
    assert.deepEqual(isOptionValid("whyn"), false);
  });
});
