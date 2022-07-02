"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getDevClientProperties;

function _config() {
  const data = require("@expo/config");

  _config = function () {
    return data;
  };

  return data;
}

function _jsonFile() {
  const data = _interopRequireDefault(require("@expo/json-file"));

  _jsonFile = function () {
    return data;
  };

  return data;
}

function _memoize() {
  const data = _interopRequireDefault(require("lodash/memoize"));

  _memoize = function () {
    return data;
  };

  return data;
}

function _resolveFrom() {
  const data = _interopRequireDefault(require("resolve-from"));

  _resolveFrom = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getAccountName = (0, _memoize().default)(exp => {
  return (0, _config().getAccountUsername)(exp);
});
const getDevClientVersion = (0, _memoize().default)(projectRoot => {
  try {
    const devClientPackage = _resolveFrom().default.silent(projectRoot, 'expo-dev-client/package.json');

    if (devClientPackage) {
      return _jsonFile().default.read(devClientPackage).version;
    }
  } catch {}

  return undefined;
});
const getProjectType = (0, _memoize().default)(projectRoot => {
  return (0, _config().getDefaultTarget)(projectRoot) === 'managed' ? 'managed' : 'generic';
});

function getDevClientProperties(projectRoot, exp) {
  return {
    account_name: getAccountName({
      owner: exp.owner
    }),
    dev_client_version: getDevClientVersion(projectRoot),
    project_type: getProjectType(projectRoot),
    uptime_ms: process.uptime() * 1000
  };
}
//# sourceMappingURL=getDevClientProperties.js.map