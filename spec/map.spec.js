const expect = require('chai').expect;

const _ = require('../src');

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