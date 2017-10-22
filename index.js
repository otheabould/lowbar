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
    };
  } else if (typeof list === 'object') {
    for (let key in list) {
      iteratee.call(context, list[key], key, list);
    };
  };
  return list;
};

binarySearch =  function(list, value) {
  let low = 0, high = list.length - 1;
  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    if (list[mid] === value) return mid;
    list[mid] < value 
      ? low = mid + 1
      : high = mid - 1;
  };
  return -1;
};

_.index = function(list, value, isSorted) {
  if (list && list.length) {
    if (isSorted) return binarySearch(list, value);
    for (let i = 0; i < list.length; i++) {
      if (list[i] === value) {
        return i;
      };
    };
  };
  return -1;
};

_.filter = function(list, predicate = _.identity, context = this) {
  const filtered = [];
  _.each(list, (item, i, list) => {
    if (predicate.call(context, item, i, list)) filtered.push(item);
  });
  return filtered;
};

_.reject = function(list, predicate = _.identity, context = this) {
  const rejected = [];
  _.each(list, (item, i, list) => {
    if (!predicate.call(context, item, i, list)) rejected.push(item);
  });
  return rejected;
};

_.uniq = function(list, isSorted) {
  const unique = [];
  _.each(list, (item) => {
    if (_.index(unique, item, isSorted) === -1) unique.push(item);
  });
  return unique;
};

_.map = function(list, iteratee = _.identity, context = this) {
  const mapped = [];
  _.each(list, (item, i, list) => {
    mapped.push(iteratee.call(context, item, i, list))
  });
  return mapped;
};

_.contains = function(list, value, fromIndex) {
  return fromIndex
    ? _.index(list.slice(fromIndex), value) >= 0
    : _.index(list, value) >= 0;
};

_.pluck = function(list, key) {
  return _.map(list, obj => obj[key]);
};

_.reduce = (list, iteratee, memo, context = this) => {
  let memoUnpresent = memo === undefined;
  _.each(list, (item, i, list) => {
    if (memoUnpresent) {
      memo = item;
      memoUnpresent = false;
    } else memo = iteratee.call(context, memo, item, i, list);
  });
  return memo;
};

module.exports = _;