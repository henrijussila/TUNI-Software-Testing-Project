import assert from 'assert';
import defaultTo from '../src/defaultTo.js';

describe('defaultTo', function () {

    // POSITIVE TESTS
    it('should return the provided value if it is not null or undefined', function () {
        assert.strictEqual(defaultTo(1, 10), 1);
        assert.strictEqual(defaultTo('hello', 'default'), 'hello');
        assert.strictEqual(defaultTo(true, false), true);
        assert.strictEqual(defaultTo(false, true), false);
    });

    // NEGATIVE TESTS
    it('should return the default value if the provided value is null', function () {
        assert.strictEqual(defaultTo(null, 10), 10);
    });

    it('should return the default value if the provided value is undefined', function () {
        assert.strictEqual(defaultTo(undefined, 'default'), 'default');
    });

    it('should return the default value if the provided value is NaN', function () {
        // This test should pass according to defaultTo.js but it fails
        assert.strictEqual(defaultTo(NaN, 'default'), 'default');
    });

    // LIMIT VALUE TESTS
    it('should not use the default value if the provided value is 0', function () {
        assert.strictEqual(defaultTo(0, 100), 0);
    });

    it('should not use the default value if the provided value is an empty string', function () {
        assert.strictEqual(defaultTo('', 'default'), '');
    });


});
