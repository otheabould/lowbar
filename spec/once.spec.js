const expect = require('chai').expect;

const _ = require('../src');

describe('#once', () => {
  it('creates a version of a function that can only be called once', () => {
    let num = 0;
    const inc = _.once(() => num += 1);
    inc();
    inc();
    expect(num).to.equal(1);
    expect(inc()).to.equal.undefined;
  });
});