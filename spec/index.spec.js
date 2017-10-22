const path = require('path');
const expect = require('chai').expect;
const sinon = require('sinon');

const _ = require('../');

describe('_', () => {
  describe('#identity', () => {
    it('returns the argument passed to the function', () => {
      const obj = {a: 1, b: 2, c: 3};
      const arr = [1, 2, 3];
      expect(_.identity(1)).to.equal(1);
      expect(_.identity('hello')).to.equal('hello');
      expect(_.identity(true)).to.equal(true);
      expect(_.identity(obj)).to.equal(obj);
      expect(_.identity(arr)).to.equal(arr);
    });
    it('returns the first argument passed', () => {
      expect(_.identity(1, 2, 3, 4)).to.equal(1);
    });
    it('returns undefined when no value is passed', () => {
      expect(_.identity()).to.equal(undefined);
    });
  });
  describe('#first', () => {
    it('returns the first x number of list items', () => {
      expect(_.first([1, 2, 3, 4], 3)).to.eql([1, 2, 3]);
    });
    it('returns the first x number of string characters', () => {
      expect(_.first(('hello'), 3)).to.eql(['h', 'e', 'l']);
    });
    it('returns undefined for invalid arguments', () => {
      expect(_.first({1: 2})).to.equal(undefined);
      expect(_.first(9)).to.equal(undefined);
      expect(_.first(2)).to.equal(undefined);
      expect(_.first()).to.equal(undefined);
      expect(_.first(true)).to.equal(undefined);
    });
    it('returns the 1st item of an array/string, when n is not passed.', () => {
      expect(_.first([1, 2, 3])).to.equal(1);
      expect(_.first('hi')).to.equal('h');
    });
  });
  describe('#last', () => {
    it('returns the first x number of list items', () => {
      expect(_.last([1, 2, 3, 4], 3)).to.eql([2, 3, 4]);
    });
    it('returns the last x number of string characters', () => {
      expect(_.last(('hello'), 3)).to.eql(['l', 'l', 'o']);
    });
    it('returns undefined for invalid arguments', () => {
      expect(_.last({1: 2})).to.equal(undefined);
      expect(_.last(9)).to.equal(undefined);
      expect(_.last(2)).to.equal(undefined);
      expect(_.last()).to.equal(undefined);
      expect(_.last(true)).to.equal(undefined);
    });
    it('returns the last item of an array/string, when n is not passed.', () => {
      expect(_.last([1, 2, 3])).to.equal(3);
      expect(_.last('hi')).to.equal('i');
    });
  });
  describe('#each', () => {
    it('iteratee gets called with each array item', () => {
      const spy = sinon.spy();
			_.each([1, 2, 3], spy);
			expect(spy.callCount).to.equal(3);
    });
    it('iteratee gets called with each string character', () => {
      const spy = sinon.spy();
       _.each('test', spy);
       expect(spy.callCount).to.equal(4);
    });
    it('iteratee gets called with each object value', () => {
      const spy = sinon.spy();
      _.each({one: 1, two: 2, three: 3}, spy);
      expect(spy.callCount).to.equal(3);
    });
    it('uses context if passed', () => {
      const spy = sinon.spy();
      let sum = 0;
      const getSum = function(item) { sum += context[item] };
      const context = {a: 1, b: 2, c: 3}
      _.each(['a', 'b', 'c'], getSum, context);
      expect(sum).to.equal(6);
    });
  });
  describe('#index', () => {
    it('returns the first index of the passed value', () => {
      expect(_.index([1, 2, 6, 5], 6)).to.equal(2);
      expect(_.index([1, 2, 6, 6], 6)).to.equal(2);
      expect(_.index('abc', 'b')).to.equal(1);
    });
    it('retuns -1 if the value is not present', () => {
      expect(_.index([1, 2, 3, 4], 7)).to.equal(-1);
      expect(_.index('abc', 7)).to.equal(-1);
    });
    it('retuns -1 for invalid arguments', () => {
      expect(_.index([1, 2, 3, 4])).to.equal(-1);
      expect(_.index({ a: 1, b: 2, c: 3, d: 4 }, 3)).to.equal(-1);
      expect(_.index(456, 5)).to.equal(-1);
      expect(_.index(true, 'u')).to.equal(-1);
      expect(_.index()).to.equal(-1);
    });
    it('uses a binary search method if the array is Sorted', () => {
      const sortedArr = [1, 2, 3, 4, 5];
      const arr = [1, 5, 7, 8, 3];
      expect(_.index(arr, 3, true)).to.equal(-1);
      expect(_.index(sortedArr, 3, true)).to.equal(2);
    });
    it('uses a binary search method if the string is Sorted', () => {
      const sortedStr = 'abcd';
      const str = 'aefb';
      expect(_.index(sortedStr, 'c', true)).to.equal(2);
      expect(_.index(str, 'b', true)).to.equal(-1);
    });
  });
  describe('#filter', () => {
    it('filters array items that pass the predicate', () => {
      const isEven = item => item % 2 === 0;
      expect(_.filter([1, 2, 4], isEven)).to.eql([2, 4]);
      expect(_.filter([1, 3, 7], isEven)).to.eql([]);
    });
    it('filters string characters that pass the predicate', () => {
      const isE = item => item === 'e';
      expect(_.filter('abcee', isE)).to.eql(['e', 'e']);
    });
    it('filters object values that pass the predicate', () => {
      const isEven = item => item % 2 === 0;
      expect(_.filter({a: 1, b: 2, c: 3}, isEven)).to.eql([2]);
    });
    it('does not mutate the original array', () => {
      const isE = item => item === 'e';
      expect(_.filter(['e', 'e', 'e'], isE)).to.eql(['e', 'e', 'e']);
      expect(_.filter(['e', 'e', 'e'], isE)).to.not.equal(['e', 'e', 'e']);
    });
    it('does not mutate the original array', () => {
      const isE = item => item === 'e';
      expect(_.filter(['e', 'e', 'e'], isE)).to.eql(['e', 'e', 'e']);
      expect(_.filter(['e', 'e', 'e'], isE)).to.not.equal(['e', 'e', 'e']);
    });
    it('if no predicate is passed, filter truthy values', () => {
      expect(_.filter([0, 1, 2, false])).to.eql([1, 2]);
    });
    it('returns an empty array for invalid arguments', () => {
      expect(_.filter(true)).to.eql([]);
    });
    it('uses context when passed', () => {
      const isContext = function(item, i){
        return item === this[i];
      } ;
      expect(_.filter([1, 2, 3, 4], isContext, [1, 7, 3, 6])).to.eql([1, 3]);
    });
  });
  describe('#reject', () => {
    it('filters the array items that do not pass the predicate', () => {
      const isEven = item => item % 2 === 0;
      expect(_.reject([1, 2, 3], isEven)).to.eql([1, 3]);
    });
    it('filters the string characters that do not pass the predicate', () => {
      const isE = item => item === 'e';
      expect(_.reject([1, 2, 'e'], isE)).to.eql([1, 2]);
    });
    it('filters the object values that do not pass the predicate', () => {
      const isE = item => item === 'e';
      expect(_.reject({ 1: 1, 2: 2, 3: 'e' }, isE)).to.eql([1, 2]);
    });
    it('does not mutate the original array', () => {
      const isE = item => item === 'e';
      const arr = ['a', 'b'];
      expect(_.reject(arr, isE)).to.eql(['a', 'b']);
      expect(_.reject(arr, isE)).to.not.equal(['a', 'b']);
    });
    it('if no predicate is passed, filter falsy values', () => {
      expect(_.reject([0, 1, 0])).to.eql([0, 0]);
    });
    it('returs an empty array for invalid arguments', () => {
      expect(_.reject(true)).to.eql([]);
      expect(_.reject(123)).to.eql([]);
      expect(_.reject()).to.eql([]);
    });
    it('returs an empty array for invalid arguments', () => {
      expect(_.reject(true)).to.eql([]);
      expect(_.reject(123)).to.eql([]);
      expect(_.reject()).to.eql([]);
    });
    it('uses context when passed', () => {
      const isContext = function(item, i){
        return item === this[i];
      };
      expect(_.reject([1, 2, 3, 4], isContext, [1, 7, 3, 6])).to.eql([2, 4]);
    });
  });
  describe('#uniq', () => {
    it('filters the duplicates from an array', () => {
      expect(_.uniq([1, 1, 2, 3, 3])).to.eql([1, 2, 3]);
    });
    it('filters the duplicates from a string', () => {
      expect(_.uniq('test')).to.eql(['t', 'e', 's']);
    });
    it('does not mutate the original array', () => {
      expect(_.uniq([1, 2, 3])).to.eql([1, 2, 3]);
      expect(_.uniq([1, 2, 3])).to.not.equal([1, 2, 3]);
    });
    it('uses a binary search to check if the result contains the current if isSorted is true', () => {
      expect(_.uniq([1, 2, 3, 5, 6, 7], true)).to.eql([1, 2, 3, 5, 6, 7]);
      expect(_.uniq([1, 7, 8, 3, 3, 1], true)).to.not.eql([1, 7, 8, 3]);
    });
    it('uses a binary search to check if the result contains the current if isSorted is true', () => {
      expect(_.uniq([1, 2, 3, 5, 6, 7], true)).to.eql([1, 2, 3, 5, 6, 7]);
      expect(_.uniq([1, 7, 8, 3, 3, 1], true)).to.not.eql([1, 7, 8, 3]);
    });
  });
  describe('#map', () => {
    it('returns a new array of the same length', () => {
      const arr = [1, 2, 3];
      expect(_.map(arr).length).to.equal(3);
      expect(_.map(arr)).to.not.equal(arr);
    });
    it('returns a new array with transformed array items', () => {
      const arr = [1, 2, 3];
      const double = item => item * 2;
      expect(_.map(arr, double)).to.eql([2, 4, 6]);
    });
    it('returns a new array with transformed object values', () => {
      const obj = { a: 1, b: 2, c: 3 };
      const double = item => item * 2;
      expect(_.map(obj, double)).to.eql([2, 4, 6]);
    });
    it('returns a new array with transformed string characters', () => {
      const str = 'abc';
      const plusA = item => item + 'A';
      expect(_.map(str, plusA)).to.eql(['aA', 'bA', 'cA']);
    });
    it('returns an empty array for invalid arguments', () => {
      expect(_.map(true)).to.eql([]);
      expect(_.map(99)).to.eql([]);
    });
    it('uses context when passed as an arguments', () => {
      const arr = [1, 2, 3, 4];
      const context = [2, 2, 2, 2];
      const iteratee = function(item, i) {
        return item * this[i];
      }
      expect(_.map(arr, iteratee, context)).to.eql([2, 4, 6, 8]);
    });
  });
  describe('#contains', () => {
    it('true if for an array containing the value', () => {
      expect(_.contains([1, 3, 4], 3)).to.equal(true);
    });
  });
});