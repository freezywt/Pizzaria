"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actionAsync = void 0;

function _accounts() {
  const data = require("./accounts");

  _accounts = function () {
    return data;
  };

  return data;
}

const actionAsync = _accounts().login;

exports.actionAsync = actionAsync;
//# sourceMappingURL=loginAsync.js.map