import curry from "../dist/curry";
import compose from "../dist/compose";
import pipe from "../dist/pipe";
import tap from "../dist/tap";
import trace from "../dist/trace";

const map = curry((fn, arr) => arr.map(fn));
const filter = curry((fn, arr) => arr.filter(fn));
const reduce = curry((fn, init, arr) => arr.reduce(fn, init));

export { curry, compose, pipe, tap, trace, map, filter, reduce };
