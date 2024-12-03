import assert from 'assert';
import castArray from '../src/castArray.js';

describe('castArray', function () {

    // POSITIVE TESTS
    it('should wrap a non-array value in an array', function () {
        assert.deepStrictEqual(castArray(1), [1]);
        assert.deepStrictEqual(castArray('abc'), ['abc']);
        assert.deepStrictEqual(castArray({ 'a': 1 }), [{ 'a': 1 }]);
    });

    it('should return the same array if an array is provided', function () {
        const array = [1, 2, 3];
        assert.strictEqual(castArray(array), array);
    });

    // NEGATIVE TESTS
    it('should return an array containing undefined if undefined is passed', function () {
        assert.deepStrictEqual(castArray(undefined), [undefined]);
    });

    it('should return an array containing null if null is passed', function () {
        assert.deepStrictEqual(castArray(null), [null]);
    });

    it('should wrap a boolean in an array', function () {
        assert.deepStrictEqual(castArray(true), [true]);
        assert.deepStrictEqual(castArray(false), [false]);
    });

    it('should return an empty array if no arguments are provided', function () {
        // This test test should pass but fails
        assert.deepStrictEqual(castArray(), []); 
    });

    // LIMIT VALUE TESTS
    it('should wrap multiple arguments into an array containing only the first argument', function () {
        assert.deepStrictEqual(castArray(1, 2, 3), [1]);
    });
});
