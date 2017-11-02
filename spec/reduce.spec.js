const expect = require('chai').expect;

const _ = require('../src');

describe('#reduce', () => {
  
  const sum = (acc, num) => acc + num;
  const concat = (acc, item) => acc.concat(item);
  const createCount = (acc, item) => {
    acc.hasOwnProperty(item) ? acc[item] += 1 : acc[item] = 1;
    return acc;
  };
  
  it('is a function', () => {
    expect(_.reduce).to.be.a('function');
  });
  it('calculates the sum of an array of numbers with accumulator present', () => {
    expect(_.reduce([1, 2, 3], sum, 0)).to.equal(6);
  });
  it('calculates the sum of an array of numbers without accumulator present', () => {
    expect(_.reduce([1, 2, 3], sum)).to.equal(6);
  });
  it('calculates the sum of object values with accumulator present', () => {
    expect(_.reduce({a: 1, b: 2, c: 3}, sum, 0)).to.equal(6);
  });
  it('calculates the sum of object values without accumulator present', () => {
    expect(_.reduce({a: 1, b: 2, c: 3}, sum)).to.equal(6);
  });
  it('concatinates arrays', () => {
    expect(_.reduce([[1], [2], [3]], concat)).to.eql([1, 2, 3]);
  });
  it('creates a count object', () => {
    expect(_.reduce(['a', 'b', 'a', 'c', 'c'], createCount, {})).to.eql({a: 2, b: 1, c: 2});
  });
  it('uses context when present', () => {
    const arr = [1, 1, 1];
    const context = [1, 1, 1];
    const iteratee = function(acc, item, i) {
      return acc + item + this[i];
    };
    expect(_.reduce(arr, iteratee, 0, context)).to.equal(6);
  });
});