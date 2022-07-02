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

function _CommandError() {
  const data = _interopRequireDefault(require("../../CommandError"));

  _CommandError = function () {
    return data;
  };

  return data;
}

function _IOSBuilder() {
  const data = _interopRequireDefault(require("./ios/IOSBuilder"));

  _IOSBuilder = function () {
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
  (0, _logBuildMigration().logBuildMigration)('ios');

  if (!options.skipWorkflowCheck) {
    if (await (0, _utils().maybeBailOnWorkflowWarning)({
      projectRoot,
      platform: 'ios',
      nonInteractive: _commander().default.nonInteractive
    })) {
      return;
    }
  }

  if (options.skipCredentialsCheck && options.clearCredentials) {
    throw new (_CommandError().default)("--skip-credentials-check and --clear-credentials can't be used together");
  }

  (0, _utils().assertPublicUrl)(options.publicUrl);
  (0, _utils().assertReleaseChannel)(options.releaseChannel);
  const iosBuilder = new (_IOSBuilder().default)(projectRoot, options);
  return iosBuilder.command();
}
//# sourceMappingURL=buildIosAsync.js.map