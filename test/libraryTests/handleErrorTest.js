const assert = require("assert");

const {
  findError,
  generateErrorMessage,
  isValidCount
} = require("../../src/library/handleError.js");

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

    assert.deepEqual(findError(args), expectedOutput);
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

    assert.deepEqual(findError(args), expectedOutput);
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

    assert.deepEqual(findError(args), expectedOutput);
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

    assert.deepEqual(findError(args), expectedOutput);
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

    assert.deepEqual(findError(args), expectedOutput);
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

    assert.deepEqual(findError(args), expectedOutput);
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

    assert.deepEqual(findError(args), expectedOutput);
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

    assert.deepEqual(findError(args), expectedOutput);
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

    assert.deepEqual(findError(args), expectedOutput);
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

    assert.deepEqual(findError(args), expectedOutput);
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

    assert.deepEqual(generateErrorMessage(error, args), expectedOutput);
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

    assert.deepEqual(generateErrorMessage(error, args), expectedOutput);
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

    assert.deepEqual(generateErrorMessage(error, args), expectedOutput);
  });
});

describe("Test isValidCount function", function() {
  it("should return true for input count as a nonzero positive integer", function() {
    assert.deepEqual(isValidCount(9), true);
    assert.deepEqual(isValidCount(1), true);
    assert.deepEqual(isValidCount(12), true);
  });
  it("should return false for input count zero or negative integer", function() {
    assert.deepEqual(isValidCount(-4), false);
    assert.deepEqual(isValidCount(0), false);
    assert.deepEqual(isValidCount(-1), false);
  });
  it("should return false for input count as any words string", function() {
    assert.deepEqual(isValidCount("obvious"), false);
    assert.deepEqual(isValidCount("iAm1"), false);
    assert.deepEqual(isValidCount("m"), false);
  });
});
