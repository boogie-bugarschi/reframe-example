export function getCount(state) {
  return state.counter;
}

export function getAllTheState(state) {
  return JSON.stringify(state);
}
