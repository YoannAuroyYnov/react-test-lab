"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextInput = void 0;
var _jsxRuntime = require("react/jsx-runtime");
const TextInput = _ref => {
  let {
    label,
    id,
    type = "text",
    value,
    onChange,
    testId,
    errorTestId,
    errorText,
    required = false,
    requiredIndicator
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: "input-container",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("label", {
      className: "label",
      htmlFor: id,
      children: [label, " ", required && requiredIndicator]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
      "data-testid": testId,
      required: required,
      value: value,
      onChange: onChange,
      className: "input",
      id: id,
      type: type
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
      "data-testid": errorTestId,
      className: "error-text",
      children: errorText
    })]
  });
};
exports.TextInput = TextInput;