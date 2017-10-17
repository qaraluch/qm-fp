import curry from "../src/curry";
import compose from "../src/compose";
import pipe from "../src/pipe";
import tap from "../src/tap";
import trace from "../src/trace";

const map = curry((fn, arr) => arr.map(fn));
const filter = curry((fn, arr) => arr.filter(fn));
const reduce = curry((fn, init, arr) => arr.reduce(fn, init));

export { curry, compose, pipe, tap, trace, map, filter, reduce };
