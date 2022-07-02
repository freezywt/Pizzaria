"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applyAnyAsyncAction = applyAnyAsyncAction;
exports.applyAsyncAction = applyAsyncAction;
exports.applyAsyncActionProjectDir = applyAsyncActionProjectDir;

function _assert() {
  const data = _interopRequireDefault(require("assert"));

  _assert = function () {
    return data;
  };

  return data;
}

function _profileMethod() {
  const data = require("../utils/profileMethod");

  _profileMethod = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function applyAsyncActionProjectDir(command, resolve, settings) {
  command.asyncActionProjectDir(async (projectRoot, options) => {
    const mod = await resolve();
    return (0, _profileMethod().profileMethod)(mod.actionAsync)(projectRoot, options);
  }, settings);
}

function applyAsyncAction(command, resolve) {
  command.asyncAction(async (args, options) => {
    const mod = await resolve();
    return (0, _profileMethod().profileMethod)(mod.actionAsync)(args, options);
  });
}

function applyAnyAsyncAction(command, resolve) {
  command.asyncAction(async options => {
    (0, _assert().default)(typeof options !== 'string', 'Unexpected string passed to command');
    const mod = await resolve();
    return (0, _profileMethod().profileMethod)(mod.actionAsync)(options);
  });
}
//# sourceMappingURL=applyAsyncAction.js.map