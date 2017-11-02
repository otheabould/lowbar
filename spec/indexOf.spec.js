const expect = require('chai').expect;

const _ = require('../src');

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