import assert from 'assert';
import toNumber from '../src/toNumber.js';

describe('toNumber', () => {
  // Positive Test Cases
  describe('Positive Test Cases', () => {
    it('should return the same number for numeric input', () => {
      assert.strictEqual(toNumber(42), 42);
      assert.strictEqual(toNumber(3.14), 3.14);
      assert.strictEqual(toNumber(Number.MIN_VALUE), Number.MIN_VALUE);
      assert.strictEqual(toNumber(Infinity), Infinity);
      assert.strictEqual(toNumber(-Infinity), -Infinity);
    });

    it('should convert strings to numbers', () => {
      assert.strictEqual(toNumber('42'), 42);
      assert.strictEqual(toNumber('3.14'), 3.14);
      assert.strictEqual(toNumber('-0'), -0);
      assert.strictEqual(toNumber('  123  '), 123); // Trim whitespace
    });

    it('should convert binary strings to numbers', () => {
      assert.strictEqual(toNumber('0b1010'), 10); // Binary
      assert.strictEqual(toNumber('0B1101'), 13); // Binary (uppercase prefix)
    });

    it('should convert octal strings to numbers', () => {
      assert.strictEqual(toNumber('0o17'), 15); // Octal
      assert.strictEqual(toNumber('0O10'), 8); // Octal (uppercase prefix)
    });

    it('should handle objects with numeric values', () => {
      assert.strictEqual(toNumber({ valueOf: () => 42 }), 42);
      assert.strictEqual(toNumber({ toString: () => '3.14' }), 3.14);
    });

    it('should return NaN for invalid hexadecimal strings', () => {
      assert(Number.isNaN(toNumber('0xZZZ')));
      assert(Number.isNaN(toNumber('-0xGHI')));
    });
  });

  // Negative Test Cases
  describe('Negative Test Cases', () => {
    it('should return NaN for non-numeric strings', () => {
      assert(Number.isNaN(toNumber('hello')));
      assert(Number.isNaN(toNumber('123abc')));
      assert(Number.isNaN(toNumber('Infinity!')));
    });

    it('should return NaN for symbols', () => {
      assert(Number.isNaN(toNumber(Symbol('symbol'))));
    });

    it('should return NaN for non-convertible objects', () => {
      assert(Number.isNaN(toNumber({})));
      assert(Number.isNaN(toNumber({ key: 'value' })));
    });

    it('should return NaN for arrays that cannot be converted to a single number', () => {
      assert(Number.isNaN(toNumber([1, 2, 3])));
    });

    it('should correctly process empty input or null-like values', () => {
      assert.strictEqual(toNumber(undefined), NaN);
      assert.strictEqual(toNumber(null), 0); // Special case: `null` coerces to `0`
      assert.strictEqual(toNumber(''), 0); // Empty string coerces to `0`
    });

    it('should return NaN for invalid binary or octal strings', () => {
      assert(Number.isNaN(toNumber('0b123'))); // Invalid binary
      assert(Number.isNaN(toNumber('0o89'))); // Invalid octal
    });
  });

  // Limited Value Cases
  describe('Limited Value Cases', () => {
    it('should correctly handle very large numbers', () => {
      assert.strictEqual(toNumber('1e+308'), 1e+308); // Near the upper limit
      assert.strictEqual(toNumber('-1e+308'), -1e+308); // Negative upper limit
    });

    it('should handle very small numbers', () => {
      assert.strictEqual(toNumber('1e-308'), 1e-308); // Near the lower limit
      assert.strictEqual(toNumber('-1e-308'), -1e-308); // Negative lower limit
    });

    it('should handle edge cases with NaN and Infinity strings', () => {
      assert.strictEqual(toNumber('Infinity'), Infinity);
      assert.strictEqual(toNumber('-Infinity'), -Infinity);
      assert(Number.isNaN(toNumber('NaN')));
    });
  });
});