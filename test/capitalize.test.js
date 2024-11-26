import assert from 'assert';
import capitalize from '../src/capitalize.js';

describe('capitalize', function () {
    // Positive Tests
    it('should capitalize a single word in uppercase', function () {
        // Input is a valid string in uppercase
        assert.strictEqual(capitalize('FRED'), 'Fred');
    });

    it('should capitalize a single word in lowercase', function () {
        // Input is a valid string in lowercase
        assert.strictEqual(capitalize('fred'), 'Fred');
    });

    it('should capitalize a mixed-case word', function () {
        // Input is a valid string in mixed case
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

    // Negative Tests
    it('should handle an empty string', function () {
        // Input is an empty string
        assert.strictEqual(capitalize(''), '');
    });

    // Does not give error for non-string input, but returns the input as a string
    it('should handle non-string input gracefully', function () {
        assert.strictEqual(capitalize(null), 'Null');
        assert.strictEqual(capitalize(undefined), 'Undefined');
        assert.strictEqual(capitalize(123), '123');
        assert.strictEqual(capitalize(true), 'True');
    });


});
