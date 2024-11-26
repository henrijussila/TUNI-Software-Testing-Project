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

        it('should return true when one value is null with Boolean predicate', function () {
            assert.equal(every([1, true, null, 'yes'], Boolean), false);
        });

        it('should return true if all elements pass given predicate', function () {
            assert.equal(every([2, 4, 8, 16], (n) => n % 2 === 0), true);
        });

        it('should return false if first element fails given predicate', function () {
            assert.equal(every([1, 4, 8, 16], (n) => n % 2 === 0), false);
        });

        it('should return false if last element fails given predicate', function () {
            assert.equal(every([2, 4, 8, 15], (n) => n % 2 === 0), false);
        });

        it('should stop iterating at first element that fails predicate', function () {
            let iters = 0
            every([2, 4, 7, 16], (n) => {
                iters++;
                return n % 2 === 0
            });
            assert.equal(iters, 3)
        });

        it('should work with an index-aware predicate', () => {
            const result = every([1, 2, 3], (value, index) => value > index);
            assert.equal(result, true)
        });
        
        it('should work with an array-aware predicate', () => {
            const result = every([1, 2, 3], (value, index, array) => array.length > index);
            assert.equal(result, true)
        });
    });
});
