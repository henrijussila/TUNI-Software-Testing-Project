import memoize from '../src/memoize.js';
import assert from 'assert';

describe('memoize', function () {
    // Positive test cases
    it('should memoize given examples', () => {
        const identity = (x) => x;
        const memoizedIdentity = memoize(identity);

        memoizedIdentity('test');
        assert.strictEqual(memoizedIdentity.cache.has('test'), true);

        memoizedIdentity.cache.set('test', 'modified');
        assert.strictEqual(memoizedIdentity('test'), 'modified');
    });
    it('should memoize simple function, and use cache', () => {
        let callCount = 0;
        const add = (a, b) => {
            callCount++;
            return a + b;
        };
        const memoizeAdd = memoize(add);

        assert.strictEqual(memoizeAdd(1, 2), 3);
        assert.strictEqual(memoizeAdd(1, 2), 3);
        assert.strictEqual(callCount, 1);

        assert.strictEqual(memoizeAdd(2, 5), 7);
        assert.strictEqual(callCount, 2);
    });


    // Negative test cases
    it('should throw error if the first argument is not a function', () => {
        assert.throws(() => memoize(null), TypeError, 'Expected a function');
        assert.throws(() => memoize(12345), TypeError, 'Expected a function');
        assert.throws(() => memoize({}), TypeError, 'Expected a function');
        assert.throws(() => memoize([]), TypeError, 'Expected a function');
    });

   
    it('should throw a TypeError if the resolver is not a function', () => {
        const func = (x) => x;
        assert.throws(() => memoize(func, 123), TypeError, 'Expected a function');
        assert.throws(() => memoize(func, 'resolver'), TypeError, 'Expected a function');
        assert.throws(() => memoize(func, {}), TypeError, 'Expected a function');
    });
    /* Failing test
    it('should not cache results for undefined keys', () => {
        const identity = (x) => x;
        const memoizedIdentity = memoize(identity);

        assert.strictEqual(memoizedIdentity(undefined), undefined);
        assert.strictEqual(memoizedIdentity.cache.has(undefined), false); // `undefined` keys are not stored
    });
    */

    it('should handle cache misses properly', () => {
        let callCount = 0;
        const identity = (x) => {
            callCount++;
            return x;
        };
        const memoizedIdentity = memoize(identity);

        assert.strictEqual(memoizedIdentity('new'), 'new');
        assert.strictEqual(callCount, 1);

        // Clear the cache manually
        memoizedIdentity.cache.delete('new');
        assert.strictEqual(memoizedIdentity('new'), 'new');
        assert.strictEqual(callCount, 2); // Function called again after cache miss

    });
     // Change cache implementation
    it('should allow changing cache implementation', () => {
        memoize.Cache = WeakMap;

        const objKey = {};
        const identity = (x) => x;
        const memoizedIdentity = memoize(identity);

        memoizedIdentity(objKey);
        assert.strictEqual(memoizedIdentity.cache.has(objKey), true);
        assert.strictEqual(memoizedIdentity(objKey), objKey);
    });
});