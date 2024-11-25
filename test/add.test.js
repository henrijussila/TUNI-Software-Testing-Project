import assert from 'assert';
import add from '../src/add.js';

describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return 2 when adding 1 and 1', function () {
      assert.equal(add(1,1), 2);
    });
  });
});


