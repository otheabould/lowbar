const expect = require('chai').expect;

const _ = require('../src');

describe('#intersection', () => {
  it('returns an array containing the common values from each array given', () => {
    const arr1 = [1, 2, 3];
    const arr2 = [101, 2, 1, 10];
    const arr3 = [2, 1];
    const actual = _.intersection(arr1, arr2, arr3);
    const expected = [1, 2];
    expect(actual).to.eql(expected);
  });
  it('only keeps one from duplicate values', () => {
    const arr1 = [1, 1, 2, 3];
    const arr2 = [101, 1, 2, 1, 10];
    const arr3 = [2, 1, 1];
    const actual = _.intersection(arr1, arr2, arr3);
    const expected = [1, 2];
    expect(actual).to.eql(expected);
  });
});