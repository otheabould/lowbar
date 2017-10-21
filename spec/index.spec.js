const path = require('path');
const expect = require('chai').expect;
const sinon = require('sinon');

const _ = require('../');

describe('_', () => {
  describe('#identity', () => {
    it('returns the argument passed to the function', () => {
      const obj = {a: 1, b: 2, c: 3};
      const arr = [1, 2, 3];
      expect(_.identity(1)).to.equal(1);
      expect(_.identity('hello')).to.equal('hello');
      expect(_.identity(true)).to.equal(true);
      expect(_.identity(obj)).to.equal(obj);
      expect(_.identity(arr)).to.equal(arr);
    });
    it('returns the first argument passed', () => {
      expect(_.identity(1, 2, 3, 4)).to.equal(1);
    });
    it('returns undefined when no value is passed', () => {
      expect(_.identity()).to.equal(undefined);
    });
  });
  describe('#first', () => {
    it('returns the first x number of list items', () => {
      expect(_.first([1, 2, 3, 4], 3)).to.eql([1, 2, 3]);
    });
    it('returns the first x number of string characters', () => {
      expect(_.first(('hello'), 3)).to.eql(['h', 'e', 'l']);
    });
    it('returns undefined for invalid arguments', () => {
      expect(_.first({1: 2})).to.equal(undefined);
      expect(_.first(9)).to.equal(undefined);
      expect(_.first(2)).to.equal(undefined);
      expect(_.first()).to.equal(undefined);
      expect(_.first(true)).to.equal(undefined);
    });
  });
});