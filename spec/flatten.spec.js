const expect = require('chai').expect;

const _ = require('../src');

describe('#flatten', () => {
  it('concatenates nested arrays into a one dimentional copy', () => {
    const list = [1, [2], [3, [[4]]]];
    const actual = _.flatten(list);      
    const expected = [1, 2, 3, 4];
    expect(actual).to.eql(expected);
  });
  it('flattens a single level if shallow is passed', () => {
    const list = [1, [2], [3, [[4]]]];
    const actual = _.flatten(list, true);      
    const expected = [1, 2, 3, [[4]]];
    expect(actual).to.eql(expected);
  });
});