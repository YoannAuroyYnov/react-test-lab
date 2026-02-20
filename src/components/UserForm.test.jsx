import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserForm } from "./UserForm";
import { createOneUser } from "../infra/api";
import axios from "axios";
jest.mock("axios");

let mockNavigate;

jest.mock("wouter", () => ({
  useLocation: () => ["", mockNavigate],
}));

let usersState = [];
const setUsersStateMock = jest.fn();

const getFormElements = () => ({
  firstnameField: screen.getByTestId("firstname-input"),
  lastnameField: screen.getByTestId("lastname-input"),
  emailField: screen.getByTestId("email-input"),
  birthField: screen.getByTestId("birth-input"),
  cityField: screen.getByTestId("city-input"),
  zipField: screen.getByTestId("zip-input"),
  submitButton: screen.getByTestId("submit-button"),
  backButton: screen.getByTestId("back-button"),
  firstnameErrorText: screen.getByTestId("firstname-error-text"),
  lastnameErrorText: screen.getByTestId("lastname-error-text"),
  emailErrorText: screen.getByTestId("email-error-text"),
  birthErrorText: screen.getByTestId("birth-error-text"),
  zipErrorText: screen.getByTestId("zip-error-text"),
});

beforeEach(() => {
  mockNavigate = jest.fn();
});

test("should disable submit button when required fields are empty", () => {
  render(<UserForm setUsers={setUsersStateMock} />);

  const {
    firstnameField,
    lastnameField,
    emailField,
    birthField,
    cityField,
    zipField,
    submitButton,
    backButton,
  } = getFormElements();

  expect(firstnameField).toBeInTheDocument();
  expect(lastnameField).toBeInTheDocument();
  expect(emailField).toBeInTheDocument();
  expect(birthField).toBeInTheDocument();
  expect(cityField).toBeInTheDocument();
  expect(zipField).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
  expect(backButton).toBeInTheDocument();
  expect(submitButton).toBeDisabled();
});

test("should enable submit button when all fields are valid", async () => {
  render(<UserForm setUsers={setUsersStateMock} />);

  const {
    firstnameField,
    lastnameField,
    emailField,
    birthField,
    cityField,
    zipField,
    submitButton,
  } = getFormElements();

  expect(submitButton).toBeDisabled();

  userEvent.type(firstnameField, "John");

  userEvent.type(lastnameField, "Doe");

  userEvent.type(emailField, "john@example.com");

  userEvent.type(birthField, "1990-01-01");

  userEvent.type(cityField, "Paris");

  userEvent.type(zipField, "75010");

  expect(submitButton).toBeEnabled();
});

test("should save a new user on valid submit", async () => {
  const data = usersState;

  render(<UserForm setUsers={setUsersStateMock} />);

  const {
    firstnameField,
    lastnameField,
    emailField,
    birthField,
    cityField,
    zipField,
    submitButton,
  } = getFormElements();

  expect(submitButton).toBeDisabled();

  userEvent.type(firstnameField, "John");
  expect(firstnameField).toHaveValue("John");

  userEvent.type(lastnameField, "Doe");
  expect(lastnameField).toHaveValue("Doe");

  userEvent.type(emailField, "john.doe@mail.com");
  expect(emailField).toHaveValue("john.doe@mail.com");

  userEvent.type(birthField, "1986-12-31");
  expect(birthField).toHaveValue("1986-12-31");

  userEvent.type(cityField, "undefined city");
  expect(cityField).toHaveValue("undefined city");

  userEvent.type(zipField, "75010");
  expect(zipField).toHaveValue("75010");

  expect(submitButton).toBeEnabled();

  axios.post.mockResolvedValue({
    data: {
      firstname: "John",
      lastname: "Doe",
      name: "John Doe",
      email: "john.doe@mail.com",
      birth: "1986-12-31",
      zipCode: "75010",
      city: "undefined city",
    },
  });
  userEvent.click(submitButton);

  const url = `${process.env.REACT_APP_API_URL}/users`;

  expect(axios.post).toHaveBeenCalledWith(url, {
    name: "John Doe",
    firstname: "John",
    lastname: "Doe",
    email: "john.doe@mail.com",
    birth: "1986-12-31",
    zipCode: "75010",
    city: "undefined city",
  });

  await waitFor(() => expect(setUsersStateMock).toHaveBeenCalled());

  expect(firstnameField).toHaveValue("");
  expect(lastnameField).toHaveValue("");
  expect(emailField).toHaveValue("");
  expect(birthField).toHaveValue("");
  expect(zipField).toHaveValue("");
});

