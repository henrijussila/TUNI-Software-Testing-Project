import assert from 'assert';
import get from '../src/get.js';

describe('get', function () {

    // POSITIVE TESTS
    it('should return the correct value for a valid path', function () {
        const object = { 'a': [{ 'b': { 'c': 3 } }] };
        assert.strictEqual(get(object, 'a[0].b.c'), 3);
    });

    it('should return the correct value for an array path', function () {
        const object = { 'a': [{ 'b': { 'c': 3 } }] };
        assert.strictEqual(get(object, ['a', '0', 'b', 'c']), 3);
    });

    // NEGATIVE TESTS
    it('should return the default value if the resolved value is undefined', function () {
        const object = { 'a': [{ 'b': { 'c': 3 } }] };
        assert.strictEqual(get(object, 'a.b.c', 'default'), 'default');
    });

    it('should return undefined if the path does not exist and no default is provided', function () {
        const object = { 'a': [{ 'b': { 'c': 3 } }] };
        assert.strictEqual(get(object, 'a.x.y'), undefined);
    });

    it('should return undefined for invalid path formats', function () {
        const object = { a: { b: { c: 3 } } };
        assert.strictEqual(get(object, 'a..b.c'), undefined);
    });

    it('should return undefined for an empty path string', function () {
        const object = { a: 10 };
        assert.strictEqual(get(object, ''), undefined);
        assert.strictEqual(get(object, '', 'default'), 'default');
    });

    // LIMIT VALUE TESTS
    it('should handle null or undefined objects gracefully', function () {
        assert.strictEqual(get(null, 'a.b.c', 'default'), 'default');
        assert.strictEqual(get(undefined, 'a.b.c', 'default'), 'default');
    });

    it('should return the default value for an empty object', function () {
        assert.strictEqual(get({}, 'a.b.c', 'default'), 'default');
    });
});
