const expect = require('chai').expect;

const _ = require('../src');

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