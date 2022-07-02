"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isNonInteractive = isNonInteractive;

function _commander() {
  const data = _interopRequireDefault(require("commander"));

  _commander = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isNonInteractive() {
  return _commander().default.nonInteractive;
}
//# sourceMappingURL=environment.js.map