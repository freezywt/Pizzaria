"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actionAsync = actionAsync;

function _commander() {
  const data = _interopRequireDefault(require("commander"));

  _commander = function () {
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

function _AndroidBuilder() {
  const data = _interopRequireDefault(require("./AndroidBuilder"));

  _AndroidBuilder = function () {
    return data;
  };

  return data;
}

function _logBuildMigration() {
  const data = require("./logBuildMigration");

  _logBuildMigration = function () {
    return data;
  };

  return data;
}

function _utils() {
  const data = require("./utils");

  _utils = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function actionAsync(projectRoot, options) {
  (0, _logBuildMigration().logBuildMigration)('android');

  if (options.generateKeystore) {
    _log().default.warn(`The --generate-keystore flag is deprecated and does not do anything. A Keystore will always be generated on the Expo servers if it's missing.`);
  }

  if (!options.skipWorkflowCheck) {
    if (await (0, _utils().maybeBailOnWorkflowWarning)({
      projectRoot,
      platform: 'android',
      nonInteractive: _commander().default.nonInteractive
    })) {
      return;
    }
  }

  (0, _utils().assertPublicUrl)(options.publicUrl);
  (0, _utils().assertReleaseChannel)(options.releaseChannel);
  const androidBuilder = new (_AndroidBuilder().default)(projectRoot, options);
  return androidBuilder.command();
}
//# sourceMappingURL=buildAndroidAsync.js.map