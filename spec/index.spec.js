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
      let sum = 0;
      const getSum = function(item) { sum += context[item]; };
      const context = {a: 1, b: 2, c: 3};
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
      };
      expect(_.map(arr, iteratee, context)).to.eql([2, 4, 6, 8]);
    });
  });
  describe('#contains', () => {
    it('returns true if for an array containing the value', () => {
      expect(_.contains([1, 3, 4], 3)).to.equal(true);
    });
    it('returns true if for a string containing the value', () => {
      expect(_.contains('hello', 'h')).to.equal(true);
    });
    it('works for objects', () => {
      expect(_.contains({1: 'h', 2: 'e', 3: 'l', 4: 'l', 5: 'o'}, 'h')).to.equal(true);
      expect(_.contains({1: 'h', 2: 'e', 3: 'l', 4: 'o'}, 'p')).to.equal(false);
    });
  });
  it('returns false if the list does not contain the value', () => {
    expect(_.contains('hello', 'f')).to.equal(false);
    expect(_.contains([1, 2, 3], 7)).to.equal(false);
  });
  it('returns false for invalid arguments', () => {
    expect(_.contains(true)).to.equal(false);
    expect(_.contains(123, 7)).to.equal(false);
  });
  it('starts fromIndex if passed as arguments', () => {
    expect(_.contains([1, 2, 3, 4, 5, 6, 7], 1, 4)).to.equal(false);
  });
  describe('#pluck', () => {
    it('populates an array with undefined if the list passed isn\'t an array of objects', () => {
      expect(_.pluck(['hi', 'hi'])).to.eql([undefined,undefined]);
      expect(_.pluck([1,2,3])).to.eql([undefined,undefined,undefined]);
    });
    it('returns an array with the specified property values', () => {
      const list = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
      expect(_.pluck(list, 'name')).to.eql(['moe', 'larry', 'curly']);
    });
  });
  describe('#pluck', () => {
    it('populates an array with undefined if the list passed isn\'t an array of objects', () => {
      expect(_.pluck(['hi', 'hi'])).to.eql([undefined,undefined]);
      expect(_.pluck([1,2,3])).to.eql([undefined,undefined,undefined]);
    });
    it('returns an array with the specified property values', () => {
      const list = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
      expect(_.pluck(list, 'name')).to.eql(['moe', 'larry', 'curly']);
    });
  });
  describe('#reduce', () => {
    const sum = (acc, num) => acc + num;
    const concat = (acc, item) => acc.concat(item);
    const createCount = (acc, item) => {
      acc.hasOwnProperty(item) ? acc[item] += 1 : acc[item] = 1;
      return acc;
    };
    
    it('is a function', () => {
      expect(_.reduce).to.be.a('function');
    });
    it('calculates the sum of an array of numbers with accumulator present', () => {
      expect(_.reduce([1, 2, 3], sum, 0)).to.equal(6);
    });
    it('calculates the sum of an array of numbers without accumulator present', () => {
      expect(_.reduce([1, 2, 3], sum)).to.equal(6);
    });
    it('calculates the sum of object values with accumulator present', () => {
      expect(_.reduce({a: 1, b: 2, c: 3}, sum, 0)).to.equal(6);
    });
    it('calculates the sum of object values without accumulator present', () => {
      expect(_.reduce({a: 1, b: 2, c: 3}, sum)).to.equal(6);
    });
    it('concatinates arrays', () => {
      expect(_.reduce([[1], [2], [3]], concat)).to.eql([1, 2, 3]);
    });
    it('creates a count object', () => {
      expect(_.reduce(['a', 'b', 'a', 'c', 'c'], createCount, {})).to.eql({a: 2, b: 1, c: 2});
    });
    it('uses context when present', () => {
      const arr = [1, 1, 1];
      const context = [1, 1, 1];
      const iteratee = function(acc, item, i) {
        return acc + item + this[i];
      };
      expect(_.reduce(arr, iteratee, 0, context)).to.equal(6);
    });
  });
  describe('#every', () => {
    it('returns true when every string array item the predicate', () => {
      const isEven = item => item % 2 === 0;
      expect(_.every([2, 4, 6, 8], isEven)).to.equal(true);
    });
    it('returns false when a list item fails the predicate', () => {
      const isEven = item => item % 2 === 0;
      expect(_.every([2, 4, 6, 8, 9], isEven)).to.equal(false);
    });
    it('returns true when every object value passes the predicate', () => {
      const isEven = item => item % 2 === 0;
      expect(_.every({a: 2, b: 4, c: 6}, isEven)).to.equal(true);
    });
    it('returns false when a object value fails the predicate', () => {
      const isEven = item => item % 2 === 0;
      expect(_.every({a: 2, b: 4, c: 5}, isEven)).to.equal(false);
    });
    it('returns true when every string character passes the predicate', () => {
      const isE = item => item === 'e';
      expect(_.every('eeeee', isE)).to.equal(true);
    });
    it('returns false when a string character fails the predicate', () => {
      const isE = item => item === 'e';
      expect(_.every('ea', isE)).to.equal(false);
    });
    it('uses context when passed', () => {
      const arr = [1, 2, 3, 4];
      const context = [1, 2, 3, 4];
      const isEqual = function(item, i) {
        return item === this[i];
      };
      expect(_.every(arr, isEqual, context)).to.equal(true);
    });
    it('predicate === _.identity if not present', () => {
      expect(_.every('ea')).to.equal(true);
      expect(_.every([0])).to.equal(false);
    });
  });
  describe('#some', () => {
    it('returns false if no list is passed', () => {
      expect(_.some()).to.equal(false);
    });
    it('returns true if a list item passes the predicate', () => {
      const isEven = item => item % 2 === 0;
      expect(_.some([2, 4, 6, 9], isEven)).to.equal(true);
    });
    it('returns false when 0 list items pass the predicate', () => {
      const isEven = item => item % 2 === 0;
      expect(_.some([7, 9], isEven)).to.equal(false);
    });
    it('returns true if an object value passes the predicate', () => {
      const isEven = item => item % 2 === 0;
      expect(_.some({a: 2, b: 4, c: 6}, isEven)).to.equal(true);
      expect(_.some({a: 2, b: 4, c: 5}, isEven)).to.equal(true);
    });
    it('returns false when 0 object values pass the predicate', () => {
      const isEven = item => item % 2 === 0;
      expect(_.some({a: 1, b: 3, c: 5}, isEven)).to.equal(false);
    });
    it('returns true if a string character passes the predicate', () => {
      const isE = item => item  === 'e';
      expect(_.some('hhhe', isE)).to.equal(true);
    });
    it('returns false when 0 string characters pass the predicate', () => {
      const isE = item => item  === 'e';
      expect(_.some('hhh', isE)).to.equal(false);
    });
    it('uses context when passed', () => {
      const arr = [1, 2, 3, 4];
      const context = [1];
      const isEqual = function(item, i) {
        return item === this[i];
      };
      expect(_.some(arr, isEqual, context)).to.equal(true);
    });
    it('predicate === _.identity if not present', () => {
      expect(_.some(false)).to.equal(false);
      expect(_.some([0, 1])).to.equal(true);
    });
  });
  describe('#extends', () => {
    it('returns the first argument', () => {
      const destination = {};
      const source = {};
      expect(_.extends(destination, source)).to.equal(destination);
    });
    it('extends an object with the atributes of the sources', () => {
      const destination = {};
      const source = {a: 1, b: 2};
      expect(_.extends(destination, source)).to.eql({a:1, b: 2});
    });
    it('overwrites properties found on the destination', () => {
      const destination = {a: 1};
      const source = {a: 2, b: 1};
      expect(_.extends(destination, source)).to.eql({a:2, b: 1});
    });
    it('overwrites properties that have already been passed to the destination from source', () => {
      const destination = {a: 1};
      const source1 = {a: 2, b: 1};
      const source2 = {a: 3, b: 2};
      expect(_.extends(destination, source1, source2)).to.eql(source2);
    });
    it('concats objects into one destination, keeping the last instance of any duplicate properties', () => {
      const destination = {a: 1};
      const source1 = {a: 2, b: 1};
      const source2 = {a: 3, b: 2};
      const source3 = {c: 7, d: 1};
      const expected = {a: 3, b: 2, c: 7, d: 1};
      expect(_.extends(destination, source1, source2, source3)).to.eql(expected);
    });
    it('uses the original object references found in source', () => {
      const destination = {a: 1};
      const ref = {a: 2, b: 1};
      const source = {e: 6, ref};
      expect(_.extends(destination, source).ref).to.equal(ref);
    });
  });
  describe('#defaults', () => {
    it('returns the first argument', () => {
      const destination = {};
      const source = {};
      expect(_.defaults(destination, source)).to.equal(destination);
    });
    it('copies the source\'s keys and values if they do not exist inside the destination', () => {
      const destination = {};
      const source = {a: 1, b: 2};
      expect(_.defaults(destination, source)).to.eql({a:1, b: 2});
    });
    it('does not overwrite properties found in destination', () => {
      const destination = {a: 2};
      const source = {a: 1};
      expect(_.defaults(destination, source)).to.eql({a:2});
    });
    it('keeps the first instance found of a key', () => {
      const destination = {};
      const source1 = {a: 1, b: 2};
      const source2 = {a: 2, b: 3};
      expect(_.defaults(destination, source1, source2)).to.eql(source1);
    });
    it('uses the original object references found in source', () => {
      const destination = {a: 1};
      const ref = {a: 2, b: 1};
      const source = {e: 6, ref};
      expect(_.defaults(destination, source).ref).to.equal(ref);
    });
  });
  describe('#once', () => {
    it('creates a version of a function that can only be called once', () => {
      let num = 0;
      const inc = _.once(() => num += 1);
      inc();
      inc();
      expect(num).to.equal(1);
      expect(inc()).to.equal.undefined;
    });
    describe('#negate', () => {
      it('returns a negated version of a predicate function', () => {
        const isEven = (n) => n % 2 === 0;
        const negated = _.negate(isEven);
        const list = [2, 3, 4];
        expect(_.filter(list, negated)).to.eql([3]);
      });
    });
  });
  describe('#shuffle', () => {
    it('returns a shuffled copy of the array', () => {
      const list = [1, 2, 3, 4, 5, 6];
      const shuffled = _.shuffle(list);
      expect(shuffled.length).to.equal(list.length);
      expect(shuffled).to.not.eql(list);
    });
    it('returns a shuffled copy of the string in an array', () => {
      const list = '123456';
      const shuffled = _.shuffle(list);
      expect(shuffled.length).to.equal(list.length);
      expect(shuffled).to.not.eql(list);
    });
    it('returns a shuffled copy of the object values in an array', () => {
      const list = {a: 1, b: 2, c: 3, d: 4, e: 5};
      const shuffled = _.shuffle(list);
      expect(shuffled.length).to.equal(Object.values(list).length);
      expect(shuffled).to.not.eql(list);
    });
  });
});