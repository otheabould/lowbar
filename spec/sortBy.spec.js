const expect = require('chai').expect;

const _ = require('../src');

describe('#sortBy', () => {
  it('sorts an array based on what the iteratee returns', () => {
    const list = [1, 2, 3, 4, 5, 6];
    const iteratee = (item) => Math.sin(item);
    const actual = _.sortBy(list, iteratee);
    const expected = [5, 4, 6, 3, 1, 2];
    expect(actual).to.eql(expected);
  });
  it('sorts an array of objects by the key given', () => {
    const list = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
    const iteratee = 'name';
    const actual = _.sortBy(list, iteratee);
    const expected = [{name: 'curly', age: 60}, {name: 'larry', age: 50}, {name: 'moe', age: 40}];
    expect(actual).to.eql(expected);
  });
  it('uses context when passed', () => {
    const list = ['a', 'b'];
    const context = {a: 7, b: 1};
    const iteratee = function(item) {
      return this[item];
    }; 
    const actual = _.sortBy(list, iteratee, context);
    const expected = ['b', 'a'];
    expect(actual).to.eql(expected);
  });
  it('does not mutate the orinal array', () => {
    const list = [1, 2, 3, 4, 5, 6];
    const iteratee = (item) => Math.sin(item);
    _.sortBy(list, iteratee);
    const expected = [5, 4, 6, 3, 1, 2];
    expect(list).to.not.eql(expected);
  });
});