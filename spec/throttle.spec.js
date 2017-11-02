const expect = require('chai').expect;
const sinon = require('sinon');

const _ = require('../src');

describe('#throttle', () => {
  it('calls the passed function', () => {
    const spy = sinon.spy();
    const throttled = _.throttle(spy, 100);
    expect(spy.callCount).to.equal(0);
    throttled(10);
    expect(spy.callCount).to.equal(1);
    expect(spy.args).to.eql([[10]]);
  });
  it('calls the function once in the specified wait time', () => {
    const spy = sinon.spy();
    const clock = sinon.useFakeTimers();
    const throttled = _.throttle(spy, 100);
    throttled(10);
    clock.tick(90);
    expect(spy.callCount).to.equal(1);
    throttled(10);
    expect(spy.callCount).to.equal(1);
  });
  it('can call the function again after the timer runs out', () => {
    const spy = sinon.spy();
    const clock = sinon.useFakeTimers();
    const throttled = _.throttle(spy, 100);
    throttled(10);
    expect(spy.callCount).to.equal(1);
    clock.tick(50);
    throttled(10);
    expect(spy.callCount).to.equal(1);
    clock.tick(50);
    throttled(10);
    expect(spy.callCount).to.equal(2);
    clock.tick(50 );
    throttled(10);
    expect(spy.callCount).to.equal(2);
  });
});