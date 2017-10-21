const _ = {};

_.identity = function(value) {
  return value;
};

_.first = function(list, n) {
  if (list && !n) return list[0];
  return Array.isArray(list) return list.slice(0, n);
  if (typeof list === 'string') return list.split('').slice(0, n);
};

_.last = function(list, n) {
  if (list && !n) return list[list.length - 1];
  if (Array.isArray(list)) return list.slice(- n);
  if (typeof list === 'string') return list.split('').slice(- n);
};

module.exports = _;