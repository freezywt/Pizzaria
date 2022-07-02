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

function _terminalLink() {
  const data = _interopRequireDefault(require("terminal-link"));

  _terminalLink = function () {
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

function _CommandError() {
  const data = require("../../CommandError");

  _CommandError = function () {
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

async function actionAsync(projectRoot, options) {
  try {
    await _xdl().Detach.bundleAssetsAsync(projectRoot, options);
  } catch (e) {
    _log().default.error(e);

    _log().default.error(`Before making a release build, make sure you have run '${_chalk().default.bold('expo publish')}' at least once. ${(0, _terminalLink().default)('Learn more.', 'https://expo.fyi/release-builds-with-expo-updates')}`);

    throw new (_CommandError().SilentError)(e);
  }
}
//# sourceMappingURL=bundleAssetsAsync.js.map