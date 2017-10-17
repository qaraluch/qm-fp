export default function pipe(...fns) {
  return data =>
    fns.reduce(
      (previousValue, currentFunction) => currentFunction(previousValue),
      data
    );
}
