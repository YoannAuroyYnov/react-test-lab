import { render, screen } from "@testing-library/react";
import { UsersList } from "./UsersList";
import { act } from "react";

beforeEach(() => {
  localStorage.clear();
});

test("should display an empty list when no users in local storage", () => {
  render(<UsersList />);

  const usersList = screen.getByTestId("users-list");
  expect(usersList).toBeInTheDocument();
  expect(usersList.children).toHaveLength(0);
});

test("should display users stored in localStorage on mount", () => {
  const users = [
    {
      firstname: "John",
      lastname: "Doe",
      email: "john@example.com",
      birth: "1990-01-01",
      city: "Paris",
      zipCode: "75001",
    },
    {
      firstname: "Jane",
      lastname: "Smith",
      email: "jane@example.com",
      birth: "1992-03-15",
      city: "Lyon",
      zipCode: "69001",
    },
  ];

  localStorage.setItem("users", JSON.stringify(users));

  render(<UsersList />);

  const user1 = screen.getByTestId("user-0");
  expect(user1).toHaveTextContent("1 - John Doe");

  const user2 = screen.getByTestId("user-1");
  expect(user2).toHaveTextContent("2 - Jane Smith");
});

test("should display only the 5 most recent users when more than 5 exist", () => {
  const users = Array.from({ length: 7 }, (_, i) => ({
    firstname: `User${i + 1}`,
    lastname: `Last${i + 1}`,
    email: `user${i + 1}@example.com`,
    birth: "1990-01-01",
    city: "Paris",
    zipCode: "75001",
  }));

  localStorage.setItem("users", JSON.stringify(users));

  render(<UsersList />);

  // Should display users 3-7 (last 5)
  expect(screen.getByTestId("user-0")).toHaveTextContent("1 - User3 Last3");
  expect(screen.getByTestId("user-1")).toHaveTextContent("2 - User4 Last4");
  expect(screen.getByTestId("user-2")).toHaveTextContent("3 - User5 Last5");
  expect(screen.getByTestId("user-3")).toHaveTextContent("4 - User6 Last6");
  expect(screen.getByTestId("user-4")).toHaveTextContent("5 - User7 Last7");
});

test("should re-render when localStorage changes", () => {
  render(<UsersList />);

  const initialList = screen.getByTestId("users-list");
  expect(initialList.children).toHaveLength(0);

  const newUsers = [
    {
      firstname: "Alice",
      lastname: "Wonder",
      email: "alice@example.com",
      birth: "1995-05-20",
      city: "Marseille",
      zipCode: "13001",
    },
  ];

  localStorage.setItem("users", JSON.stringify(newUsers));
  act(() => {
    window.dispatchEvent(new Event("localStorageUpdate"));
  });

  const updatedUser = screen.getByTestId("user-0");
  expect(updatedUser).toHaveTextContent("1 - Alice Wonder");
});

test("should clear users when handleStorageChange is called with empty localStorage", () => {
  const users = [
    {
      firstname: "Charlie",
      lastname: "Brown",
      email: "charlie@example.com",
      birth: "1988-03-22",
      city: "Bordeaux",
      zipCode: "33000",
    },
  ];

  localStorage.setItem("users", JSON.stringify(users));
  render(<UsersList />);

  let usersList = screen.getByTestId("users-list");
  expect(usersList.children).toHaveLength(1);

  localStorage.removeItem("users");
  act(() => {
    window.dispatchEvent(new Event("localStorageUpdate"));
  });

  usersList = screen.getByTestId("users-list");
  expect(usersList.children).toHaveLength(0);
});
