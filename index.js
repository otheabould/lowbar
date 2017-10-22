const _ = {};

_.identity = function(value) {
  return value;
};

_.first = function(list, n) {
  if (list && !n) return list[0];
  if (list && list.length) return Array.isArray(list)
    ? list.slice(0, n)
    : list.split('').slice(0, n);
};

_.last = function(list, n) {
  if (list && !n) return list[list.length - 1];
  if (list && list.length) return Array.isArray(list) 
  ? list.slice(- n)
  : list.split('').slice(- n);
};

_.each = function(list, iteratee, context = this) {
  if (list && list.length) {
    for (let i = 0; i < list.length; i++) {
      iteratee.call(context, list[i], i, list);
    }
  } else if (typeof list === 'object') {
    for (let key in list) {
      iteratee.call(context, list[key], key, list);
    }
  }
  return list;
}

_.index = (list, value, isSorted) => {
  if (Array.isArray(list) || typeof list === 'string') {
    for (let i = 0; i < list.length; i++) {
      if (list[i] === value) {
        return i;
      }
    }
  }
  return -1;
};

//use identity in filter if predicate is not present
module.exports = _;