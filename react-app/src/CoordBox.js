
import React, { useState } from "react";

const useCounter = (initialValue) => {
  const [count, setCount] = useState(initialValue);
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  return { count, increment, decrement };
};

export function CoordBox() {
  const { count, increment, decrement } = useCounter(0);
  return (
    <div>
      <p>{count}</p>
      <button>
        increment
      </button>
      <button onClick={decrement}>
        decrement
      </button>
    </div>
  );
}