import assert from 'assert';
import add from '../src/add.js';

describe('add', function () {

  // POSITIVE TESTS
  it('should return the sum of two positive numbers', function () {
    assert.strictEqual(add(6, 4), 10);
  });

  it('should return the sum of a positive and a negative number', function () {
    assert.strictEqual(add(6, -4), 2);
  });

  it('should return the sum of two negative numbers', function () {
    assert.strictEqual(add(-6, -4), -10);
  });

  it('should return the correct result when adding zero', function () {
    assert.strictEqual(add(0, 5), 5);
    assert.strictEqual(add(5, 0), 5);
  });

  it('should return zero when both numbers are zero', function () {
    assert.strictEqual(add(0, 0), 0);
  });

  it('should return the other number if other one is null', function () {
    assert.strictEqual(add(null, 4), 4);
  });

  // NEGATIVE TESTS
  // These tests fail because the function does not throw an error when the inputs are not numbers
  it('should throw an error when inputs are not numbers', function () {
    assert.throws(() => add('a', 'b'), Error);
    assert.throws(() => add(1, 'b'), Error);
    assert.throws(() => add('a', 1), Error);
    assert.throws(() => add({}, []), Error);
    assert.throws(() => add(undefined, 4), Error);
    assert.throws(() => add(NaN, 4), Error);
  });

  // These are passing tests but they are not testing the correct behavior
  it('should return NaN if one of the inputs is NaN', function () {
    assert.ok(isNaN(add(NaN, 4)));
  });

  it('should return sum of two inputs even if they are not numbers', function () {
    assert.strictEqual(add('a', 4), 'a4');
    assert.strictEqual(add(6, 'b'), '6b');
  });

  // PARTITION TESTS

  // Does not return the "correct" result for floating point numbers due to floating-point
  // precision issues which is why we use the following assertion
  it('should handle floating point addition correctly', function () {
    const result = add(0.1, 0.2);
    const expected = 0.3;
    const epsilon = 0.0000001; // A small tolerance value for floating-point comparison
    assert.ok(Math.abs(result - expected) < epsilon, `Expected ${result} to be close to ${expected}`);
  });
});

