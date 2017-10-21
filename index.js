const _ = {};

_.identity = function(value) {
  return value;
};

_.first = function(list, n) {
  return typeof list === 'string' 
    ? list.split('').slice(0, n)
    : list.slice(0, n);
}

module.exports = _;