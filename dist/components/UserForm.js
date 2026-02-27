"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserForm = void 0;
var _react = require("react");
var _wouter = require("wouter");
var _validator = require("../utils/validator");
var _TextInput = require("./atomic/TextInput");
var _api = require("../infra/api");
var _jsxRuntime = require("react/jsx-runtime");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const INITIAL_PERSON = {
  firstname: "",
  lastname: "",
  email: "",
  birth: "",
  city: "",
  zipCode: ""
};
const UserForm = _ref => {
  let {
    setUsers
  } = _ref;
  const [disabled, setDisabled] = (0, _react.useState)(true);
  const [person, setPerson] = (0, _react.useState)(INITIAL_PERSON);
  const [personError, setPersonError] = (0, _react.useState)(INITIAL_PERSON);
  const [, navigate] = (0, _wouter.useLocation)();
  const handleChange = function (field, value) {
    let validator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    setPerson(_objectSpread(_objectSpread({}, person), {}, {
      [field]: value
    }));
    if (!validator) {
      setPersonError(_objectSpread(_objectSpread({}, personError), {}, {
        [field]: ""
      }));
      return;
    }
    try {
      const validateData = field === "birth" ? {
        birth: new Date(value)
      } : field === "email" ? {
        email: value
      } : field === "zipCode" ? {
        zipCode: value
      } : value;
      validator(validateData);
      setPersonError(_objectSpread(_objectSpread({}, personError), {}, {
        [field]: ""
      }));
    } catch (error) {
      setPersonError(_objectSpread(_objectSpread({}, personError), {}, {
        [field]: error.message
      }));
    }
  };
  (0, _react.useEffect)(() => {
    if (!person.firstname || !person.lastname || !person.birth || !new Date(person.birth) instanceof Date || !person.email || !person.zipCode) return;
    try {
      if ((0, _validator.validateIndentity)(person) && (0, _validator.validateAge)(_objectSpread(_objectSpread({}, person), {}, {
        birth: new Date(person.birth)
      })) && (0, _validator.validateZipCode)(person) && (0, _validator.validateEmail)(person)) return setDisabled(false);
    } catch (error) {
      return setDisabled(true);
    }
  }, [person]);
  const onSubmit = async e => {
    e.preventDefault();
    const user = _objectSpread({
      name: "".concat(person.firstname, " ").concat(person.lastname)
    }, person);
    try {
      const createdUser = await (0, _api.createOneUser)(user);
      setUsers(prev => {
        const updatedUsers = [...prev, createdUser];
        return updatedUsers;
      });
    } catch (error) {
      console.error("Failed to create user:", error);
      alert("Une erreur est survenue lors de la création de l'utilisateur. Veuillez réessayer.");
      return;
    }
    setPerson(INITIAL_PERSON);
    setDisabled(true);
    navigate("/");
  };
  const requiredIndicator = /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
    className: "required-indicator",
    "aria-hidden": "true",
    children: "*"
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h3", {
      className: "form-title",
      children: "Enregistrer un nouvel utilisateur"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("form", {
      action: "/",
      method: "get",
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "form-container",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_TextInput.TextInput, {
          label: "Pr\xE9nom",
          id: "firstname",
          value: person.firstname,
          onChange: e => handleChange("firstname", e.target.value, _validator.validateName),
          testId: "firstname-input",
          errorTestId: "firstname-error-text",
          errorText: personError.firstname,
          required: true,
          requiredIndicator: requiredIndicator
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_TextInput.TextInput, {
          label: "Nom",
          id: "lastname",
          type: "text",
          value: person.lastname,
          onChange: e => handleChange("lastname", e.target.value, _validator.validateName),
          testId: "lastname-input",
          errorTestId: "lastname-error-text",
          errorText: personError.lastname,
          required: true,
          requiredIndicator: requiredIndicator
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_TextInput.TextInput, {
          label: "Email",
          id: "email",
          type: "email",
          value: person.email,
          onChange: e => handleChange("email", e.target.value, _validator.validateEmail),
          testId: "email-input",
          errorTestId: "email-error-text",
          errorText: personError.email,
          required: true,
          requiredIndicator: requiredIndicator
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_TextInput.TextInput, {
          label: "Date de naissance",
          id: "birthdate",
          type: "date",
          value: person.birth,
          onChange: e => handleChange("birth", e.target.value, _validator.validateAge),
          testId: "birth-input",
          errorTestId: "birth-error-text",
          errorText: personError.birth,
          required: true,
          requiredIndicator: requiredIndicator
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_TextInput.TextInput, {
          label: "Ville",
          id: "city",
          value: person.city,
          onChange: e => handleChange("city", e.target.value),
          testId: "city-input",
          errorTestId: "city-error-text",
          errorText: personError.city
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_TextInput.TextInput, {
          label: "Code postal",
          id: "zipcode",
          value: person.zipCode,
          onChange: e => handleChange("zipCode", e.target.value, _validator.validateZipCode),
          testId: "zip-input",
          errorTestId: "zip-error-text",
          errorText: personError.zipCode,
          required: true,
          requiredIndicator: requiredIndicator
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
            "data-testid": "back-button",
            className: "button button-secondary",
            type: "button",
            onClick: () => navigate("/"),
            children: "Retour"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
            "data-testid": "submit-button",
            className: "button submit-button ".concat(disabled && "disabled"),
            type: "submit",
            onClick: onSubmit,
            disabled: disabled,
            children: "Enregistrer l'utilisateur"
          })]
        })]
      })
    })]
  });
};
exports.UserForm = UserForm;