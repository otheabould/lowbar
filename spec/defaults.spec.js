const expect = require('chai').expect;

const _ = require('../src');

describe('#defaults', () => {
  it('returns the first argument', () => {
    const destination = {};
    const source = {};
    expect(_.defaults(destination, source)).to.equal(destination);
  });
  it('copies the source\'s keys and values if they do not exist inside the destination', () => {
    const destination = {};
    const source = {a: 1, b: 2};
    expect(_.defaults(destination, source)).to.eql({a:1, b: 2});
  });
  it('does not overwrite properties found in destination', () => {
    const destination = {a: 2};
    const source = {a: 1};
    expect(_.defaults(destination, source)).to.eql({a:2});
  });
  it('keeps the first instance found of a key', () => {
    const destination = {};
    const source1 = {a: 1, b: 2};
    const source2 = {a: 2, b: 3};
    expect(_.defaults(destination, source1, source2)).to.eql(source1);
  });
  it('uses the original object references found in source', () => {
    const destination = {a: 1};
    const ref = {a: 2, b: 1};
    const source = {e: 6, ref};
    expect(_.defaults(destination, source).ref).to.equal(ref);
  });
});