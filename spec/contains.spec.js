const expect = require('chai').expect;

const _ = require('../src');

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
});