test("should show an error when firstname is not valid", async () => {
  render(<UserForm setUsers={setUsersStateMock} />);

  const { firstnameField, firstnameErrorText } = getFormElements();

  // Test with numbers
  userEvent.type(firstnameField, "John123");
  expect(firstnameField).toHaveValue("John123");
  expect(firstnameErrorText).toHaveTextContent("Les chiffres sont interdits");

  // Clear and test empty
  userEvent.clear(firstnameField);
  expect(firstnameField).toHaveValue("");
  expect(firstnameErrorText).toHaveTextContent(
    "Le champ ne peut pas être vide",
  );

  // Test with special characters
  userEvent.type(
    firstnameField,
    '; INSERT INTO "users" (username, role) VALUES(anonymous, admin);',
  );
  expect(firstnameErrorText).toHaveTextContent(
    "Les caractères spéciaux sont interdits",
  );

  // Test valid input
  userEvent.clear(firstnameField);
  userEvent.type(firstnameField, "John");
  expect(firstnameField).toHaveValue("John");
  expect(firstnameErrorText).toHaveTextContent("");
});

test("should show an error when lastname is not valid", async () => {
  render(<UserForm setUsers={setUsersStateMock} />);

  const { lastnameField, lastnameErrorText } = getFormElements();

  userEvent.type(lastnameField, "<Doe>");
  expect(lastnameField).toHaveValue("<Doe>");
  expect(lastnameErrorText).toHaveTextContent(
    "Les caractères spéciaux sont interdits",
  );
});

test("should show an error when email is not valid", async () => {
  render(<UserForm setUsers={setUsersStateMock} />);

  const { emailField, emailErrorText } = getFormElements();

  userEvent.type(emailField, "johndoe.com");
  expect(emailField).toHaveValue("johndoe.com");
  expect(emailErrorText).toHaveTextContent("Le format de l'email est invalide");

  // Test valid email
  userEvent.clear(emailField);
  userEvent.type(emailField, "john@example.com");
  expect(emailField).toHaveValue("john@example.com");
  expect(emailErrorText).toHaveTextContent("");
});

test("should show an error when date of birth is not valid", async () => {
  render(<UserForm setUsers={setUsersStateMock} />);

  const { birthField, birthErrorText } = getFormElements();

  userEvent.type(birthField, "2012-01-01");
  expect(birthField).toHaveValue("2012-01-01");
  expect(birthErrorText).toHaveTextContent(
    "Vous devez être majeur pour vous inscrire",
  );

  // Test valid birth date
  userEvent.clear(birthField);
  userEvent.type(birthField, "1990-01-01");
  expect(birthField).toHaveValue("1990-01-01");
  expect(birthErrorText).toHaveTextContent("");
});

test("should show an error when zipcode is not valid", async () => {
  render(<UserForm setUsers={setUsersStateMock} />);

  const { zipField, zipErrorText } = getFormElements();

  userEvent.type(zipField, "2A325");
  expect(zipField).toHaveValue("2A325");
  expect(zipErrorText).toHaveTextContent(
    "Le code postal doit comporter 5 chiffres",
  );

  // Test valid zipcode
  userEvent.clear(zipField);
  userEvent.type(zipField, "75010");
  expect(zipField).toHaveValue("75010");
  expect(zipErrorText).toHaveTextContent("");
});

test("should reset the form after successful submission", async () => {
  render(<UserForm setUsers={setUsersStateMock} />);

  const {
    firstnameField,
    lastnameField,
    emailField,
    birthField,
    zipField,
    submitButton,
  } = getFormElements();

  userEvent.type(firstnameField, "John");
  userEvent.type(lastnameField, "Doe");
  userEvent.type(emailField, "john@example.com");
  userEvent.type(birthField, "1990-01-01");
  userEvent.type(zipField, "75010");

  expect(submitButton).toBeEnabled();
  axios.post.mockResolvedValue({
    data: {
      firstname: "John",
      lastname: "Doe",
      name: "John Doe",
      email: "john@example.com",
      birth: "1990-01-01",
      zipCode: "75010",
      city: "",
    },
  });
  userEvent.click(submitButton);

  const url = `${process.env.REACT_APP_API_URL}/users`;

  expect(axios.post).toHaveBeenCalledWith(url, {
    name: "John Doe",
    firstname: "John",
    lastname: "Doe",
    email: "john@example.com",
    birth: "1990-01-01",
    zipCode: "75010",
    city: "",
  });

  await waitFor(() => {
    expect(firstnameField).toHaveValue("");
    expect(lastnameField).toHaveValue("");
    expect(emailField).toHaveValue("");
    expect(birthField).toHaveValue("");
    expect(zipField).toHaveValue("");
    expect(submitButton).toBeDisabled();
  });
});

test("should navigate to home page when back button is clicked", async () => {
  render(<UserForm setUsers={setUsersStateMock} />);

  const { backButton } = getFormElements();
  userEvent.click(backButton);

  expect(mockNavigate).toHaveBeenCalledWith("/");
});
