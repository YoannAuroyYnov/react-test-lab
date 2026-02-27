"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _wouter = require("wouter");
var _UserForm = require("./components/UserForm");
var _UsersList = require("./components/UsersList");
var _api = require("./infra/api");
require("./App.css");
var _jsxRuntime = require("react/jsx-runtime");
function App() {
  const [users, setUsers] = (0, _react.useState)([]);
  (0, _react.useEffect)(() => {
    let isMounted = true;
    const loadUsers = async () => {
      try {
        const fetchedUsers = await (0, _api.getAllUsers)();
        if (!isMounted) return;
        setUsers(Array.isArray(fetchedUsers) ? fetchedUsers : []);
      } catch (error) {
        if (!isMounted) return;
        console.error("Failed to fetch users:", error);
        alert("Une erreur est survenue lors du chargement des utilisateurs. Veuillez réessayer.");
        setUsers([]);
      }
    };
    loadUsers();
    return () => {
      isMounted = false;
    };
  }, []);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_wouter.Router, {
    base: "/react-test-lab",
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "App",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h1", {
        children: "Bienvenue sur le React Test Lab"
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_wouter.Switch, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_wouter.Route, {
          path: "/",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_UsersList.UsersList, {
            users: users
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_wouter.Route, {
          path: "/register",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_UserForm.UserForm, {
            setUsers: setUsers
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_wouter.Route, {
          children: "404: No such page!"
        })]
      })]
    })
  });
}
var _default = exports.default = App;