const expect = require('chai').expect;

const _ = require('../src');

describe('#filter', () => {
  it('filters array items that pass the predicate', () => {
    const isEven = item => item % 2 === 0;
    expect(_.filter([1, 2, 4], isEven)).to.eql([2, 4]);
    expect(_.filter([1, 3, 7], isEven)).to.eql([]);
  });
  it('filters string characters that pass the predicate', () => {
    const isE = item => item === 'e';
    expect(_.filter('abcee', isE)).to.eql(['e', 'e']);
  });
  it('filters object values that pass the predicate', () => {
    const isEven = item => item % 2 === 0;
    expect(_.filter({a: 1, b: 2, c: 3}, isEven)).to.eql([2]);
  });
  it('does not mutate the original array', () => {
    const isE = item => item === 'e';
    expect(_.filter(['e', 'e', 'e'], isE)).to.eql(['e', 'e', 'e']);
    expect(_.filter(['e', 'e', 'e'], isE)).to.not.equal(['e', 'e', 'e']);
  });
  it('does not mutate the original array', () => {
    const isE = item => item === 'e';
    expect(_.filter(['e', 'e', 'e'], isE)).to.eql(['e', 'e', 'e']);
    expect(_.filter(['e', 'e', 'e'], isE)).to.not.equal(['e', 'e', 'e']);
  });
  it('if no predicate is passed, filter truthy values', () => {
    expect(_.filter([0, 1, 2, false])).to.eql([1, 2]);
  });
  it('returns an empty array for invalid arguments', () => {
    expect(_.filter(true)).to.eql([]);
  });
  it('uses context when passed', () => {
    const isContext = function(item, i){
      return item === this[i];
    } ;
    expect(_.filter([1, 2, 3, 4], isContext, [1, 7, 3, 6])).to.eql([1, 3]);
  });
});