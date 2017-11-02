const expect = require('chai').expect;

const _ = require('../src');

describe('#zip', () => {
  it('merges values with the values of the corresponding array positions', () => {
    const list1 = ['moe', 'larry', 'curly'];
    const list2 = [30, 40, 50];
    const list3 = [true, false, false];
    const actual = _.zip(list1, list2, list3);      
    const expected = [['moe', 30, true], ['larry', 40, false], ['curly', 50, false]];
    expect(actual).to.eql(expected);
  });
  it('iterates through each item in every array', () => {
    const list1 = ['moe', 'larry', 'curly'];
    const list2 = [30, 40, 50];
    const actual = _.zip(list1, list2);      
    const expected = [['moe', 30], ['larry', 40], ['curly', 50]];
    expect(actual).to.eql(expected);
  });
  it('iterates through each item in every array', () => {
    const list1 = ['moe', 'larry', 'curly'];
    const list2 = [30, 40, 50];
    const actual = _.zip(list1, list2);      
    const expected = [['moe', 30], ['larry', 40], ['curly', 50]];
    expect(actual).to.eql(expected);
  });
  it('works on nested arrays when called with apply', () => {
    const list = [['moe', 'larry', 'curly'], [30, 40, 50]];
    const actual = _.zip.apply(null, list);      
    const expected = [['moe', 30], ['larry', 40], ['curly', 50]];
    expect(actual).to.eql(expected);
  });
});