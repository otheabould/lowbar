const expect = require('chai').expect;

const _ = require('../src');

describe('#reject', () => {
  it('filters the array items that do not pass the predicate', () => {
    const isEven = item => item % 2 === 0;
    expect(_.reject([1, 2, 3], isEven)).to.eql([1, 3]);
  });
  it('filters the string characters that do not pass the predicate', () => {
    const isE = item => item === 'e';
    expect(_.reject([1, 2, 'e'], isE)).to.eql([1, 2]);
  });
  it('filters the object values that do not pass the predicate', () => {
    const isE = item => item === 'e';
    expect(_.reject({ 1: 1, 2: 2, 3: 'e' }, isE)).to.eql([1, 2]);
  });
  it('does not mutate the original array', () => {
    const isE = item => item === 'e';
    const arr = ['a', 'b'];
    expect(_.reject(arr, isE)).to.eql(['a', 'b']);
    expect(_.reject(arr, isE)).to.not.equal(['a', 'b']);
  });
  it('if no predicate is passed, filter falsy values', () => {
    expect(_.reject([0, 1, 0])).to.eql([0, 0]);
  });
  it('returs an empty array for invalid arguments', () => {
    expect(_.reject(true)).to.eql([]);
    expect(_.reject(123)).to.eql([]);
    expect(_.reject()).to.eql([]);
  });
  it('returs an empty array for invalid arguments', () => {
    expect(_.reject(true)).to.eql([]);
    expect(_.reject(123)).to.eql([]);
    expect(_.reject()).to.eql([]);
  });
  it('uses context when passed', () => {
    const isContext = function(item, i){
      return item === this[i];
    };
    expect(_.reject([1, 2, 3, 4], isContext, [1, 7, 3, 6])).to.eql([2, 4]);
  });
});