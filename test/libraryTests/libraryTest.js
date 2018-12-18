const assert = require("assert");
const {
  read,
  applyHeader,
  getLines,
  getChars,
  getContent
} = require("../../src/library/library.js");

describe("Test for library.js", function() {
  const readFileSync = function(filePath) {
    let file1 = "This is first line\n";
    file1 += "This is second line\n";
    file1 += "This is third line";

    let file2 = "This is fourth line\n";
    file2 += "This is fifth line\n";
    file2 += "This is sixth line";

    let contents = {file1, file2};
    return contents[filePath];
  };

  const existsSync = function(filePath) {
    let filePaths = ["file1", "file2"];
    if (!filePaths.includes(filePath)) {
      return false;
    }
    return true;
  };
  let fs = {readFileSync, existsSync};
  describe("getLines", function() {
    describe("head", function() {
      it("should return array of first n number of lines when count is n", function() {
        let fileContent = "This is first line\n";
        fileContent += "This is second line\n";
        fileContent += "This is third line n";
        fileContent += "This is fourth line\n";
        fileContent += "This is fifth line";

        expectedOutput_1 = ["This is first line"];
        expectedOutput_2 = ["This is first line", "This is second line"];

        assert.deepEqual(
          getLines("n", "head", fileContent, 1),
          expectedOutput_1
        );
        assert.deepEqual(
          getLines("n", "head", fileContent, 2),
          expectedOutput_2
        );
      });
    });
    describe("tail", function() {
      it("should return array of last n number of lines when count is n", function() {
        let fileContent = "This is first line\n";
        fileContent += "This is second line\n";
        fileContent += "This is third line\n";
        fileContent += "This is fourth line\n";
        fileContent += "This is fifth line";

        expectedOutput_1 = ["This is fifth line"];
        expectedOutput_2 = ["This is fourth line", "This is fifth line"];

        assert.deepEqual(
          getLines("n", "tail", fileContent, 1),
          expectedOutput_1
        );
        assert.deepEqual(
          getLines("n", "tail", fileContent, 2),
          expectedOutput_2
        );
      });
      it("should return empty array when input count is 0", function() {
        let fileContent = "This is first line\n";
        fileContent += "This is second line\n";
        fileContent += "This is third line\n";
        fileContent += "This is fourth line\n";
        fileContent += "This is fifth line";

        assert.deepEqual(getLines("n", "tail", fileContent, 0), []);
      });
    });
  });

  describe("getContent", function() {
    describe("head", function() {
      it("should return 2 lines for count 2 when one file is provided", function() {
        let args = {
          type: "head",
          filePaths: ["file1"],
          count: 2,
          option: "n"
        };
        expectedOutput = "This is first line\nThis is second line";

        assert.deepEqual(getContent(fs, args), expectedOutput);
      });

      it("should return 1 line per file for count 1 when 2 input filePaths are provided", function() {
        let args = {
          type: "head",
          filePaths: ["file1", "file2"],
          count: 1,
          option: "n"
        };
        expectedOutput =
          "==> file1 <==\nThis is first line\n\n==> file2 <==\nThis is fourth line";

        assert.deepEqual(getContent(fs, args), expectedOutput);
      });

      it("should return a count error when count is a non integer value", function() {
        let fileContent = "identity";

        let args = {
          type: "head",
          filePaths: ["file1"],
          count: "file1",
          option: "n"
        };
        expectedOutput = "head: illegal line count -- file1";

        assert.deepEqual(getContent(fs, args), expectedOutput);
      });

      it("should return a count error when input count is -0", function() {
        let args = {
          type: "head",
          filePaths: ["file1", "file2"],
          count: "-0",
          option: "n"
        };
        expectedOutput = "head: illegal line count -- -0";

        assert.deepEqual(getContent(fs, args), expectedOutput);
      });

      it("should return absentFile error if the input file name is invalid", function() {
        let args = {
          type: "head",
          filePaths: ["absentFile"],
          count: "5",
          option: "n"
        };
        expectedOutput = "head: absentFile: No such file or directory";

        assert.deepEqual(getContent(fs, args), expectedOutput);
      });
    });
    describe("tail", function() {
      it("should return a empty fileContent for input count 0", function() {
        let args = {
          type: "tail",
          filePaths: ["file1"],
          count: "0",
          option: "n"
        };
        expectedOutput = "";

        assert.deepEqual(getContent(fs, args), expectedOutput);
      });

      it("should return last 5 chars of 2 filePaths when option c and count 5", function() {
        let args = {
          type: "tail",
          filePaths: ["file1", "file2"],
          count: "5",
          option: "c"
        };
        expectedOutput = "==> file1 <==\n line\n==> file2 <==\n line";

        assert.deepEqual(getContent(fs, args), expectedOutput);
      });

      it("should return error for 1 file and content of the other when a invalid and a valid file is given", function() {
        let args = {
          type: "tail",
          filePaths: ["filex", "file2"],
          count: "1",
          option: "n"
        };
        expectedOutput =
          "tail: filex: No such file or directory\n\n==> file2 <==\nThis is sixth line";

        assert.deepEqual(getContent(fs, args), expectedOutput);
      });

      it("should return content of 1 file and error for the other when a vaild and invalid file is given", function() {
        let args = {
          type: "tail",
          filePaths: ["file2", "filex"],
          count: "1",
          option: "n"
        };
        expectedOutput =
          "==> file2 <==\nThis is sixth line\n\ntail: filex: No such file or directory";

        assert.deepEqual(getContent(fs, args), expectedOutput);
      });

      it("should return last 5 chars of file for option c and count 5", function() {
        let args = {
          type: "tail",
          filePaths: ["file1"],
          count: "5",
          option: "c"
        };
        expectedOutput = " line";

        assert.deepEqual(getContent(fs, args), expectedOutput);
      });

      it("should return last line of file when count is 1", function() {
        let args = {
          type: "tail",
          filePaths: ["file1"],
          count: "1",
          option: "n"
        };
        expectedOutput = "This is third line";

        assert.deepEqual(getContent(fs, args), expectedOutput);
      });

      it("should return whole file when count is greater than the file size", function() {
        let args = {
          type: "tail",
          filePaths: ["file1"],
          count: "10",
          option: "n"
        };
        expectedOutput = "This is first line\n";
        expectedOutput += "This is second line\n";
        expectedOutput += "This is third line";

        assert.deepEqual(getContent(fs, args), expectedOutput);
      });

      it("should return whole file when count is equal to the file size", function() {
        let args = {
          type: "tail",
          filePaths: ["file1"],
          count: "3",
          option: "n"
        };
        expectedOutput = "This is first line\n";
        expectedOutput += "This is second line\n";
        expectedOutput += "This is third line";

        assert.deepEqual(getContent(fs, args), expectedOutput);
      });

      it("should return absentFile error if the input file name is invalid", function() {
        let args = {
          type: "tail",
          filePaths: ["absentFile"],
          count: "5",
          option: "n"
        };
        expectedOutput = "tail: absentFile: No such file or directory";

        assert.deepEqual(getContent(fs, args), expectedOutput);
      });

      it("should return option error when the input option is invalid", function() {
        let args = {
          type: "tail",
          filePaths: ["file1"],
          count: "5",
          option: "z"
        };
        expectedOutput =
          "tail: illegal option -- z\nusage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]";

        assert.deepEqual(getContent(fs, args), expectedOutput);
      });
    });
  });

  describe("getChars", function() {
    describe("head", function() {
      it("should return array of first n number of characters when input count is n", function() {
        fileContent = "This is first\n";
        fileContent += "This is second\n";
        fileContent += "This is third\n";
        fileContent += "This is fourth\n";
        fileContent += "This is fifth";

        expectedOutput_10 = "This is fi".split("");
        expectedOutput_20 = "This is first\nT".split("");

        assert.deepEqual(getChars("head", fileContent, 10), expectedOutput_10);
        assert.deepEqual(getChars("head", fileContent, 15), expectedOutput_20);
      });

      it("should return empty array for empty input fileContent", function() {
        assert.deepEqual(getChars("head", "", 1), []);
        assert.deepEqual(getChars("head", "", 5), []);
      });

      it("should return whole file content if count is greater than the chars in file", function() {
        let fileContent = "ball\n";
        fileContent += "lol";

        let expectedOutput = fileContent.split("");
        assert.deepEqual(getChars("head", fileContent, 15), expectedOutput);
      });
    });
    describe("tail", function() {
      it("should return array of last n number of characters when input count is n", function() {
        fileContent = "This is first\n";
        fileContent += "This is second\n";
        fileContent += "This is third\n";
        fileContent += "This is fourth\n";
        fileContent += "This is fifth";

        expectedOutput_10 = "s is fifth".split("");
        expectedOutput_20 = "h\nThis is fifth".split("");

        assert.deepEqual(getChars("tail", fileContent, 10), expectedOutput_10);
        assert.deepEqual(getChars("tail", fileContent, 15), expectedOutput_20);
      });

      it("should return empty array when input count is 0", function() {
        fileContent = "This is first\n";
        fileContent += "This is second\n";

        assert.deepEqual(getChars("tail", fileContent, 0), []);
      });

      it("should return whole file content if count is greater than the chars in file", function() {
        let fileContent = "ball\n";
        fileContent += "lol";

        let expectedOutput = fileContent.split("");
        assert.deepEqual(getChars("tail", fileContent, 15), expectedOutput);
      });

      it("should return empty array for empty input fileContent", function() {
        assert.deepEqual(getChars("tail", "", 1), []);
        assert.deepEqual(getChars("tail", "", 5), []);
      });
    });
  });
  describe("read", function() {
    it("should return file content when file path is provided", function() {
      let expectedOutput = "This is fourth line\n";
      expectedOutput += "This is fifth line\n";
      expectedOutput += "This is sixth line";

      assert.deepEqual(read(fs, "head", "file2"), expectedOutput);
    });

    it("should return head error when file is not present and type is head", function() {
      let expectedOutput = "head: filex: No such file or directory";

      assert.deepEqual(read(fs, "head", "filex"), expectedOutput);
    });

    it("should return tail error when file is not present and type is tail", function() {
      let expectedOutput = "tail: filex: No such file or directory";

      assert.deepEqual(read(fs, "tail", "filex"), expectedOutput);
    });
  });
});
