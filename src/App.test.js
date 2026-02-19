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

// todo: add counter
// test("renders a counter of subscribed users", () => {
//   render(<App />);

//   const counter = screen.getByTestId("users-counter");
//   expect(counter).toBeInTheDocument();
//   expect(counter).toHaveTextContent("Nombre d'utilisateurs inscrits : 0");
// });

test("displays UsersList component by default", () => {
  Object.defineProperty(window, "location", {
    value: { pathname: "/react-test-lab" },
    writable: true,
  });
  render(<App />);

  const userListTitle = screen.getByText(
    "Liste des 5 derniers utilisateurs enregistrés :",
  );
  expect(userListTitle).toBeInTheDocument();
});

test("displays UserForm component when location is set to /new-user", async () => {
  Object.defineProperty(window, "location", {
    value: { pathname: "/react-test-lab/new-user" },
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
