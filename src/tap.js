import curry from "../dist/curry";

const tapFn = (fn, value) => {
  fn(value); // side effect
  return value;
};

export default function tap(fn, value) {
  return curry(tapFn, fn, value);
}
