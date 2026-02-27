"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllUsers = exports.createOneUser = void 0;
var _axios = _interopRequireDefault(require("axios"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const API = process.env.REACT_APP_API_URL;
const getAllUsers = async () => {
  try {
    const response = await _axios.default.get("".concat(API, "/users"));
    return response.data;
  } catch (error) {
    throw error;
  }
};
exports.getAllUsers = getAllUsers;
const createOneUser = async user => {
  try {
    const response = await _axios.default.post("".concat(API, "/users"), user);
    return response.data;
  } catch (error) {
    throw error;
  }
};
exports.createOneUser = createOneUser;