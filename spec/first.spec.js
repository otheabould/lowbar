const expect = require('chai').expect;

const _ = require('../src');

describe('#first', () => {
  it('returns the first x number of list items', () => {
    expect(_.first([1, 2, 3, 4], 3)).to.eql([1, 2, 3]);
  });
  it('returns the first x number of string characters', () => {
    expect(_.first(('hello'), 3)).to.eql(['h', 'e', 'l']);
  });
  it('returns undefined for invalid arguments', () => {
    expect(_.first({1: 2})).to.equal(undefined);
    expect(_.first(9)).to.equal(undefined);
    expect(_.first(2)).to.equal(undefined);
    expect(_.first()).to.equal(undefined);
    expect(_.first(true)).to.equal(undefined);
  });
  it('returns the 1st item of an array/string, when n is not passed.', () => {
    expect(_.first([1, 2, 3])).to.equal(1);
    expect(_.first('hi')).to.equal('h');
  });
});