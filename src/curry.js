const filterUndefined = arr => arr.filter(i => typeof i !== "undefined");

export default function curry(fn, ...args) {
  const argsCleared = filterUndefined(args);
  if (argsCleared.length >= fn.length) {
    return fn(...argsCleared);
  } else {
    return (...nextArgs) => curry(fn, ...argsCleared, ...nextArgs);
    // the same as: curry(fn.bind(fn, ...argsCleared), ...argsCleared);
  }
}
