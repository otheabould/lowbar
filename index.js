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
      }
    }
  }
  return -1;
};

//use identity in filter if predicate is not present
_.filter = function(list, predicate, context) {
  const result = [];
  _.each(list, (item, index, i, list) => {
    if (predicate(item, index, i, list)) result.push(item);
  });
  return result;
}

module.exports = _;