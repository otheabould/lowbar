const expect = require('chai').expect;
const sinon = require('sinon');

const _ = require('../src');

describe('#memoize', () => {
  it('can be used as a usual function', () => {
    const add = (a, b) => a + b;
    const memoizeAdd = _.memoize(add);
    const actual =  memoizeAdd(1, 2);
    const expected =  3;
    expect(actual).to.equal(expected);
  });
  it('can only be called once', () => {
    const spy = sinon.spy(() => 'Dummy output');
    const memoizeSpy = _.memoize(spy);
    memoizeSpy(10);
    expect(spy).to.have.been.calledOnce;
    memoizeSpy(10);
    expect(spy).to.have.been.calledOnce;
  });
});