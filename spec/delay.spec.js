const expect = require('chai').expect;
const sinon = require('sinon');

const _ = require('../src');

describe('#delay', () => {
  it('calls the given function after the wait period', () => {
    const spy = sinon.spy();
    const clock = sinon.useFakeTimers();
    _.delay(spy, 100);
    clock.tick(99);
    expect(spy).to.not.have.been.called;
    clock.tick(2);
    expect(spy).to.have.been.calledOnce;
  });
  it('calls the delayed function with the given arguments', () => {
    const spy = sinon.spy();
    const clock = sinon.useFakeTimers();
    _.delay(spy, 100, 1, 2);
    clock.tick(100);
    expect(spy.calledWith(1, 2)).to.be.true;
  });
});