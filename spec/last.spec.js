const expect = require('chai').expect;

const _ = require('../src');

describe('#last', () => {
  it('returns the first x number of list items', () => {
    expect(_.last([1, 2, 3, 4], 3)).to.eql([2, 3, 4]);
  });
  it('returns the last x number of string characters', () => {
    expect(_.last(('hello'), 3)).to.eql(['l', 'l', 'o']);
  });
  it('returns undefined for invalid arguments', () => {
    expect(_.last({1: 2})).to.equal(undefined);
    expect(_.last(9)).to.equal(undefined);
    expect(_.last(2)).to.equal(undefined);
    expect(_.last()).to.equal(undefined);
    expect(_.last(true)).to.equal(undefined);
  });
  it('returns the last item of an array/string, when n is not passed.', () => {
    expect(_.last([1, 2, 3])).to.equal(3);
    expect(_.last('hi')).to.equal('i');
  });
});