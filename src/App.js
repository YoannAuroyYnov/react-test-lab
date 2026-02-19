import { Route, Switch } from "wouter";
import { UserForm } from "./components/UserForm";
import { UsersList } from "./components/UsersList";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Bienvenue sur le React Test Lab</h1>
      <Switch>
        <Route path="/react-test-lab" component={UsersList} />
        <Route path="/react-test-lab/new-user" component={UserForm} />
        <Route>404: No such page!</Route>
      </Switch>
    </div>
  );
}

export default App;
