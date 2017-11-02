const expect = require('chai').expect;

const _ = require('../src');

describe('#invoke', () => {
  it('invokes the given method on each list item', () => {
    const list = [[5, 1, 7], [3, 2, 1]];
    const method = 'sort';
    const actual = _.invoke(list, method);
    const expected = [[1, 5, 7], [1, 2, 3]];
    expect(actual).to.eql(expected);
  });
  it('invokes the given method with any arguments passed', () => {
    const list = [[5, 1, 7], [3, 2, 1]];
    const method = 'join';
    const args = '';
    const actual = _.invoke(list, method, args);
    const expected = ['517', '321'];
    expect(actual).to.eql(expected);
  });
  it('returns undefined for invalid inputs', () => {
    const list = [{a: 5, b: 1, c: 7}, [3, 2, 1]];
    const method = 'join';
    const args = '';
    const actual = _.invoke(list, method, args);
    const expected = [undefined, '321'];
    expect(actual).to.eql(expected);
  });
});