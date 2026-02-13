import { useState } from "react";
import logo from "./logo.svg";
import { UserForm } from "./components/UserForm";
import { Counter } from "./components/Counter";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Counter />
      <UserForm />
    </div>
  );
}

export default App;
