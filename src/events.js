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
  };
}

increment.outputs = {
  localStorage: localStorage.output,
};

export function decrement({ state }) {
  return {
    state: {
      ...state,
      counter: state.counter - 1,
    },
  };
}
