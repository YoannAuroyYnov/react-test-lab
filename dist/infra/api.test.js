"use strict";

var _api = require("./api");
var _axios = _interopRequireDefault(require("axios"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
jest.mock("axios");
describe("getAllUsers", () => {
  it("fetches successfully data from an API", async () => {
    const data = {
      data: [{
        id: "1",
        name: "John Doe",
        email: "john.doe@mail.com"
      }]
    };
    _axios.default.get.mockImplementationOnce(() => Promise.resolve(data));
    await expect((0, _api.getAllUsers)()).resolves.toEqual(data.data);
    expect(_axios.default.get).toHaveBeenCalledWith("".concat(process.env.REACT_APP_API_URL, "/users"));
  });
  it("fetches erroneously data from an API", async () => {
    const errorMessage = "Network Error";
    _axios.default.get.mockImplementationOnce(() => Promise.reject(new Error(errorMessage)));
    await expect((0, _api.getAllUsers)()).rejects.toThrow(errorMessage);
  });
});
describe("createOneUser", () => {
  it("creates a user successfully", async () => {
    const newUser = {
      name: "Jane Doe",
      email: "jane.doe@mail.com"
    };
    const createdUser = _objectSpread(_objectSpread({}, newUser), {}, {
      id: "2"
    });
    _axios.default.post.mockImplementationOnce(() => Promise.resolve({
      data: createdUser
    }));
    await expect((0, _api.createOneUser)(newUser)).resolves.toEqual(createdUser);
  });
  it("fails to create a user", async () => {
    const newUser = {
      name: "Jane Doe",
      email: "jane.doe@mail.com"
    };
    const errorMessage = "Failed to create user";
    _axios.default.post.mockImplementationOnce(() => Promise.reject(new Error(errorMessage)));
    await expect((0, _api.createOneUser)(newUser)).rejects.toThrow(errorMessage);
  });
});