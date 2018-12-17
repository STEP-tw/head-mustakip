const assert = require("assert");
const {doesIncludeNumber} = require("../../src/util/util.js");
const {getHeader, zip} = require("../../src/util/util.js");

describe("Test for util functions", function() {
  describe("Test doesIncludeNumber", function() {
    it("should return true for input string containing any numbers", function() {
      assert.deepEqual(doesIncludeNumber("musta1"), true);
      assert.deepEqual(doesIncludeNumber("mus4ta1"), true);
      assert.deepEqual(doesIncludeNumber("3"), true);
    });
    it("should return false for input string not containg any numbers ", function() {
      assert.deepEqual(doesIncludeNumber("musta"), false);
      assert.deepEqual(doesIncludeNumber("step"), false);
      assert.deepEqual(doesIncludeNumber("mack"), false);
    });
    it("should return false for empty input string ", function() {
      assert.deepEqual(doesIncludeNumber(""), false);
    });
    describe("Test getHeader function", function() {
      it("should return text in fancified form like ==> text <== for input text", function() {
        assert.deepEqual(getHeader("file"), "==> file <==\n");
        assert.deepEqual(getHeader("STEP"), "==> STEP <==\n");
      });
      it("should return string of numbers in fancified form for input string of numbers", function() {
        assert.deepEqual(getHeader("1"), "==> 1 <==\n");
        assert.deepEqual(getHeader("456"), "==> 456 <==\n");
      });
      it("should return fancified form even if empty input string is provided", function() {
        assert.deepEqual(getHeader(""), "==>  <==\n");
      });
    });
    describe("Test zip function", function() {
      it("should return an array for two input arrays with their respective elements concated", function() {
        let list1 = ["cake", "mango"];
        let list2 = [["chocolate", "pineapple"], ["raw", "ripen"]];
        let expectedOutput = ["cakechocolate,pineapple", "mangoraw,ripen"];
        assert.deepEqual(zip(list1, list2), expectedOutput);
      });
    });
  });
});
