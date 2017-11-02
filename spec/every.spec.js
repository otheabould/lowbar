const expect = require('chai').expect;

const _ = require('../src');

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