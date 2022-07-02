"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prebuildAsync = prebuildAsync;

function _tempy() {
  const data = _interopRequireDefault(require("tempy"));

  _tempy = function () {
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

function CreateApp() {
  const data = _interopRequireWildcard(require("../utils/CreateApp"));

  CreateApp = function () {
    return data;
  };

  return data;
}

function _configureProjectAsync() {
  const data = _interopRequireDefault(require("./configureProjectAsync"));

  _configureProjectAsync = function () {
    return data;
  };

  return data;
}

function _createNativeProjectsFromTemplateAsync() {
  const data = require("./createNativeProjectsFromTemplateAsync");

  _createNativeProjectsFromTemplateAsync = function () {
    return data;
  };

  return data;
}

function _ensureConfigAsync() {
  const data = require("./ensureConfigAsync");

  _ensureConfigAsync = function () {
    return data;
  };

  return data;
}

function _installNodeDependenciesAsync() {
  const data = require("./installNodeDependenciesAsync");

  _installNodeDependenciesAsync = function () {
    return data;
  };

  return data;
}

function _platformOptions() {
  const data = require("./platformOptions");

  _platformOptions = function () {
    return data;
  };

  return data;
}

function _resolveTemplate() {
  const data = require("./resolveTemplate");

  _resolveTemplate = function () {
    return data;
  };

  return data;
}

function _setupWarnings() {
  const data = require("./setupWarnings");

  _setupWarnings = function () {
    return data;
  };

  return data;
}

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Entry point into the prebuild process, delegates to other helpers to perform various steps.
 *
 * 1. Create native projects (ios, android)
 * 2. Install node modules
 * 3. Apply config to native projects
 * 4. Install CocoaPods
 */
async function prebuildAsync(projectRoot, {
  platforms,
  ...options
}) {
  var _managedConfig$_inter, _managedConfig$_inter2;

  platforms = (0, _platformOptions().ensureValidPlatforms)(platforms);
  (0, _platformOptions().assertPlatforms)(platforms);
  const {
    exp,
    pkg
  } = await (0, _ensureConfigAsync().ensureConfigAsync)({
    projectRoot,
    platforms
  });

  const tempDir = _tempy().default.directory();

  const {
    hasNewProjectFiles,
    needsPodInstall,
    hasNewDependencies
  } = await (0, _createNativeProjectsFromTemplateAsync().createNativeProjectsFromTemplateAsync)({
    projectRoot,
    exp,
    pkg,
    template: options.template != null ? (0, _resolveTemplate().resolveTemplateOption)(options.template) : undefined,
    tempDir,
    platforms,
    skipDependencyUpdate: options.skipDependencyUpdate
  }); // Install node modules

  const shouldInstall = (options === null || options === void 0 ? void 0 : options.install) !== false;
  const packageManager = CreateApp().resolvePackageManager({
    install: shouldInstall,
    npm: (options === null || options === void 0 ? void 0 : options.packageManager) === 'npm',
    yarn: (options === null || options === void 0 ? void 0 : options.packageManager) === 'yarn'
  });

  if (shouldInstall) {
    await (0, _installNodeDependenciesAsync().installNodeDependenciesAsync)(projectRoot, packageManager, {
      // We delete the dependencies when new ones are added because native packages are more fragile.
      // npm doesn't work well so we always run the cleaning step when npm is used in favor of yarn.
      clean: hasNewDependencies || packageManager === 'npm'
    });
  } // Apply Expo config to native projects


  const configSyncingStep = (0, _ora().logNewSection)('Config syncing');
  let managedConfig;

  try {
    managedConfig = await (0, _configureProjectAsync().default)({
      projectRoot,
      platforms
    });
    configSyncingStep.succeed('Config synced');
  } catch (error) {
    configSyncingStep.fail('Config sync failed');
    throw error;
  } // Install CocoaPods


  let podsInstalled = false; // err towards running pod install less because it's slow and users can easily run npx pod-install afterwards.

  if (platforms.includes('ios') && shouldInstall && needsPodInstall) {
    podsInstalled = await CreateApp().installCocoaPodsAsync(projectRoot);
  } else {
    _log().default.debug('Skipped pod install');
  }

  (0, _setupWarnings().warnIfDependenciesRequireAdditionalSetup)(pkg, exp.sdkVersion, Object.keys((_managedConfig$_inter = (_managedConfig$_inter2 = managedConfig._internal) === null || _managedConfig$_inter2 === void 0 ? void 0 : _managedConfig$_inter2.pluginHistory) !== null && _managedConfig$_inter !== void 0 ? _managedConfig$_inter : {}));
  return {
    packageManager,
    nodeInstall: options.install === false,
    podInstall: !podsInstalled,
    platforms,
    hasNewProjectFiles,
    exp
  };
}
//# sourceMappingURL=prebuildAppAsync.js.map