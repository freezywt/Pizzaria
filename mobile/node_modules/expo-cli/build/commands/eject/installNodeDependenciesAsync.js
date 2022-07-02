"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.installNodeDependenciesAsync = installNodeDependenciesAsync;

function _chalk() {
  const data = _interopRequireDefault(require("chalk"));

  _chalk = function () {
    return data;
  };

  return data;
}

function _fsExtra() {
  const data = _interopRequireDefault(require("fs-extra"));

  _fsExtra = function () {
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

function _ora() {
  const data = require("../../utils/ora");

  _ora = function () {
    return data;
  };

  return data;
}

function CreateApp() {
  const data = _interopRequireWildcard(require("../utils/CreateApp"));

  CreateApp = function () {
    return data;
  };

  return data;
}

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Wraps PackageManager to install node modules and adds CLI logs.
 *
 * @param projectRoot
 */
async function installNodeDependenciesAsync(projectRoot, packageManager, {
  clean = true
}) {
  if (clean && packageManager !== 'yarn') {
    // This step can take a couple seconds, if the installation logs are enabled (with EXPO_DEBUG) then it
    // ends up looking odd to see "Installing JavaScript dependencies" for ~5 seconds before the logs start showing up.
    const cleanJsDepsStep = (0, _ora().logNewSection)('Cleaning JavaScript dependencies');
    const time = Date.now(); // nuke the node modules
    // TODO: this is substantially slower, we should find a better alternative to ensuring the modules are installed.

    await _fsExtra().default.remove('node_modules');
    cleanJsDepsStep.succeed(`Cleaned JavaScript dependencies ${_chalk().default.gray(Date.now() - time + 'ms')}`);
  }

  const installJsDepsStep = (0, _ora().logNewSection)('Installing JavaScript dependencies');

  try {
    const time = Date.now();
    await CreateApp().installNodeDependenciesAsync(projectRoot, packageManager);
    installJsDepsStep.succeed(`Installed JavaScript dependencies ${_chalk().default.gray(Date.now() - time + 'ms')}`);
  } catch {
    const message = `Something went wrong installing JavaScript dependencies, check your ${packageManager} logfile or run ${_chalk().default.bold(`${packageManager} install`)} again manually.`;
    installJsDepsStep.fail(_chalk().default.red(message)); // TODO: actually show the error message from the package manager! :O

    throw new (_CommandError().SilentError)(message);
  }
}
//# sourceMappingURL=installNodeDependenciesAsync.js.map