import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Router } from "wouter";
import { UserForm } from "./UserForm";

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
  localStorage.clear();
});

test("should disable submit button when required fields are empty", () => {
  render(<UserForm />);

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
  render(<UserForm />);

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

test("should save a new user to localStorage on valid submit", async () => {
  render(<UserForm />);

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
  expect(JSON.parse(localStorage.getItem("users"))).toBeNull();

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
  userEvent.click(submitButton);

  expect(JSON.parse(localStorage.getItem("users"))).toEqual([
    {
      firstname: "John",
      lastname: "Doe",
      birth: "1986-12-31",
      email: "john.doe@mail.com",
      zipCode: "75010",
      city: "undefined city",
    },
  ]);

  expect(firstnameField).toHaveValue("");
  expect(lastnameField).toHaveValue("");
  expect(emailField).toHaveValue("");
  expect(birthField).toHaveValue("");
  expect(zipField).toHaveValue("");
});

test("should show an error when firstname is not valid", async () => {
  render(<UserForm />);

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
  render(<UserForm />);

  const { lastnameField, lastnameErrorText } = getFormElements();

  userEvent.type(lastnameField, "<Doe>");
  expect(lastnameField).toHaveValue("<Doe>");
  expect(lastnameErrorText).toHaveTextContent(
    "Les caractères spéciaux sont interdits",
  );
});

test("should show an error when email is not valid", async () => {
  render(<UserForm />);

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
  render(<UserForm />);

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
  render(<UserForm />);

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

test("Submit button dispatches localStorageUpdate event", async () => {
  const dispatchSpy = jest.fn();
  const originalDispatch = window.dispatchEvent;
  window.dispatchEvent = dispatchSpy;

  render(<UserForm />);

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

  userEvent.click(submitButton);

  expect(dispatchSpy).toHaveBeenCalledWith(expect.any(Event));

  window.dispatchEvent = originalDispatch;
});

test("should reset the form after successful submission", async () => {
  render(<UserForm />);

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
  userEvent.click(submitButton);

  expect(firstnameField).toHaveValue("");
  expect(lastnameField).toHaveValue("");
  expect(emailField).toHaveValue("");
  expect(birthField).toHaveValue("");
  expect(zipField).toHaveValue("");
  expect(submitButton).toBeDisabled();
});
