"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleErrorsAsync = handleErrorsAsync;

function _assert() {
  const data = require("assert");

  _assert = function () {
    return data;
  };

  return data;
}

function _chalk() {
  const data = _interopRequireDefault(require("chalk"));

  _chalk = function () {
    return data;
  };

  return data;
}

function _CommandError() {
  const data = require("../CommandError");

  _CommandError = function () {
    return data;
  };

  return data;
}

function _log() {
  const data = _interopRequireDefault(require("../log"));

  _log = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

async function handleErrorsAsync(err, {
  command = '[unknown]'
}) {
  // TODO: Find better ways to consolidate error messages
  if (err instanceof _CommandError().AbortCommandError || err instanceof _CommandError().SilentError) {// Do nothing when a prompt is cancelled or the error is logged in a pretty way.
  } else if (err.isCommandError || err.isPluginError || err instanceof _assert().AssertionError) {
    _log().default.error(err.message);
  } else if (err._isApiError) {
    _log().default.error(err.message);
  } else if (err.isXDLError || err.isConfigError) {
    _log().default.error(err.message);
  } else if (err.isJsonFileError || err.isPackageManagerError) {
    if (err.code === 'EJSONEMPTY') {
      // Empty JSON is an easy bug to debug. Often this is thrown for package.json or app.json being empty.
      _log().default.error(err.message);
    } else {
      _log().default.addNewLineIfNone();

      _log().default.error(err.message);

      const {
        formatStackTrace
      } = await Promise.resolve().then(() => _interopRequireWildcard(require('./formatStackTrace')));
      const stacktrace = formatStackTrace(err.stack, command);

      _log().default.error(_chalk().default.gray(stacktrace));
    }
  } else {
    _log().default.error(err.message);

    _log().default.error(_chalk().default.gray(err.stack));
  } //   process.exit(1);

}
//# sourceMappingURL=handleErrors.js.map