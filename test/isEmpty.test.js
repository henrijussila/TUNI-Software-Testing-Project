import isEmpty from '../src/isEmpty.js';
import assert from 'assert';

describe('isEmpty', function () {
    // Positive test cases
    it('should return true for undefined and null', () => {
        assert.strictEqual(isEmpty(null), true);
        assert.strictEqual(isEmpty(undefined), true);
    });
    it('should return true for empty objects', () => {
        assert.strictEqual(isEmpty([]), true);
        assert.strictEqual(isEmpty(''), true);
        assert.strictEqual(isEmpty(new Set()), true);
        assert.strictEqual(isEmpty(new Map()), true);
        assert.strictEqual(isEmpty(Buffer.alloc(0)), true);
    });
    it('should return true for boolean values', () => {
        assert.strictEqual(isEmpty(true), true);
        assert.strictEqual(isEmpty(false), true);
    });
    it('should return true for integers', () => {
        assert.strictEqual(isEmpty(1), true);
        assert.strictEqual(isEmpty(0), true);
        assert.strictEqual(isEmpty(-100), true);
    });
    it('should return true for arguments with no values', () => {
        function argumentFuncPos() {
            return isEmpty(arguments);
        }
        assert.strictEqual(argumentFuncPos(), true);
    });

    // Negative test cases
    it('should return false for non-empty objects', () => {
        assert.strictEqual(isEmpty([1,2,3]), false);
        assert.strictEqual(isEmpty(new Int8Array([1,2,3])), false);
        assert.strictEqual(isEmpty([1]), false);
        assert.strictEqual(isEmpty('a'), false);
        assert.strictEqual(isEmpty('abc'), false);
        assert.strictEqual(isEmpty(' '), false);
        assert.strictEqual(isEmpty({a: 5}), false);
        assert.strictEqual(isEmpty(new Set(['a', 'b', 'c'])), false);
        assert.strictEqual(isEmpty(new Map([['a', 1], ['b', 2]])), false);
        assert.strictEqual(isEmpty(Buffer.from('buffer test')), false);
    });
    it('should return false for arguments with values', () => {
        function argumentFuncNeg() {
            return isEmpty(arguments);
        }
        assert.strictEqual(argumentFuncNeg(1,2,3), false);
    });

});