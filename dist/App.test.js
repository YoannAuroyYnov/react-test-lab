"use strict";

var _react = require("@testing-library/react");
var _userEvent = _interopRequireDefault(require("@testing-library/user-event"));
var _App = _interopRequireDefault(require("./App"));
var _axios = _interopRequireDefault(require("axios"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
jest.mock("axios");
beforeAll(() => {
  jest.spyOn(window, "alert").mockImplementation(() => {});
});
const renderAndWait = async () => {
  const utils = (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_App.default, {}));
  await (0, _react.waitFor)(() => expect(_axios.default.get).toHaveBeenCalled());
  return utils;
};
describe("App component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    _axios.default.get.mockResolvedValue({
      data: []
    });
  });
  afterAll(() => {
    window.alert.mockRestore();
  });
  test("renders welcome title on App", async () => {
    await renderAndWait();
    const title = _react.screen.getByText("Bienvenue sur le React Test Lab");
    expect(title).toBeInTheDocument();
  });
  test("renders an empty counter when no users are registered", async () => {
    Object.defineProperty(window, "location", {
      value: {
        pathname: "/react-test-lab"
      },
      writable: true
    });
    _axios.default.get.mockImplementation(() => Promise.resolve({
      data: []
    }));
    await renderAndWait();
    const counter = _react.screen.getByTestId("users-counter");
    expect(counter).toBeInTheDocument();
    expect(counter).toHaveTextContent("Il n'y a aucun utilisateur enregistré");
  });
  test("renders a counter when a user is registered", async () => {
    Object.defineProperty(window, "location", {
      value: {
        pathname: "/react-test-lab"
      },
      writable: true
    });
    const data = {
      data: [{
        name: "John Doe",
        firstname: "John",
        lastname: "Doe",
        email: "john@example.com",
        birth: "1990-01-01",
        zipCode: "75010",
        city: ""
      }]
    };
    _axios.default.get.mockImplementation(() => Promise.resolve(data));
    await renderAndWait();
    const counter = _react.screen.getByTestId("users-counter");
    expect(counter).toBeInTheDocument();
    await (0, _react.waitFor)(() => expect(counter).toHaveTextContent("Il y a 1 utilisateur enregistré"));
  });
  test("renders a counter when several users are registered", async () => {
    Object.defineProperty(window, "location", {
      value: {
        pathname: "/react-test-lab"
      },
      writable: true
    });
    const data = {
      data: [{
        name: "John Doe",
        firstname: "John",
        lastname: "Doe",
        email: "john@example.com",
        birth: "1990-01-01",
        zipCode: "75010",
        city: ""
      }, {
        name: "Jane Smith",
        firstname: "Jane",
        lastname: "Smith",
        email: "jane@example.com",
        birth: "1992-05-05",
        zipCode: "75001",
        city: ""
      }]
    };
    _axios.default.get.mockImplementationOnce(() => Promise.resolve(data));
    await renderAndWait();
    const counter = _react.screen.getByTestId("users-counter");
    expect(counter).toBeInTheDocument();
    await (0, _react.waitFor)(() => expect(counter).toHaveTextContent("Il y a 2 utilisateurs enregistrés"));
  });
  test("displays UsersList component by default", async () => {
    Object.defineProperty(window, "location", {
      value: {
        pathname: "/react-test-lab"
      },
      writable: true
    });
    await renderAndWait();
    const userListTitle = _react.screen.getByText("Créez en un pour voir la liste des utilisateurs enregistrés !");
    expect(userListTitle).toBeInTheDocument();
  });
  test("displays UserForm component when location is set to /register", async () => {
    Object.defineProperty(window, "location", {
      value: {
        pathname: "/react-test-lab/register"
      },
      writable: true
    });
    await renderAndWait();
    const userFormTitle = _react.screen.getByText("Enregistrer un nouvel utilisateur");
    expect(userFormTitle).toBeInTheDocument();
  });
  test("displays 404 message for unknown routes", async () => {
    Object.defineProperty(window, "location", {
      value: {
        pathname: "/react-test-lab/unknown"
      },
      writable: true
    });
    await renderAndWait();
    const notFoundMessage = _react.screen.getByText("404: No such page!");
    expect(notFoundMessage).toBeInTheDocument();
  });
  test("handles fetch errors by alerting and clearing users", async () => {
    Object.defineProperty(window, "location", {
      value: {
        pathname: "/react-test-lab"
      },
      writable: true
    });
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    _axios.default.get.mockRejectedValueOnce(new Error("Network Error"));
    await renderAndWait();
    await (0, _react.waitFor)(() => expect(window.alert).toHaveBeenCalledWith("Une erreur est survenue lors du chargement des utilisateurs. Veuillez réessayer."));
    const counter = _react.screen.getByTestId("users-counter");
    expect(counter).toHaveTextContent("Il n'y a aucun utilisateur enregistré");
    consoleSpy.mockRestore();
  });
  test("shows alert when API returns 500", async () => {
    Object.defineProperty(window, "location", {
      value: {
        pathname: "/react-test-lab"
      },
      writable: true
    });
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    const error = new Error("Server error");
    error.response = {
      status: 500
    };
    _axios.default.get.mockRejectedValueOnce(error);
    await renderAndWait();
    await (0, _react.waitFor)(() => expect(window.alert).toHaveBeenCalledWith("Une erreur est survenue lors du chargement des utilisateurs. Veuillez réessayer."));
    consoleSpy.mockRestore();
  });
  test("shows alert when API returns 400", async () => {
    Object.defineProperty(window, "location", {
      value: {
        pathname: "/react-test-lab"
      },
      writable: true
    });
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    const error = new Error("Bad request");
    error.response = {
      status: 400
    };
    _axios.default.get.mockRejectedValueOnce(error);
    await renderAndWait();
    await (0, _react.waitFor)(() => expect(window.alert).toHaveBeenCalledWith("Une erreur est survenue lors du chargement des utilisateurs. Veuillez réessayer."));
    consoleSpy.mockRestore();
  });
  test("handles non-array API response by clearing users", async () => {
    Object.defineProperty(window, "location", {
      value: {
        pathname: "/react-test-lab"
      },
      writable: true
    });
    _axios.default.get.mockResolvedValueOnce({
      data: {
        unexpected: true
      }
    });
    await renderAndWait();
    const counter = _react.screen.getByTestId("users-counter");
    expect(counter).toHaveTextContent("Il n'y a aucun utilisateur enregistré");
  });
  test("ignores late rejection after unmount", async () => {
    Object.defineProperty(window, "location", {
      value: {
        pathname: "/react-test-lab"
      },
      writable: true
    });
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    let rejectFn;
    _axios.default.get.mockReturnValueOnce(new Promise((_, reject) => {
      rejectFn = reject;
    }));
    const {
      unmount
    } = await renderAndWait();
    unmount();
    rejectFn(new Error("Late failure"));
    await (0, _react.waitFor)(() => {
      expect(window.alert).not.toHaveBeenCalled();
      expect(consoleSpy).not.toHaveBeenCalled();
    });
    consoleSpy.mockRestore();
  });
});