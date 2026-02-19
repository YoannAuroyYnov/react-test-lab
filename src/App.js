import { Route, Router, Switch } from "wouter";
import { UserForm } from "./components/UserForm";
import { UsersList } from "./components/UsersList";
import "./App.css";

function App() {
  return (
    <Router base="/react-test-lab">
      <div className="App">
        <h1>Bienvenue sur le React Test Lab</h1>
        <Switch>
          <Route path="/" component={UsersList} />
          <Route path="/new-user" component={UserForm} />
          <Route>404: No such page!</Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
