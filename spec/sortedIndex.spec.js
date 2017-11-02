const expect = require('chai').expect;

const _ = require('../src');

describe('#sortedIndex', () => {
  it('uses a binary search to determine the index the value should be inserted to maintain sorted order', () => {
    const list = [10, 20, 30, 40, 50];
    const value = 35;
    const actual = _.sortedIndex(list, value);      
    const expected = 3;
    expect(actual).to.equal(expected);
  });
  it('only works on sorted lists', () => {
    const list = [70, 60, 30, 20, 50];
    const value = 35;
    const actual = _.sortedIndex(list, value);      
    const expected = 4;
    expect(actual).to.equal(expected);
  });
  it('iteratee can be used to compare object values', () => {
    const list = [{name: 'moe', age: 40}, {name: 'curly', age: 60}];
    const value = {name: 'larry', age: 50};
    const iteratee = 'age';
    const actual = _.sortedIndex(list, value, iteratee);      
    const expected = 1;
    expect(actual).to.equal(expected);
  });
  it('compares the result of the iteratee', () => {
    const list = ['call', 'name', 'done'];
    const value = 'larry';
    const iteratee = item => item.slice(1);
    const actual = _.sortedIndex(list, value, iteratee);      
    const expected = 2;
    expect(actual).to.equal(expected);
  });
  it('uses context when passed', () => {
    const list = ['10', '50', '1'];
    const value = 7;
    const iteratee = function (item) {
      return this[item];
    };
    const context = {10: 1, 50: 5, 1: 10};
    const actual = _.sortedIndex(list, value, iteratee, context);      
    const expected = 2;
    expect(actual).to.equal(expected);
  });
});