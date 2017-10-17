export default function compose(...fns) {
  return data =>
    fns.reduceRight(
      (previousValue, currentFunction) => currentFunction(previousValue),
      data
    );
}
