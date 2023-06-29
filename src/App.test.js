import { init, increment, decrement } from "./events";
import { getCount, getAllTheState } from "./selectors";

const initialState = {
  counter: 1,
};

test("init", () => {
  let result = init({ count: 42 });
  expect(result.state.counter).toBe(42);
});

test("increments", () => {
  let result = increment({ state: initialState });
  expect(result.state.counter).toBe(2);
  expect(result.localStorage).toEqual({
    method: "save",
    key: "count",
    value: 2,
  });
});

test("decrements", () => {
  let result = decrement({ state: initialState });
  expect(result.state.counter).toBe(0);
  expect(result.localStorage).toEqual({
    method: "save",
    key: "count",
    value: 0,
  });
});

test("getCount", () => {
  expect(getCount(initialState)).toBe(1);
});

test("getAllTheState", () => {
  expect(getAllTheState(initialState)).toBe('{"counter":1}');
});
