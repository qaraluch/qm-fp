import test from "ava";
import curry from "../dist/curry";
import compose from "../dist/compose";
import pipe from "../dist/pipe";
import tap from "../dist/tap";
import trace from "../dist/trace";
import { map } from "../dist/index";
import { filter } from "../dist/index";
import { reduce } from "../dist/index";

// fn to curry for tests
const multiply = (n, m) => n * m;
const add = (n, m) => n + m;

test("curry() - is function", t => {
  const msg = "should be a function ";
  const actual = typeof curry === "function";
  const expected = true;
  t.is(actual, expected, msg);
});

test("curry() - classic - feeds args one at the time", t => {
  const msg = "should return result of multiply 5 and 2 = 10";
  const curriedMultiplay = curry(multiply);
  const multiplayBy5 = curriedMultiplay(5);
  const actual = multiplayBy5(2);
  const expected = 10;
  t.is(actual, expected, msg);
});

test("curry() - feeds args in ()() style", t => {
  const msg = "should return result of multiply 5 and 2 = 10";
  const curriedMultiplay = curry(multiply);
  const actual = curriedMultiplay(5)(2);
  const expected = 10;
  t.is(actual, expected, msg);
});

test("curry() - feeds args when defining curry function", t => {
  const msg = "should return result of multiply 5 and 2 = 10";
  const multiplayBy5 = curry(multiply, 5);
  const actual = multiplayBy5(2);
  const expected = 10;
  t.is(actual, expected, msg);
});

test("curry() - feeds all args in advance", t => {
  const msg = "should return result of multiply 5 and 2 = 10";
  const actual = curry(multiply, 5, 2);
  const expected = 10;
  t.is(actual, expected, msg);
});

test("curry() - undefined as secound passed argument", t => {
  // convinient when using wrapper funcion araund curry function
  // see: qm-rgx-mdHeader
  const msg = "should return a function";
  const msg2 = "should return result of multiply 5 and 2 = 10";
  const curriedFn = curry(multiply, 5, undefined);
  const actual = typeof curriedFn === "function";
  const expected = true;
  t.is(actual, expected, msg);
  const actual2 = curriedFn(2);
  const expected2 = 10;
  t.is(actual2, expected2, msg2);
});

test("curry() - other falsy treats as arguments for curry fn", t => {
  // like false, null, 0, "" and NaN
  // only undefined
  const msg = "should return result of adding string A and '' = A";
  const actual = curry(add, "A")("");
  const expected = "A";
  t.is(actual, expected, msg);
  const msg2 = "should return result of adding string A and false = Afalse";
  const actual2 = curry(add, "A")(false);
  const expected2 = "Afalse";
  t.is(actual2, expected2, msg2);
  const msg3 = "should return result of adding string A and null = ???";
  const actual3 = curry(add, "A")(null);
  const expected3 = "Anull";
  t.is(actual3, expected3, msg3);
  const msg4 = "should return result of adding string A and 0 = A0";
  const actual4 = curry(add, "A")(0);
  const expected4 = "A0";
  t.is(actual4, expected4, msg4);
  const msg5 = "should return result of adding string A and NaN = ANaN";
  const actual5 = curry(add, "A")(NaN);
  const expected5 = "ANaN";
  t.is(actual5, expected5, msg5);
});

test("compose() - is function", t => {
  const msg = "should be a function ";
  const actual = typeof compose === "function";
  const expected = true;
  t.is(actual, expected, msg);
});

test("compose() - classic composition", t => {
  const msg =
    "should return result composing multiply and add fns (3 + 2)*4 = 20";
  const equation = compose(curry(multiply, 4), curry(add, 2));
  const actual = equation(3);
  const expected = 20;
  t.is(actual, expected, msg);
});

test("pipe() - is function", t => {
  const msg = "should be a function ";
  const actual = typeof pipe === "function";
  const expected = true;
  t.is(actual, expected, msg);
});

test("pipe() - classic composition by piping fns", t => {
  const msg =
    "should return result composing multiply and add fns (3 + 2)*4 = 20";
  const equation = pipe(curry(add, 2), curry(multiply, 4));
  const actual = equation(3);
  const expected = 20;
  t.is(actual, expected, msg);
});

// tap fixture
let obj = { passedResult: 0 };
const sneakPeekResult = (obj, result) => (obj.passedResult = result);
const sneakPeekResultWithObj = curry(sneakPeekResult, obj);

// fn to mockup fn composition
const multipliedBy4 = curry(multiply, 4);
const added2 = curry(add, 2);

test("tap() - is function", t => {
  const msg = "should be a function ";
  const actual = typeof tap === "function";
  const expected = true;
  t.is(actual, expected, msg);
});

test("tap() - default", t => {
  const msg = "should change obj.passedResult";
  tap(sneakPeekResultWithObj, 666);
  const actual = obj.passedResult;
  const expected = 666;
  t.is(actual, expected, msg);
});

test("tap() - used in fn composition", t => {
  const msg = "should sneak peek result between fns in fn composition";
  const fnComposition = compose(
    multipliedBy4,
    tap(sneakPeekResultWithObj), // side effect
    added2
  );
  fnComposition(3);
  const actual = obj.passedResult;
  const expected = 5;
  t.is(actual, expected, msg);
});

test("trace() - is function", t => {
  const msg = "should be a function ";
  const actual = typeof trace === "function";
  const expected = true;
  t.is(actual, expected, msg);
});

// manual test
test.skip("trace() - default (manual check)", t => {
  const msg = "should console.log a info in predefined format";
  const traceIt = trace()("someLabel");
  traceIt("Some info to display!"); //side effect
});

test.skip("trace() - used in fn composition", t => {
  const msg = "should sneak peek result between fns in fn composition";
  const traceIt = trace()("someLabel");
  const fnComposition = compose(
    multipliedBy4,
    traceIt, // side effect
    added2
  );
  fnComposition(3);
});

test("map() - is function", t => {
  const msg = "should be a function";
  const actual = typeof map === "function";
  const expected = true;
  t.is(actual, expected, msg);
});

test("filter() - is function", t => {
  const msg = "should be a function";
  const actual = typeof filter === "function";
  const expected = true;
  t.is(actual, expected, msg);
});

test("reduce() - is function", t => {
  const msg = "should be a function";
  const actual = typeof reduce === "function";
  const expected = true;
  t.is(actual, expected, msg);
});
