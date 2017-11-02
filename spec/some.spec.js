const expect = require('chai').expect;

const _ = require('../src');

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