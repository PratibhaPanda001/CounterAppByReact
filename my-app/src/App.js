import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  // Load count from localStorage
  const [count, setCount] = useState(() => {
    const saved = localStorage.getItem("count");
    return saved ? JSON.parse(saved) : 0;
  });

  const [step, setStep] = useState(1);
  const [allowNegative, setAllowNegative] = useState(true);

  const MIN_VALUE = allowNegative ? -10 : 0;
  const MAX_VALUE = 10;

  // Persist in localStorage
  useEffect(() => {
    localStorage.setItem("count", JSON.stringify(count));
  }, [count]);

  //  Ensures step is always positive integer , -ve or 0 not allowed. 
  const safeStep = step > 0 ? step : 1;

  const increment = () => {
    setCount((prev) =>
      prev + safeStep <= MAX_VALUE ? prev + safeStep : prev
    );
  };

  const decrement = () => {
    setCount((prev) =>
      prev - safeStep >= MIN_VALUE ? prev - safeStep : prev
    );
  };

  const reset = () => setCount(0);

  return (
    <div className="app">
      <h1 className="title">My Counter App</h1>

      <h2
        className={`counter-value ${
          count === MAX_VALUE ? "max" : count === MIN_VALUE ? "min" : ""
        }`}
      >
        {count}
      </h2>

      <div className="buttons">
        <button onClick={decrement} disabled={count <= MIN_VALUE}>
          ➖ Decrement
        </button>
        <button onClick={reset}>🔄 Reset</button>
        <button onClick={increment} disabled={count >= MAX_VALUE}>
          ➕ Increment
        </button>
      </div>

      <div className="controls">
        <label>
          Step Size:{" "}
          <input
            type="number"
            value={step}
            min="1"
            onChange={(e) => setStep(Number(e.target.value))}
          />
        </label>

        <label className="checkbox">
          <input
            type="checkbox"
            checked={allowNegative}
            onChange={() => setAllowNegative(!allowNegative)}
          />
          Allow Negative Values
        </label>
      </div>
    </div>
  );
}

export default App;
