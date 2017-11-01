const _ = {};

_.identity = function (value) {
  return value;
};

_.first = function (list, n) {
  if (list && !n) return list[0];
  if (list && list.length) return Array.isArray(list)
    ? list.slice(0, n)
    : list.split('').slice(0, n);
};

_.last = function (list, n) {
  if (list && !n) return list[list.length - 1];
  if (list && list.length) return Array.isArray(list)
    ? list.slice(- n)
    : list.split('').slice(- n);
};

_.each = function (list, iteratee, context = this) {
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
};

_.index = function (list, value, isSorted) {
  const binarySearch = function (list, value) {
    let low = 0, high = list.length - 1;
    while (low <= high) {
      let mid = Math.floor((low + high) / 2);
      if (list[mid] === value) return mid;
      list[mid] < value
        ? low = mid + 1
        : high = mid - 1;
    }
    return -1;
  };
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

_.filter = function (list, predicate = _.identity, context = this) {
  const filtered = [];
  _.each(list, (item, i, list) => {
    if (predicate.call(context, item, i, list)) filtered.push(item);
  });
  return filtered;
};

_.reject = function (list, predicate = _.identity, context = this) {
  return _.filter.call(context, list, _.negate(predicate));
};

_.uniq = function (list, isSorted) {
  const unique = [];
  _.each(list, (item) => {
    if (_.index(unique, item, isSorted) === -1) unique.push(item);
  });
  return unique;
};

_.map = function (list, iteratee = _.identity, context = this) {
  const mapped = [];
  _.each(list, (item, i, list) => {
    mapped.push(iteratee.call(context, item, i, list));
  });
  return mapped;
};

_.contains = function (list, value, fromIndex) {
  return fromIndex
    ? _.some(list.slice(fromIndex), item => item === value)
    : _.some(list, item => item === value);
};

_.pluck = function (list, key) {
  return _.map(list, obj => obj[key]);
};

_.reduce = function (list, iteratee, memo, context = this) {
  let memoUnpresent = memo === undefined;
  _.each(list, (item, i, list) => {
    if (memoUnpresent) {
      memo = item;
      memoUnpresent = false;
    } else memo = iteratee.call(context, memo, item, i, list);
  });
  return memo;
};

_.every = function (list, predicate = _.identity, context = this) {
  if (list && list.length) {
    for (let i = 0; i < list.length; i++) {
      if (!predicate.call(context, list[i], i, list)) return false;
    }
  } else if (typeof list === 'object') {
    for (let key in list) {
      if (!predicate.call(context, list[key], key, list)) return false;
    }
  }
  return true;
};

_.some = function (list, predicate = _.identity, context = this) {
  if (list && list.length) {
    for (let i = 0; i < list.length; i++) {
      if (predicate.call(context, list[i], i, list)) return true;
    }
  } else if (typeof list === 'object') {
    for (let key in list) {
      if (predicate.call(context, list[key], key, list)) return true;
    }
  }
  return false;
};


_.extends = function (destination) {
  _.each(arguments, source => {
    _.each(source, (value, key) => {
      destination[key] = value;
    });
  });
  return destination;
};

_.defaults = function (destination) {
  _.each(arguments, source => {
    _.each(source, (value, key) => {
      if (destination[key] === undefined)
        destination[key] = value;
    });
  });
  return destination;
};

_.once = function (func) {
  let flag = false;
  return () => {
    if (!flag) {
      flag = true;
      return func.apply(this, arguments);
    }
  };
};

_.negate = function (predicate) {
  return function () {
    return !predicate.apply(this, arguments);
  };
};

_.shuffle = function (list) {
  const arr = _.map(list);
  let m = arr.length, temp, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    temp = arr[m];
    arr[m] = arr[i];
    arr[i] = temp;
  }
  return arr;
};

_.invoke = function (list, method, ...args) {
  return _.map(list, item => item[method] 
    ? item[method].apply(item, args) 
    : undefined);
};

_.sortBy = function (list, iteratee, context = this) {
  const arr = _.map(list);
  const compare = (a, b) => a < b ? - 1 : b < a ? 1 : 0;
  return typeof iteratee === 'string'
  ? arr.sort((a, b) => compare(a[iteratee], b[iteratee]))
  : arr.sort((a, b) => compare(iteratee.call(context, a), iteratee.call(context, b)));
};

_.zip = function (...list) {
  const arrLength = Math.max(...list.map(arr => arr.length));
  const length = Math.max(list.length, arrLength);
  const zipped = Array(length);
  for (let i = 0; i < length; i ++) {
    zipped[i] = _.pluck(list, i);
  }
  return zipped;
};

_.sortedIndex = function (list, value, iteratee = _.identity, context = this) {
  let low = 0, high = list.length - 1;
  while (low < high) {
    let mid = Math.floor((low + high) / 2);
    const compare = typeof iteratee === 'string'
      ? list[mid][iteratee] < value[iteratee]
      : iteratee.call(context, list[mid]) < value;
    compare
      ? low = mid + 1
      : high = mid;
  }
  return low;
};

_.flatten = function (array, shallow) {
  return _.reduce(array, (acc, item) => shallow
  ? acc.concat(item) 
  : Array.isArray(item)
    ? _.flatten(acc.concat(item)) 
    : acc.concat(item), []);
};

_.intersection = function (...list) {
  return _.reduce(list[0], (acc, item) => {
    if (_.every(list, (array) => _.contains(array, item))
      && !_.contains(acc, item)) acc.push(item);
    return acc;
  }, []);
};

_.difference = function (array, ...others) {
  return _.filter(array, item => 
    _.every(others, other => !_.contains(other, item)));
};

_.memoize = function (func) {
  const cache = {};
  return function() {
    const key = arguments[0];
    if (!(key in cache)) {
      cache[key] = func.apply(null, arguments);
    }

    return cache[key];
  };
};

_.delay = function (func, wait, ...args) {
  setTimeout(() => func.apply(null, args), wait);
};

_.where = function (list, properties) {
  return _.filter(list, obj => 
    _.every(properties, (value, key) => obj[key] === value));
};

_.throttle = function (func, wait) {
  let waiting = false, result;
  return function () {
    if (!waiting) {
      waiting = true;
      result = func.apply(this, arguments);
      setTimeout(() => waiting = false, wait);
    }
    return result;
  };
};

_.partial = function (func, ...args) {
  const prevArgs = args;
  return function () {
    const nextArgs = Array.from(arguments);
    const length = prevArgs.length + nextArgs.length;
    const argsResult = _.map(Array(length), () => {
      if (prevArgs.length) {
        let arg = prevArgs.shift();
        return arg !== _ ? arg : nextArgs.shift();
      }
      return nextArgs.shift();
    });
    return func.apply(null, argsResult);
  };
};

module.exports = _;