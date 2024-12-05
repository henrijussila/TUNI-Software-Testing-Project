import assert from 'assert';
import toString from '../src/toString.js';

describe('toString', () => {
  // Positive Test Cases
  describe('Positive Test Cases', () => {
    it('should return the same string for string input', () => {
      assert.strictEqual(toString('hello'), 'hello');
      assert.strictEqual(toString(''), '');
      assert.strictEqual(toString('123'), '123');
    });

    it('should convert numbers to strings', () => {
      assert.strictEqual(toString(42), '42');
      assert.strictEqual(toString(-42), '-42');
      assert.strictEqual(toString(0), '0');
      assert.strictEqual(toString(-0), '-0');
    });

    it('should convert arrays to strings', () => {
      assert.strictEqual(toString([1, 2, 3]), '1,2,3');
      assert.strictEqual(toString(['a', 'b', 'c']), 'a,b,c');
      assert.strictEqual(toString([null, undefined, 0]), ',,0');
    });

    it('should convert symbols to strings', () => {
      const symbol = Symbol('test');
      assert.strictEqual(toString(symbol), symbol.toString());
    });


    // it('should return an empty string for null or undefined', () => {
    //   assert.strictEqual(toString(null), '');
    //   assert.strictEqual(toString(undefined), '');
    // });
    

    it('should handle object with custom toString method', () => {
      const obj = {
        toString: () => 'customToString',
      };
      assert.strictEqual(toString(obj), 'customToString');
    });

    it('should handle regular objects as "[object Object]"', () => {
      assert.strictEqual(toString({}), '[object Object]');
      assert.strictEqual(toString({ key: 'value' }), '[object Object]');
    });
  });

  // Negative Test Cases
  describe('Negative Test Cases', () => {
    it('should handle circular references in arrays gracefully', () => {
      const arr = [];
      arr.push(arr); // Circular reference
      assert.throws(() => toString(arr), /RangeError: Maximum call stack size exceeded/);
    });
  });

  // Limited Value Cases
  describe('Limited Value Cases', () => {
    it('should correctly handle Infinity and NaN', () => {
      assert.strictEqual(toString(Infinity), 'Infinity');
      assert.strictEqual(toString(-Infinity), '-Infinity');
      assert.strictEqual(toString(NaN), 'NaN');
    });

    it('should handle special numeric values', () => {
      assert.strictEqual(toString(Number.MAX_SAFE_INTEGER), '9007199254740991');
      assert.strictEqual(toString(Number.MIN_SAFE_INTEGER), '-9007199254740991');
      assert.strictEqual(toString(Number.MAX_VALUE), '1.7976931348623157e+308');
      assert.strictEqual(toString(Number.MIN_VALUE), '5e-324');
    });

    it('should handle deeply nested arrays', () => {
      const nestedArray = [1, [2, [3, [4]]]];
      assert.strictEqual(toString(nestedArray), '1,2,3,4');
    });

    it('should handle date objects correctly', () => {
      const date = new Date(0);
      assert.strictEqual(toString(date), date.toString());
    });
  });
});