"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearNativeFolder = clearNativeFolder;
exports.directoryExistsAsync = directoryExistsAsync;
exports.hasRequiredAndroidFilesAsync = hasRequiredAndroidFilesAsync;
exports.hasRequiredIOSFilesAsync = hasRequiredIOSFilesAsync;
exports.promptToClearMalformedNativeProjectsAsync = promptToClearMalformedNativeProjectsAsync;

function _configPlugins() {
  const data = require("@expo/config-plugins");

  _configPlugins = function () {
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

function fs() {
  const data = _interopRequireWildcard(require("fs-extra"));

  fs = function () {
    return data;
  };

  return data;
}

function path() {
  const data = _interopRequireWildcard(require("path"));

  path = function () {
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

function _ora() {
  const data = require("../../utils/ora");

  _ora = function () {
    return data;
  };

  return data;
}

function _prompts() {
  const data = require("../../utils/prompts");

  _prompts = function () {
    return data;
  };

  return data;
}

function _environment() {
  const data = require("../utils/environment");

  _environment = function () {
    return data;
  };

  return data;
}

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function directoryExistsAsync(file) {
  var _await$fs$stat$catch$, _await$fs$stat$catch;

  return (_await$fs$stat$catch$ = (_await$fs$stat$catch = await fs().stat(file).catch(() => null)) === null || _await$fs$stat$catch === void 0 ? void 0 : _await$fs$stat$catch.isDirectory()) !== null && _await$fs$stat$catch$ !== void 0 ? _await$fs$stat$catch$ : false;
}

async function clearNativeFolder(projectRoot, folders) {
  const step = (0, _ora().logNewSection)(`Clearing ${folders.join(', ')}`);

  try {
    await Promise.all(folders.map(folderName => fs().remove(path().join(projectRoot, folderName))));
    step.succeed(`Cleared ${folders.join(', ')} code`);
  } catch (error) {
    step.fail(`Failed to delete ${folders.join(', ')} code: ${error.message}`);
    throw error;
  }
}

async function hasRequiredAndroidFilesAsync(projectRoot) {
  try {
    await Promise.all([_configPlugins().AndroidConfig.Paths.getAppBuildGradleAsync(projectRoot), _configPlugins().AndroidConfig.Paths.getProjectBuildGradleAsync(projectRoot), _configPlugins().AndroidConfig.Paths.getAndroidManifestAsync(projectRoot), _configPlugins().AndroidConfig.Paths.getMainApplicationAsync(projectRoot)]);
    return true;
  } catch {
    return false;
  }
}

async function isAndroidProjectValidAsync(projectRoot) {
  // Only perform the check if the native folder is present.
  if (!(await directoryExistsAsync(path().join(projectRoot, 'android')))) {
    return true;
  }

  return hasRequiredAndroidFilesAsync(projectRoot);
}

async function hasRequiredIOSFilesAsync(projectRoot) {
  try {
    // If any of the following required files are missing, then the project is malformed.
    await Promise.all([_configPlugins().IOSConfig.Paths.getAppDelegate(projectRoot), _configPlugins().IOSConfig.Paths.getAllXcodeProjectPaths(projectRoot), _configPlugins().IOSConfig.Paths.getAllInfoPlistPaths(projectRoot), _configPlugins().IOSConfig.Paths.getAllPBXProjectPaths(projectRoot)]);
    return true;
  } catch {
    return false;
  }
}

async function isIOSProjectValidAsync(projectRoot) {
  // Only perform the check if the native folder is present.
  if (!(await directoryExistsAsync(path().join(projectRoot, 'ios')))) {
    return true;
  }

  return hasRequiredIOSFilesAsync(projectRoot);
}

async function promptToClearMalformedNativeProjectsAsync(projectRoot, checkPlatforms) {
  const [isAndroidValid, isIOSValid] = await Promise.all([checkPlatforms.includes('android') ? isAndroidProjectValidAsync(projectRoot) : Promise.resolve(true), checkPlatforms.includes('ios') ? isIOSProjectValidAsync(projectRoot) : Promise.resolve(true)]);

  if (isAndroidValid && isIOSValid) {
    return;
  }

  const platforms = [!isAndroidValid && 'android', !isIOSValid && 'ios'].filter(Boolean);
  const displayPlatforms = platforms.map(platform => _chalk().default.cyan(platform)); // Prompt which platforms to reset.

  const message = platforms.length > 1 ? `The ${displayPlatforms[0]} and ${displayPlatforms[1]} projects are malformed` : `The ${displayPlatforms[0]} project is malformed`;

  if ( // If the process is non-interactive, default to clearing the malformed native project.
  // This would only happen on re-running eject.
  (0, _environment().isNonInteractive)() || ( // Prompt to clear the native folders.
  await (0, _prompts().confirmAsync)({
    message: `${message}, would you like to clear the project files and reinitialize them?`,
    initial: true
  }))) {
    await clearNativeFolder(projectRoot, platforms);
  } else {
    // Warn the user that the process may fail.
    _log().default.warn('Continuing with malformed native projects');
  }
}
//# sourceMappingURL=clearNativeFolder.js.map