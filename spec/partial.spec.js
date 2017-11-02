const expect = require('chai').expect;
const sinon = require('sinon');

const _ = require('../src');

describe('#partial', () => {
  it('calls the function with a given argument', () => {
    const spy = sinon.spy();
    const sub = _.partial(spy, 6);
    sub();
    const actual = spy.calledWith(6);
    const expected = true;
    expect(actual).to.equal(expected);
  });
  it('calls the function with the previous and current passed arguments', () => {
    const spy = sinon.spy();
    const sub = _.partial(spy, 6);
    sub(8);
    const actual = spy.calledWith(6, 8);
    const expected = true;
    expect(actual).to.equal(expected);
  });
  it('passes the new arguments in place of the _', () => {
    const cube = _.partial(Math.pow, _, 3);
    const actual = cube(4);
    const expected = 64;
    expect(actual).to.equal(expected);
  });
  it('returns the expected outcome', () => {
    const subtract = (a, b) => b - a;
    const subFrom20 = _.partial(subtract, _, 20);
    const actual = subFrom20(5);
    const expected = 15;
    expect(actual).to.equal(expected);
  });
});