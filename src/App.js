import { UserForm } from "./components/UserForm";
import { UsersList } from "./components/UsersList";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Bienvenue sur le React Test Lab</h1>
      <UsersList />
      <UserForm />
    </div>
  );
}

export default App;
