import { useState, useEffect } from "react";

class EventQueue {
  constructor() {
    this.queue = [];
    this.timer = null;
  }
  publish(f) {
    this.queue.push(f);
    clearTimeout(this.timer);
    this.timer = setTimeout(this.run.bind(this), 0);
  }

  run() {
    for (let e of this.queue) {
      e();
    }
    this.queue = [];
  }
}

class State {
  constructor() {
    this.listeners = new Set();
    this.value = null;
  }

  set(newState) {
    this.value = newState;
    for (let f of this.listeners) {
      f(this.value);
    }
  }

  get() {
    return this.value;
  }

  listen(f) {
    this.listeners.add(f);
    return () => this.listeners.delete(f);
  }
}
const eventQueue = new EventQueue();
const state = new State();

export function run(f, ...args) {
  eventQueue.publish(() => runSync(f, ...args));
}

function stateOutput(newState) {
  state.set(newState);
}
function stateInput() {
  return state.get();
}

export function runSync(f, ...args) {
  const inputs = { ...f.inputs, state: stateInput };
  const context = Object.keys(inputs).reduce(
    (acc, key) => ({ ...acc, [key]: inputs[key]() }),
    {}
  );
  const result = f(context, ...args);
  const outputs = { ...f.outputs, state: stateOutput };
  for (let effect of Object.keys(result)) {
    if (!outputs[effect]) {
      throw new Error(
        "no output handler registered for " + effect + " in event " + f.name
      );
    }
    outputs[effect](result[effect]);
  }
}

export function useSelector(f, ...args) {
  //can also use React 18's useSyncExternalStore for this purpose (thx Radu)
  const [value, setValue] = useState(f(state.get(), ...args));
  useEffect(
    function () {
      setValue(f(state.get(), ...args));
      return state.listen((s) => setValue(f(s, ...args)));
    },
    [...args]
  );

  return value;
}
