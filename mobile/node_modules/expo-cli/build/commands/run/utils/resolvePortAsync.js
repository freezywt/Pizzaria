"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolvePortAsync = resolvePortAsync;

function _getenv() {
  const data = _interopRequireDefault(require("getenv"));

  _getenv = function () {
    return data;
  };

  return data;
}

function _choosePortAsync() {
  const data = require("xdl/build/utils/choosePortAsync");

  _choosePortAsync = function () {
    return data;
  };

  return data;
}

function _log() {
  const data = _interopRequireDefault(require("../../../log"));

  _log = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function resolvePortAsync(projectRoot, {
  reuseExistingPort,
  defaultPort,
  fallbackPort
} = {}) {
  let port;

  if (typeof defaultPort === 'string') {
    port = parseInt(defaultPort, 10);
  } else if (typeof defaultPort === 'number') {
    port = defaultPort;
  } else {
    port = _getenv().default.int('RCT_METRO_PORT', fallbackPort || 8081);
  } // Only check the port when the bundler is running.


  const resolvedPort = await (0, _choosePortAsync().choosePortAsync)(projectRoot, {
    defaultPort: port,
    reuseExistingPort
  });

  if (resolvedPort == null) {
    _log().default.log('\u203A Skipping dev server'); // Skip bundling if the port is null

  } else {
    // Use the new or resolved port
    process.env.RCT_METRO_PORT = String(resolvedPort);
  }

  return resolvedPort;
}
//# sourceMappingURL=resolvePortAsync.js.map