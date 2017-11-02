const expect = require('chai').expect;

const _ = require('../src');

describe('#negate', () => {
  it('returns a negated version of a predicate function', () => {
    const isEven = (n) => n % 2 === 0;
    const negated = _.negate(isEven);
    const list = [2, 3, 4];
    expect(_.filter(list, negated)).to.eql([3]);
  });
});