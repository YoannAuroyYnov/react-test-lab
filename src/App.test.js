import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

beforeEach(() => {
  localStorage.clear();
});

test("renders welcome title on App", () => {
  render(<App />);

  const title = screen.getByText("Bienvenue sur le React Test Lab");
  expect(title).toBeInTheDocument();
});

test("renders an empty counter when no users are registered", () => {
  Object.defineProperty(window, "location", {
    value: { pathname: "/react-test-lab" },
    writable: true,
  });
  render(<App />);

  const counter = screen.getByTestId("users-counter");
  expect(counter).toBeInTheDocument();
  expect(counter).toHaveTextContent("Il n'y a aucun utilisateur enregistré");
});

test("renders a counter when a user is registered", () => {
  Object.defineProperty(window, "location", {
    value: { pathname: "/react-test-lab" },
    writable: true,
  });
  localStorage.setItem(
    "users",
    JSON.stringify([{ firstname: "Alice", lastname: "Smith" }]),
  );
  render(<App />);

  const counter = screen.getByTestId("users-counter");
  expect(counter).toBeInTheDocument();
  expect(counter).toHaveTextContent("Il y a 1 utilisateur enregistré");
});

test("renders a counter when several users are registered", () => {
  Object.defineProperty(window, "location", {
    value: { pathname: "/react-test-lab" },
    writable: true,
  });
  localStorage.setItem(
    "users",
    JSON.stringify([
      { firstname: "Alice", lastname: "Smith" },
      { firstname: "Bob", lastname: "Johnson" },
    ]),
  );
  render(<App />);

  const counter = screen.getByTestId("users-counter");
  expect(counter).toBeInTheDocument();
  expect(counter).toHaveTextContent("Il y a 2 utilisateurs enregistrés");
});

test("displays UsersList component by default", () => {
  Object.defineProperty(window, "location", {
    value: { pathname: "/react-test-lab" },
    writable: true,
  });
  render(<App />);

  const userListTitle = screen.getByText(
    "Créez en un pour voir la liste des utilisateurs enregistrés !",
  );
  expect(userListTitle).toBeInTheDocument();
});

test("displays UserForm component when location is set to /register", async () => {
  Object.defineProperty(window, "location", {
    value: { pathname: "/react-test-lab/register" },
    writable: true,
  });
  render(<App />);

  const userFormTitle = screen.getByText("Enregistrer un nouvel utilisateur");
  expect(userFormTitle).toBeInTheDocument();
});

test("displays 404 message for unknown routes", () => {
  Object.defineProperty(window, "location", {
    value: { pathname: "/react-test-lab/unknown" },
    writable: true,
  });
  render(<App />);

  const notFoundMessage = screen.getByText("404: No such page!");
  expect(notFoundMessage).toBeInTheDocument();
});
