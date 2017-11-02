const expect = require('chai').expect;

const _ = require('../src');

describe('#pluck', () => {
  it('populates an array with undefined if the list passed isn\'t an array of objects', () => {
    expect(_.pluck(['hi', 'hi'])).to.eql([undefined,undefined]);
    expect(_.pluck([1,2,3])).to.eql([undefined,undefined,undefined]);
  });
  it('returns an array with the specified property values', () => {
    const list = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
    expect(_.pluck(list, 'name')).to.eql(['moe', 'larry', 'curly']);
  });
});