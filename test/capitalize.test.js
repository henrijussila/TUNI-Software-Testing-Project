import assert from 'assert';
import capitalize from '../src/capitalize.js';

describe('capitalize', function () {
    // POSITIVE TESTS
    it('should capitalize a single word in uppercase', function () {
        assert.strictEqual(capitalize('FRED'), 'Fred');
    });

    it('should capitalize a single word in lowercase', function () {
        assert.strictEqual(capitalize('fred'), 'Fred');
    });

    it('should capitalize a mixed-case word', function () {
        assert.strictEqual(capitalize('fReD'), 'Fred');
    });

    it('should handle a single character', function () {
        assert.strictEqual(capitalize('f'), 'F');
    });

    it('should handle strings with spaces', function () {
        assert.strictEqual(capitalize(' fred'), ' fred');
    });

    it('should handle non-alphabetic characters at the start', function () {
        assert.strictEqual(capitalize('1fred'), '1fred');
        assert.strictEqual(capitalize('_fred'), '_fred');
    });

    // NEGATIVE TESTS
    it('should handle an empty string', function () {
        assert.strictEqual(capitalize(''), '');
    });

    // These tests fail because the function does not throw an error when the inputs are not strings
    it('should throw an error when input is not string', function () {
        assert.throws(() => capitalize(null), Error);
        assert.throws(() => capitalize(undefined), Error);
        assert.throws(() => capitalize(123), Error);
        assert.throws(() => capitalize(true), Error);
      });
});
