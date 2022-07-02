"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actionAsync = actionAsync;

function _chalk() {
  const data = _interopRequireDefault(require("chalk"));

  _chalk = function () {
    return data;
  };

  return data;
}

function _xdl() {
  const data = require("xdl");

  _xdl = function () {
    return data;
  };

  return data;
}

function _log() {
  const data = _interopRequireDefault(require("../../log"));

  _log = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function actionAsync(command) {
  const user = await _xdl().UserManager.getCurrentUserAsync({
    silent: true
  });

  if (user) {
    var _command$parent;

    if ((_command$parent = command.parent) !== null && _command$parent !== void 0 && _command$parent.nonInteractive) {
      _log().default.nested(user.username);
    } else {
      _log().default.log(`Logged in as ${_chalk().default.cyan(user.username)}`);
    }
  } else {
    _log().default.log(`\u203A Not logged in, run ${_chalk().default.cyan`expo login`} to authenticate`);

    process.exit(1);
  }
}
//# sourceMappingURL=whoamiAsync.js.map