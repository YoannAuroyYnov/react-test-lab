import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

beforeEach(() => {
  localStorage.clear();
});

test("Happy path validation form", () => {
  render(<App />);

  const submitButton = screen.getByTestId("submit-button");
  expect(submitButton).toBeDisabled();
  expect(JSON.parse(localStorage.getItem("users"))).toBeNull();

  const firstnameField = screen.getByTestId("firstname-input");
  userEvent.type(firstnameField, "John");
  expect(firstnameField).toHaveValue("John");

  const lastnameField = screen.getByTestId("lastname-input");
  userEvent.type(lastnameField, "Doe");
  expect(lastnameField).toHaveValue("Doe");

  const emailField = screen.getByTestId("email-input");
  userEvent.type(emailField, "john.doe@mail.com");
  expect(emailField).toHaveValue("john.doe@mail.com");

  const birthField = screen.getByTestId("birth-input");
  userEvent.type(birthField, "1986-12-31");
  expect(birthField).toHaveValue("1986-12-31");

  const cityField = screen.getByTestId("city-input");
  userEvent.type(cityField, "undefined city");
  expect(cityField).toHaveValue("undefined city");

  const zipField = screen.getByTestId("zip-input");
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

test("Check inputs validation", () => {
  render(<App />);

  const firstnameField = screen.getByTestId("firstname-input");
  const firstnameErrorText = screen.getByTestId("firstname-error-text");
  userEvent.type(firstnameField, "John123");
  expect(firstnameField).toHaveValue("John123");
  expect(firstnameErrorText).toHaveTextContent("Les chiffres sont interdits");
  userEvent.clear(firstnameField);
  expect(firstnameField).toHaveValue("");
  expect(firstnameErrorText).toHaveTextContent(
    "Le champ ne peut pas être vide",
  );
  userEvent.type(
    firstnameField,
    '; INSERT INTO "users" (username, role) VALUES(anonymous, admin);',
  );
  expect(firstnameField).toHaveValue(
    '; INSERT INTO "users" (username, role) VALUES(anonymous, admin);',
  );
  expect(firstnameErrorText).toHaveTextContent(
    "Les caractères spéciaux sont interdits",
  );
  userEvent.clear(firstnameField);
  userEvent.type(firstnameField, "John");
  expect(firstnameField).toHaveValue("John");
  expect(firstnameErrorText).toHaveTextContent("");

  const lastnameField = screen.getByTestId("lastname-input");
  const lastnameErrorText = screen.getByTestId("lastname-error-text");
  userEvent.type(lastnameField, "<Doe>");
  expect(lastnameField).toHaveValue("<Doe>");
  expect(lastnameErrorText).toHaveTextContent(
    "Les caractères spéciaux sont interdits",
  );

  const emailField = screen.getByTestId("email-input");
  const emailErrorText = screen.getByTestId("email-error-text");
  userEvent.type(emailField, "johndoe.com");
  expect(emailField).toHaveValue("johndoe.com");
  expect(emailErrorText).toHaveTextContent("Le format de l'email est invalide");

  const birthField = screen.getByTestId("birth-input");
  const birthErrorText = screen.getByTestId("birth-error-text");
  userEvent.type(birthField, "2012-01-01");
  expect(birthField).toHaveValue("2012-01-01");
  expect(birthErrorText).toHaveTextContent(
    "Vous devez être majeur pour vous inscrire",
  );

  const zipField = screen.getByTestId("zip-input");
  const zipErrorText = screen.getByTestId("zip-error-text");
  userEvent.type(zipField, "2A325");
  expect(zipField).toHaveValue("2A325");
  expect(zipErrorText).toHaveTextContent(
    "Le code postal doit comporter 5 chiffres",
  );
});
