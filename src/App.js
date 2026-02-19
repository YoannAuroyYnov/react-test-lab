import { useState } from "react";
import { Route, Router, Switch } from "wouter";
import { UserForm } from "./components/UserForm";
import { UsersList } from "./components/UsersList";
import "./App.css";

function App() {
  const [users, setUsers] = useState(
    JSON.parse(window.localStorage.getItem("users")) ?? [],
  );

  return (
    <Router base="/react-test-lab">
      <div className="App">
        <h1>Bienvenue sur le React Test Lab</h1>
        <Switch>
          <Route path="/">
            <UsersList users={users} />
          </Route>
          <Route path="/register">
            <UserForm setUsers={setUsers} />
          </Route>
          <Route>404: No such page!</Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
