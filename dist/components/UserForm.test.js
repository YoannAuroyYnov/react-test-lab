"use strict";

var _react = require("@testing-library/react");
var _userEvent = _interopRequireDefault(require("@testing-library/user-event"));
var _UserForm = require("./UserForm");
var _api = require("../infra/api");
var _axios = _interopRequireDefault(require("axios"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
jest.mock("axios");
let mockNavigate;
jest.mock("wouter", () => ({
  useLocation: () => ["", mockNavigate]
}));
let usersState = [];
const setUsersStateMock = jest.fn();
const getFormElements = () => ({
  firstnameField: _react.screen.getByTestId("firstname-input"),
  lastnameField: _react.screen.getByTestId("lastname-input"),
  emailField: _react.screen.getByTestId("email-input"),
  birthField: _react.screen.getByTestId("birth-input"),
  cityField: _react.screen.getByTestId("city-input"),
  zipField: _react.screen.getByTestId("zip-input"),
  submitButton: _react.screen.getByTestId("submit-button"),
  backButton: _react.screen.getByTestId("back-button"),
  firstnameErrorText: _react.screen.getByTestId("firstname-error-text"),
  lastnameErrorText: _react.screen.getByTestId("lastname-error-text"),
  emailErrorText: _react.screen.getByTestId("email-error-text"),
  birthErrorText: _react.screen.getByTestId("birth-error-text"),
  zipErrorText: _react.screen.getByTestId("zip-error-text")
});
beforeEach(() => {
  mockNavigate = jest.fn();
});
test("should disable submit button when required fields are empty", () => {
  (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_UserForm.UserForm, {
    setUsers: setUsersStateMock
  }));
  const {
    firstnameField,
    lastnameField,
    emailField,
    birthField,
    cityField,
    zipField,
    submitButton,
    backButton
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
  (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_UserForm.UserForm, {
    setUsers: setUsersStateMock
  }));
  const {
    firstnameField,
    lastnameField,
    emailField,
    birthField,
    cityField,
    zipField,
    submitButton
  } = getFormElements();
  expect(submitButton).toBeDisabled();
  _userEvent.default.type(firstnameField, "John");
  _userEvent.default.type(lastnameField, "Doe");
  _userEvent.default.type(emailField, "john@example.com");
  _userEvent.default.type(birthField, "1990-01-01");
  _userEvent.default.type(cityField, "Paris");
  _userEvent.default.type(zipField, "75010");
  expect(submitButton).toBeEnabled();
});
test("should save a new user on valid submit", async () => {
  const data = usersState;
  (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_UserForm.UserForm, {
    setUsers: setUsersStateMock
  }));
  const {
    firstnameField,
    lastnameField,
    emailField,
    birthField,
    cityField,
    zipField,
    submitButton
  } = getFormElements();
  expect(submitButton).toBeDisabled();
  _userEvent.default.type(firstnameField, "John");
  expect(firstnameField).toHaveValue("John");
  _userEvent.default.type(lastnameField, "Doe");
  expect(lastnameField).toHaveValue("Doe");
  _userEvent.default.type(emailField, "john.doe@mail.com");
  expect(emailField).toHaveValue("john.doe@mail.com");
  _userEvent.default.type(birthField, "1986-12-31");
  expect(birthField).toHaveValue("1986-12-31");
  _userEvent.default.type(cityField, "undefined city");
  expect(cityField).toHaveValue("undefined city");
  _userEvent.default.type(zipField, "75010");
  expect(zipField).toHaveValue("75010");
  expect(submitButton).toBeEnabled();
  _axios.default.post.mockResolvedValue({
    data: {
      firstname: "John",
      lastname: "Doe",
      name: "John Doe",
      email: "john.doe@mail.com",
      birth: "1986-12-31",
      zipCode: "75010",
      city: "undefined city"
    }
  });
  _userEvent.default.click(submitButton);
  const url = "".concat(process.env.REACT_APP_API_URL, "/users");
  expect(_axios.default.post).toHaveBeenCalledWith(url, {
    name: "John Doe",
    firstname: "John",
    lastname: "Doe",
    email: "john.doe@mail.com",
    birth: "1986-12-31",
    zipCode: "75010",
    city: "undefined city"
  });
  await (0, _react.waitFor)(() => expect(setUsersStateMock).toHaveBeenCalled());
  expect(firstnameField).toHaveValue("");
  expect(lastnameField).toHaveValue("");
  expect(emailField).toHaveValue("");
  expect(birthField).toHaveValue("");
  expect(zipField).toHaveValue("");
});
test("should show an error when firstname is not valid", async () => {
  (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_UserForm.UserForm, {
    setUsers: setUsersStateMock
  }));
  const {
    firstnameField,
    firstnameErrorText
  } = getFormElements();

  // Test with numbers
  _userEvent.default.type(firstnameField, "John123");
  expect(firstnameField).toHaveValue("John123");
  expect(firstnameErrorText).toHaveTextContent("Les chiffres sont interdits");

  // Clear and test empty
  _userEvent.default.clear(firstnameField);
  expect(firstnameField).toHaveValue("");
  expect(firstnameErrorText).toHaveTextContent("Le champ ne peut pas être vide");

  // Test with special characters
  _userEvent.default.type(firstnameField, '; INSERT INTO "users" (username, role) VALUES(anonymous, admin);');
  expect(firstnameErrorText).toHaveTextContent("Les caractères spéciaux sont interdits");

  // Test valid input
  _userEvent.default.clear(firstnameField);
  _userEvent.default.type(firstnameField, "John");
  expect(firstnameField).toHaveValue("John");
  expect(firstnameErrorText).toHaveTextContent("");
});
test("should show an error when lastname is not valid", async () => {
  (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_UserForm.UserForm, {
    setUsers: setUsersStateMock
  }));
  const {
    lastnameField,
    lastnameErrorText
  } = getFormElements();
  _userEvent.default.type(lastnameField, "<Doe>");
  expect(lastnameField).toHaveValue("<Doe>");
  expect(lastnameErrorText).toHaveTextContent("Les caractères spéciaux sont interdits");
});
test("should show an error when email is not valid", async () => {
  (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_UserForm.UserForm, {
    setUsers: setUsersStateMock
  }));
  const {
    emailField,
    emailErrorText
  } = getFormElements();
  _userEvent.default.type(emailField, "johndoe.com");
  expect(emailField).toHaveValue("johndoe.com");
  expect(emailErrorText).toHaveTextContent("Le format de l'email est invalide");

  // Test valid email
  _userEvent.default.clear(emailField);
  _userEvent.default.type(emailField, "john@example.com");
  expect(emailField).toHaveValue("john@example.com");
  expect(emailErrorText).toHaveTextContent("");
});
test("should show an error when date of birth is not valid", async () => {
  (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_UserForm.UserForm, {
    setUsers: setUsersStateMock
  }));
  const {
    birthField,
    birthErrorText
  } = getFormElements();
  _userEvent.default.type(birthField, "2012-01-01");
  expect(birthField).toHaveValue("2012-01-01");
  expect(birthErrorText).toHaveTextContent("Vous devez être majeur pour vous inscrire");

  // Test valid birth date
  _userEvent.default.clear(birthField);
  _userEvent.default.type(birthField, "1990-01-01");
  expect(birthField).toHaveValue("1990-01-01");
  expect(birthErrorText).toHaveTextContent("");
});
test("should show an error when zipcode is not valid", async () => {
  (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_UserForm.UserForm, {
    setUsers: setUsersStateMock
  }));
  const {
    zipField,
    zipErrorText
  } = getFormElements();
  _userEvent.default.type(zipField, "2A325");
  expect(zipField).toHaveValue("2A325");
  expect(zipErrorText).toHaveTextContent("Le code postal doit comporter 5 chiffres");

  // Test valid zipcode
  _userEvent.default.clear(zipField);
  _userEvent.default.type(zipField, "75010");
  expect(zipField).toHaveValue("75010");
  expect(zipErrorText).toHaveTextContent("");
});
test("should reset the form after successful submission", async () => {
  (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_UserForm.UserForm, {
    setUsers: setUsersStateMock
  }));
  const {
    firstnameField,
    lastnameField,
    emailField,
    birthField,
    zipField,
    submitButton
  } = getFormElements();
  _userEvent.default.type(firstnameField, "John");
  _userEvent.default.type(lastnameField, "Doe");
  _userEvent.default.type(emailField, "john@example.com");
  _userEvent.default.type(birthField, "1990-01-01");
  _userEvent.default.type(zipField, "75010");
  expect(submitButton).toBeEnabled();
  _axios.default.post.mockResolvedValue({
    data: {
      firstname: "John",
      lastname: "Doe",
      name: "John Doe",
      email: "john@example.com",
      birth: "1990-01-01",
      zipCode: "75010",
      city: ""
    }
  });
  _userEvent.default.click(submitButton);
  const url = "".concat(process.env.REACT_APP_API_URL, "/users");
  expect(_axios.default.post).toHaveBeenCalledWith(url, {
    name: "John Doe",
    firstname: "John",
    lastname: "Doe",
    email: "john@example.com",
    birth: "1990-01-01",
    zipCode: "75010",
    city: ""
  });
  await (0, _react.waitFor)(() => {
    expect(firstnameField).toHaveValue("");
    expect(lastnameField).toHaveValue("");
    expect(emailField).toHaveValue("");
    expect(birthField).toHaveValue("");
    expect(zipField).toHaveValue("");
    expect(submitButton).toBeDisabled();
  });
});
test("should navigate to home page when back button is clicked", async () => {
  (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_UserForm.UserForm, {
    setUsers: setUsersStateMock
  }));
  const {
    backButton
  } = getFormElements();
  _userEvent.default.click(backButton);
  expect(mockNavigate).toHaveBeenCalledWith("/");
});