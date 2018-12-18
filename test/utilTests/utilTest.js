const assert = require("assert");
const {doesIncludeNumber, zip} = require("../../src/util/util.js");

describe("doesIncludeNumber", function() {
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
});

describe("zip", function() {
  it("should return an array for two input arrays with their respective elements concated", function() {
    let list1 = ["cake", "mango"];
    let list2 = [["chocolate", "pineapple"], ["raw", "ripen"]];
    let expectedOutput = ["cakechocolate,pineapple", "mangoraw,ripen"];
    assert.deepEqual(zip(list1, list2), expectedOutput);
  });
});
