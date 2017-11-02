const expect = require('chai').expect;

const _ = require('../src');

describe('#shuffle', () => {
  it('returns a shuffled copy of the array', () => {
    const list = [1, 2, 3, 4, 5, 6];
    const shuffled = _.shuffle(list);
    expect(shuffled.length).to.equal(list.length);
    expect(shuffled).to.not.eql(list);
  });
  it('returns a shuffled copy of the string in an array', () => {
    const list = '123456';
    const shuffled = _.shuffle(list);
    expect(shuffled.length).to.equal(list.length);
    expect(shuffled).to.not.eql(list);
  });
  it('returns a shuffled copy of the object values in an array', () => {
    const list = {a: 1, b: 2, c: 3, d: 4, e: 5};
    const shuffled = _.shuffle(list);
    expect(shuffled.length).to.equal(Object.values(list).length);
    expect(shuffled).to.not.eql(list);
  });
  it('does not mutate the original array', () => {
    const list = [1, 2, 3, 4, 5, 6];
    _.shuffle(list);
    expect(list).to.eql([1, 2, 3, 4, 5, 6]);
  });
});