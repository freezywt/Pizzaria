"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = maybePromptToSyncPodsAsync;
exports.hasPackageJsonDependencyListChangedAsync = hasPackageJsonDependencyListChangedAsync;

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

function path() {
  const data = _interopRequireWildcard(require("path"));

  path = function () {
    return data;
  };

  return data;
}

function _CommandError() {
  const data = require("../../../CommandError");

  _CommandError = function () {
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

function _updatePackageJson() {
  const data = require("../../eject/updatePackageJson");

  _updatePackageJson = function () {
    return data;
  };

  return data;
}

function _CreateApp() {
  const data = require("../../utils/CreateApp");

  _CreateApp = function () {
    return data;
  };

  return data;
}

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getTempPrebuildFolder(projectRoot) {
  return path().join(projectRoot, '.expo', 'prebuild');
}

function hasNewDependenciesSinceLastBuild(projectRoot, packageChecksums) {
  // TODO: Maybe comparing lock files would be better...
  const tempDir = getTempPrebuildFolder(projectRoot);
  const tempPkgJsonPath = path().join(tempDir, 'cached-packages.json');

  if (!_fsExtra().default.pathExistsSync(tempPkgJsonPath)) {
    return true;
  }

  const {
    dependencies,
    devDependencies
  } = _jsonFile().default.read(tempPkgJsonPath); // Only change the dependencies if the normalized hash changes, this helps to reduce meaningless changes.


  const hasNewDependencies = packageChecksums.dependencies !== dependencies;
  const hasNewDevDependencies = packageChecksums.devDependencies !== devDependencies;
  return hasNewDependencies || hasNewDevDependencies;
}

function createPackageChecksums(pkg) {
  return {
    dependencies: (0, _updatePackageJson().hashForDependencyMap)(pkg.dependencies || {}),
    devDependencies: (0, _updatePackageJson().hashForDependencyMap)(pkg.devDependencies || {})
  };
}

async function hasPackageJsonDependencyListChangedAsync(projectRoot) {
  const pkg = (0, _config().getPackageJson)(projectRoot);
  const packages = createPackageChecksums(pkg);
  const hasNewDependencies = hasNewDependenciesSinceLastBuild(projectRoot, packages); // Cache package.json

  const tempDir = path().join(getTempPrebuildFolder(projectRoot), 'cached-packages.json');
  await _fsExtra().default.ensureFile(tempDir);
  await _jsonFile().default.writeAsync(tempDir, packages);
  return hasNewDependencies;
}

function doesProjectUseCocoaPods(projectRoot) {
  return _fsExtra().default.existsSync(path().join(projectRoot, 'ios', 'Podfile'));
}

function isLockfileCreated(projectRoot) {
  const podfileLockPath = path().join(projectRoot, 'ios', 'Podfile.lock');
  return _fsExtra().default.existsSync(podfileLockPath);
}

function isPodFolderCreated(projectRoot) {
  const podFolderPath = path().join(projectRoot, 'ios', 'Pods');
  return _fsExtra().default.existsSync(podFolderPath);
} // TODO: Same process but with app.config changes + default plugins.
// This will ensure the user is prompted for extra setup.


async function maybePromptToSyncPodsAsync(projectRoot) {
  if (!doesProjectUseCocoaPods(projectRoot)) {
    // Project does not use CocoaPods
    return;
  }

  if (!isLockfileCreated(projectRoot) || !isPodFolderCreated(projectRoot)) {
    if (!(await (0, _CreateApp().installCocoaPodsAsync)(projectRoot))) {
      throw new (_CommandError().AbortCommandError)();
    }

    return;
  } // Getting autolinked packages can be heavy, optimize around checking every time.


  if (!(await hasPackageJsonDependencyListChangedAsync(projectRoot))) {
    return;
  }

  await promptToInstallPodsAsync(projectRoot, []);
}

async function promptToInstallPodsAsync(projectRoot, missingPods) {
  if (missingPods !== null && missingPods !== void 0 && missingPods.length) {
    _log().default.log(`Could not find the following native modules: ${missingPods.map(pod => _chalk().default.bold(pod)).join(', ')}. Did you forget to run "${_chalk().default.bold('pod install')}" ?`);
  }

  try {
    if (!(await (0, _CreateApp().installCocoaPodsAsync)(projectRoot))) {
      throw new (_CommandError().AbortCommandError)();
    }
  } catch (error) {
    _fsExtra().default.removeSync(path().join(getTempPrebuildFolder(projectRoot), 'cached-packages.json'));

    throw error;
  }
}
//# sourceMappingURL=Podfile.js.map