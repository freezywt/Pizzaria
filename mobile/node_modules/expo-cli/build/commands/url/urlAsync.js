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

function _CommandError() {
  const data = _interopRequireDefault(require("../../CommandError"));

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

function _urlOpts() {
  const data = _interopRequireDefault(require("../utils/urlOpts"));

  _urlOpts = function () {
    return data;
  };

  return data;
}

function _printRunInstructionsAsync() {
  const data = _interopRequireDefault(require("./printRunInstructionsAsync"));

  _printRunInstructionsAsync = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function actionAsync(projectRoot, options) {
  await _urlOpts().default.optsAsync(projectRoot, options);
  await assertProjectRunningAsync(projectRoot);
  const url = options.web ? await getWebAppUrlAsync(projectRoot) : await _xdl().UrlUtils.constructDeepLinkAsync(projectRoot);
  logUrl(url);

  if (!options.web) {
    await (0, _printRunInstructionsAsync().default)();
    await _urlOpts().default.handleMobileOptsAsync(projectRoot, options);
  }
}

async function assertProjectRunningAsync(projectRoot) {
  if ((await _xdl().ProjectSettings.getCurrentStatusAsync(projectRoot)) !== 'running') {
    throw new (_CommandError().default)('NOT_RUNNING', `Project is not running. Please start it with \`expo start\`.`);
  }
}

async function getWebAppUrlAsync(projectRoot) {
  const url = await _xdl().UrlUtils.constructWebAppUrlAsync(projectRoot);

  if (!url) {
    throw new (_CommandError().default)('NOT_RUNNING', `Webpack dev server is not running. Please start it with \`expo start:web\`.`);
  }

  return url;
}

function logUrl(url) {
  _log().default.newLine();

  _urlOpts().default.printQRCode(url);

  _log().default.log('Your URL is\n\n' + _chalk().default.underline(url) + '\n');
}
//# sourceMappingURL=urlAsync.js.map