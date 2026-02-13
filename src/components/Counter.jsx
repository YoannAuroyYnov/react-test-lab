import { useState } from "react";

export const Counter = (props) => {
  const [count, setCount] = useState(0);

  const clickOnMe = () => {
    setCount(count + 1);
  };
  return (
    <div className="counter-container">
      <button className="button" onClick={clickOnMe}>
        Click me
      </button>
      <span className="counter" data-testid="count">
        {count}
      </span>
    </div>
  );
};
