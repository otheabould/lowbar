const expect = require('chai').expect;

const _ = require('../src');

describe('#difference', () => {
  it('returns the values from the array that are not present in the others', () => {
    const arr = [1, 2, 3, 4, 5];
    const other1 = [5, 2, 10];
    const actual = _.difference(arr, other1);
    const expected = [1, 3, 4];
    expect(actual).to.eql(expected);
  });
  it('check against any number of other arrays', () => {
    const arr = [1, 2, 3, 4, 5, 7, 8, 9];
    const other1 = [5, 2, 10];
    const other2 = [5, 7];
    const other3 = [9, 3];
    const actual = _.difference(arr, other1, other2, other3);
    const expected = [1, 4, 8];
    expect(actual).to.eql(expected);
  });
});