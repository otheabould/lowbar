const expect = require('chai').expect;

const _ = require('../src');

describe('#extends', () => {
  it('returns the first argument', () => {
    const destination = {};
    const source = {};
    expect(_.extends(destination, source)).to.equal(destination);
  });
  it('extends an object with the atributes of the sources', () => {
    const destination = {};
    const source = {a: 1, b: 2};
    expect(_.extends(destination, source)).to.eql({a:1, b: 2});
  });
  it('overwrites properties found on the destination', () => {
    const destination = {a: 1};
    const source = {a: 2, b: 1};
    expect(_.extends(destination, source)).to.eql({a:2, b: 1});
  });
  it('overwrites properties that have already been passed to the destination from source', () => {
    const destination = {a: 1};
    const source1 = {a: 2, b: 1};
    const source2 = {a: 3, b: 2};
    expect(_.extends(destination, source1, source2)).to.eql(source2);
  });
  it('concats objects into one destination, keeping the last instance of any duplicate properties', () => {
    const destination = {a: 1};
    const source1 = {a: 2, b: 1};
    const source2 = {a: 3, b: 2};
    const source3 = {c: 7, d: 1};
    const expected = {a: 3, b: 2, c: 7, d: 1};
    expect(_.extends(destination, source1, source2, source3)).to.eql(expected);
  });
  it('uses the original object references found in source', () => {
    const destination = {a: 1};
    const ref = {a: 2, b: 1};
    const source = {e: 6, ref};
    expect(_.extends(destination, source).ref).to.equal(ref);
  });
});