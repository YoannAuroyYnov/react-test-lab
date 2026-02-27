"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersList = void 0;
var _wouter = require("wouter");
var _jsxRuntime = require("react/jsx-runtime");
const UsersList = _ref => {
  let {
    users
  } = _ref;
  const [, navigate] = (0, _wouter.useLocation)();
  const severalUsers = users.length > 1;
  const noUser = users.length === 0;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: "users-list-container",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h2", {
      "data-testid": "users-counter",
      children: noUser ? "Il n'y a aucun utilisateur enregistré" : "Il y a ".concat(users.length, " utilisateur").concat(severalUsers ? "s" : "", " enregistr\xE9").concat(severalUsers ? "s" : "")
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("h3", {
      children: users.length > 0 ? "Liste des 5 derniers utilisateurs :" : "Créez en un pour voir la liste des utilisateurs enregistrés !"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("ul", {
      "data-testid": "users-list",
      className: "list-none",
      children: users.length > 0 && users.slice(-5).map((user, index) => /*#__PURE__*/(0, _jsxRuntime.jsxs)("li", {
        "data-testid": "user-".concat(index),
        children: [index + 1, " - ", user.name]
      }, index))
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
      "data-testid": "navigation-button",
      className: "button",
      onClick: () => navigate("/register"),
      children: "Enregistrer un nouvel utilisateur"
    })]
  });
};
exports.UsersList = UsersList;