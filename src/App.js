import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  const clickOnMe = () => {
    setCount(count + 1);
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button className="button" onClick={clickOnMe}>
          Click me
        </button>
        <span className="counter" data-testid="count">
          {count}
        </span>
      </header>
    </div>
  );
}

export default App;
