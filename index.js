const _ = {};

_.identity = function(value) {
  return value;
};

_.first = function(list, n) {
  if (list && !n) return list[0];
  return typeof list === 'string' 
    ? list.split('').slice(0, n)
    : Array.isArray(list)
      ? list.slice(0, n)
      : undefined;
};

module.exports = _;