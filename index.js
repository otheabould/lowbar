const _ = {};

_.identity = function(value) {
  return value;
};

_.first = function(list, n) {
  return list.slice(0, n);
}

module.exports = _;