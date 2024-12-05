import assert from 'assert';
import every from '../src/every.js';

describe('Array', function () {
    describe('#every()', function () {
        it('should return true when giving an empty array', function () {
            assert.equal(every([], Boolean), true);
        });

        it('should return true even when null or undefined are the arrays', function () {
            assert.equal(every(null, ()=>true), true);
            assert.equal(every(undefined, ()=>true), true);
        })
      
        it('should return true when giving an array of truthy values with Boolean predicate', function () {
            assert.equal(every([1, true, 'yes'], Boolean), true);
        });

        it('should return false when one value is null with Boolean predicate', function () {
            assert.equal(every([1, true, null, 'yes'], Boolean), false);
        });

        /* This should probably fail or throw typeError... What does every even do if given object is not an array?
        Strings can be arrays of chars but the rest...
        it('should return false or TypeError when passed array is not an array with Boolean predicate', function () {
            assert.equal(every(4, Boolean), false);
            assert.equal(every('mystring', Boolean), false);
            assert.equal(every({apple: 'hate'}, Boolean), false);
        });
        */

        it('should stop iterating at first element that fails predicate', function () {
            let iters = 0
            every([2, 4, 7, 16], (n) => {
                iters++;
                return n % 2 === 0
            });
            assert.equal(iters, 3)
        });
        it('should handle non-function predicates gracefully', () => {
            assert.throws(() => every([1, 2, 3], null), TypeError);
            assert.throws(() => every([1, 2, 3], undefined), TypeError);
            assert.throws(() => every([1, 2, 3], 123), TypeError);
        });

        it('should work with an index-aware predicate', () => {
            const result = every([1, 2, 3], (value, index) => value > index);
            assert.equal(result, true)
        });
        
        it('should work with an array-aware predicate', () => {
            const result = every([1, 2, 3], (value, index, array) => array.length > index);
            assert.equal(result, true)
        });
        it('should return true for arrays containing only one element that satisfies the predicate', () => {
            const isEven = (n) => n % 2 === 0;
            assert.strictEqual(every([2], isEven), true);
        });
      
        it('should return false for arrays containing only one element that does not satisfy the predicate', () => {
            const isEven = (n) => n % 2 === 0;
            assert.strictEqual(every([3], isEven), false);
        });
      
        it('should handle sparse arrays', () => {
            const isDefined = (v) => v !== undefined;
            const sparseArray = [1, , 3]; // Sparse array
            assert.strictEqual(every(sparseArray, isDefined), false);
        });
    });
});
