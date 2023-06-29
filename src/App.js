import { useSelector, run, runSync } from "./reframe";
import { init, increment, decrement, add } from "./events";
import { getCount, getAllTheState } from "./selectors";

runSync(init);

function App() {
  const count = useSelector(getCount);
  const stateStr = useSelector(getAllTheState);
  return (
    <div>
      <div> The count is {count}</div>
      <button onClick={() => run(increment)}> + </button>
      <button onClick={() => run(decrement)}> - </button>
      <div>
        The state looks like this <code>{stateStr}</code>
      </div>
    </div>
  );
}

export default App;
