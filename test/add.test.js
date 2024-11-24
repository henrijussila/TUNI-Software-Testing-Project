import assert from 'assert';
import add from '../src/add.js';

describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return 2 when adding 1 and 1', function () {
      assert.equal(add(1,1), 2);
    });
  });
});

describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return 12 when adding 5 and 7', function () {
      assert.equal(add(5,7), 12);
    });
  });
});

describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return #1 when adding # and 1', function () {
      assert.equal(add('#', 1), '#1');
    });
  });
});

describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return 0 when adding -1 and 1', function () {
      assert.equal(add(-1, 1), 0);
    });
  });
});