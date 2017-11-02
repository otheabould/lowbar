const expect = require('chai').expect;

const _ = require('../src');

describe('#where', () => {
  it('returns an array of the objects that match multiple given key value pairs', () => {
    const list = [
      {name: 'oli', age: 24, type: 'human'},
      {name: 'pete', age: 24, type: 'human'},
      {name: 'paul', age: 24, type: 'dolphin'},
      {name: 'tom', age: 500, type: 'dark lord'},
    ];
    const properties = {age: 24, type: 'human'};
    const actual = _.where(list, properties);
    const expected = [
      {name: 'oli', age: 24, type: 'human'},
      {name: 'pete', age: 24, type: 'human'}
    ];
    expect(actual).to.eql(expected);
  });
  it('returns an array of the objects that match a single given key value pair', () => {
    const list = [
      {name: 'oli', age: 24, type: 'human'},
      {name: 'pete', age: 24, type: 'human'},
      {name: 'paul', age: 24, type: 'dolphin'},
      {name: 'tom', age: 500, type: 'dark lord'},
    ];
    const properties = {age: 24};
    const actual = _.where(list, properties);
    const expected = [
      {name: 'oli', age: 24, type: 'human'},
      {name: 'pete', age: 24, type: 'human'},
      {name: 'paul', age: 24, type: 'dolphin'},
    ];
    expect(actual).to.eql(expected);
  });
  it('returns every list item if no properties are given', () => {
    const list = [
      {name: 'oli', age: 24, type: 'human'},
      {name: 'pete', age: 24, type: 'human'},
      {name: 'paul', age: 24, type: 'dolphin'},
      {name: 'tom', age: 500, type: 'dark lord'},
    ];
    const actual = _.where(list);
    const expected = [
      {name: 'oli', age: 24, type: 'human'},
      {name: 'pete', age: 24, type: 'human'},
      {name: 'paul', age: 24, type: 'dolphin'},
      {name: 'tom', age: 500, type: 'dark lord'},
    ];
    expect(actual).to.eql(expected);
  });
});