import { useState } from "react";
import logo from "./logo.svg";
import { UserForm } from "./components/UserForm";
import { Counter } from "./components/Counter";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  const clickOnMe = () => {
    setCount(count + 1);
  };
  return (
    <div className="App">
      <Counter />
      <UserForm />
    </div>
  );
}

export default App;
