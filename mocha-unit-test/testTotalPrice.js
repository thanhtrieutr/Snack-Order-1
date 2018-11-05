const assert = require('assert');

function testFunction (a, b) {
  return a + b;
}

describe('Test Array', function() {
  describe('Test #1', function() {
    it('Should return 2 ', function() {
      assert.equal(testFunction(1,1), 2);
    });
  });
  describe('Test #2', function() {
    it('Should return 5', function() {
      assert.equal(testFunction(3,3), 5);
    });
  });
  describe('Test #3', function() {
    it('Should return 11', function() {
      assert.equal(testFunction(5,5), 11);
    });
  });
});