"use strict";

var _react = require("@testing-library/react");
var _userEvent = _interopRequireDefault(require("@testing-library/user-event"));
var _UsersList = require("./UsersList");
var _api = require("../infra/api");
var _axios = _interopRequireDefault(require("axios"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
jest.mock("axios");
let mockNavigate;
jest.mock("wouter", () => ({
  useLocation: () => ["", mockNavigate]
}));
beforeEach(() => {
  mockNavigate = jest.fn();
});
test("should display an empty list when no users in data response", async () => {
  const data = [];
  _axios.default.get.mockImplementationOnce(() => Promise.resolve({
    data
  }));
  const users = await (0, _api.getAllUsers)();
  expect(users).toEqual(data);
  (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_UsersList.UsersList, {
    users: users
  }));
  const usersList = _react.screen.getByTestId("users-list");
  expect(usersList).toBeInTheDocument();
  expect(usersList.children).toHaveLength(0);
});
test("should display users from api call on mount", async () => {
  const data = [{
    name: "John Doe",
    email: "john@example.com",
    birth: "1990-01-01",
    city: "Paris",
    zipCode: "75001"
  }, {
    name: "Jane Smith",
    email: "jane@example.com",
    birth: "1992-03-15",
    city: "Lyon",
    zipCode: "69001"
  }];
  _axios.default.get.mockImplementationOnce(() => Promise.resolve({
    data
  }));
  const users = await (0, _api.getAllUsers)();
  expect(users).toEqual(data);
  (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_UsersList.UsersList, {
    users: users
  }));
  const user1 = _react.screen.getByTestId("user-0");
  expect(user1).toHaveTextContent("1 - John Doe");
  const user2 = _react.screen.getByTestId("user-1");
  expect(user2).toHaveTextContent("2 - Jane Smith");
});
test("should display only the 5 most recent users when more than 5 exist", async () => {
  const data = Array.from({
    length: 7
  }, (_, i) => ({
    name: "User".concat(i + 1, " Last").concat(i + 1),
    email: "user".concat(i + 1, "@example.com"),
    birth: "1990-01-01",
    city: "Paris",
    zipCode: "75001"
  }));
  _axios.default.get.mockImplementationOnce(() => Promise.resolve({
    data
  }));
  const users = await (0, _api.getAllUsers)();
  expect(users).toEqual(data);
  (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_UsersList.UsersList, {
    users: users
  }));

  // Should display users 3-7 (last 5)
  expect(_react.screen.getByTestId("user-0")).toHaveTextContent("1 - User3 Last3");
  expect(_react.screen.getByTestId("user-1")).toHaveTextContent("2 - User4 Last4");
  expect(_react.screen.getByTestId("user-2")).toHaveTextContent("3 - User5 Last5");
  expect(_react.screen.getByTestId("user-3")).toHaveTextContent("4 - User6 Last6");
  expect(_react.screen.getByTestId("user-4")).toHaveTextContent("5 - User7 Last7");
});
test("should re-render when users prop changes", () => {
  const {
    rerender
  } = (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_UsersList.UsersList, {
    users: []
  }));
  const initialList = _react.screen.getByTestId("users-list");
  expect(initialList.children).toHaveLength(0);
  const newUsers = [{
    name: "Alice Wonder",
    email: "alice@example.com",
    birth: "1995-05-20",
    city: "Marseille",
    zipCode: "13001"
  }];
  rerender(/*#__PURE__*/(0, _jsxRuntime.jsx)(_UsersList.UsersList, {
    users: newUsers
  }));
  const updatedUser = _react.screen.getByTestId("user-0");
  expect(updatedUser).toHaveTextContent("1 - Alice Wonder");
});
test("should clear users when users prop becomes empty", () => {
  const users = [{
    name: "Charlie Brown",
    email: "charlie@example.com",
    birth: "1988-03-22",
    city: "Bordeaux",
    zipCode: "33000"
  }];
  const {
    rerender
  } = (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_UsersList.UsersList, {
    users: users
  }));
  let usersList = _react.screen.getByTestId("users-list");
  expect(usersList.children).toHaveLength(1);
  rerender(/*#__PURE__*/(0, _jsxRuntime.jsx)(_UsersList.UsersList, {
    users: []
  }));
  usersList = _react.screen.getByTestId("users-list");
  expect(usersList.children).toHaveLength(0);
});
test("should navigate to register page when button is clicked", async () => {
  (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_UsersList.UsersList, {
    users: []
  }));
  const navigationButton = _react.screen.getByTestId("navigation-button");
  await _userEvent.default.click(navigationButton);
  expect(mockNavigate).toHaveBeenCalledWith("/register");
});