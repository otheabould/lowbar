const expect = require('chai').expect;
const sinon = require('sinon');

const _ = require('../src');

describe('#each', () => {
  it('iteratee gets called with each array item', () => {
    const spy = sinon.spy();
    _.each([1, 2, 3], spy);
    expect(spy.callCount).to.equal(3);
  });
  it('iteratee gets called with each string character', () => {
    const spy = sinon.spy();
    _.each('test', spy);
    expect(spy.callCount).to.equal(4);
  });
  it('iteratee gets called with each object value', () => {
    const spy = sinon.spy();
    _.each({one: 1, two: 2, three: 3}, spy);
    expect(spy.callCount).to.equal(3);
  });
  it('uses context if passed', () => {
    let sum = 0;
    const getSum = function(item) { sum += context[item]; };
    const context = {a: 1, b: 2, c: 3};
    _.each(['a', 'b', 'c'], getSum, context);
    expect(sum).to.equal(6);
  });
  it('does not error without an iteratee passed', () => {
    var expected = _.each(['a', 'b', 'c']);
    expect(expected).to.eql(['a', 'b', 'c']);
  });
});