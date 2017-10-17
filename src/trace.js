import curry from "../dist/curry";

const traceFn = (prefix, label, value) => {
  console.log(`[ ${label} ] ${prefix} ${value}`);
  return value;
};

export default function trace(prefix = "----------->", label, value) {
  return curry(traceFn, prefix, label, value);
}
