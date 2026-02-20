import { useEffect, useState } from "react";
import { Route, Router, Switch } from "wouter";
import { UserForm } from "./components/UserForm";
import { UsersList } from "./components/UsersList";
import { getAllUsers } from "./infra/api";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const loadUsers = async () => {
      try {
        const fetchedUsers = await getAllUsers();
        if (!isMounted) return;
        setUsers(Array.isArray(fetchedUsers) ? fetchedUsers : []);
      } catch (error) {
        if (!isMounted) return;
        console.error("Failed to fetch users:", error);
        alert(
          "Une erreur est survenue lors du chargement des utilisateurs. Veuillez réessayer.",
        );
        setUsers([]);
      }
    };

    loadUsers();

    return () => {
      isMounted = false;
    };
  }, []);

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
