import * as localStorage from "./reframe/localStorage.js";

export function init({ state, count }) {
  return {
    state: {
      counter: count || 0,
    },
  };
}

export function increment({ state }) {
  const newCount = state.counter + 1;
  return {
    state: {
      ...state,
      counter: newCount,
    },
    localStorage: {
      method: "save",
      key: "count",
      value: newCount,
    },
  };
}

increment.outputs = {
  localStorage: localStorage.output,
};

export function decrement({ state }) {
  const newCount = state.counter - 1;
  return {
    state: {
      ...state,
      counter: newCount,
    },
    localStorage: {
      method: "save",
      key: "count",
      value: newCount,
    },
  };
}

decrement.outputs = {
  localStorage: localStorage.output,
};
