"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actionAsync = actionAsync;

function _config() {
  const data = require("@expo/config");

  _config = function () {
    return data;
  };

  return data;
}

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

function _fs() {
  const data = _interopRequireDefault(require("fs"));

  _fs = function () {
    return data;
  };

  return data;
}

function _path() {
  const data = _interopRequireDefault(require("path"));

  _path = function () {
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
  const data = _interopRequireDefault(require("../../../CommandError"));

  _CommandError = function () {
    return data;
  };

  return data;
}

function _StatusEventEmitter() {
  const data = _interopRequireDefault(require("../../../analytics/StatusEventEmitter"));

  _StatusEventEmitter = function () {
    return data;
  };

  return data;
}

function _getDevClientProperties() {
  const data = _interopRequireDefault(require("../../../analytics/getDevClientProperties"));

  _getDevClientProperties = function () {
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

function _clearNativeFolder() {
  const data = require("../../eject/clearNativeFolder");

  _clearNativeFolder = function () {
    return data;
  };

  return data;
}

function _prebuildAppAsync() {
  const data = require("../../eject/prebuildAppAsync");

  _prebuildAppAsync = function () {
    return data;
  };

  return data;
}

function _installExitHooks() {
  const data = require("../../start/installExitHooks");

  _installExitHooks = function () {
    return data;
  };

  return data;
}

function _profileMethod() {
  const data = require("../../utils/profileMethod");

  _profileMethod = function () {
    return data;
  };

  return data;
}

function _startBundlerAsync() {
  const data = require("../ios/startBundlerAsync");

  _startBundlerAsync = function () {
    return data;
  };

  return data;
}

function _resolvePortAsync() {
  const data = require("../utils/resolvePortAsync");

  _resolvePortAsync = function () {
    return data;
  };

  return data;
}

function _schemes() {
  const data = require("../utils/schemes");

  _schemes = function () {
    return data;
  };

  return data;
}

function _resolveDeviceAsync() {
  const data = require("./resolveDeviceAsync");

  _resolveDeviceAsync = function () {
    return data;
  };

  return data;
}

function _spawnGradleAsync() {
  const data = require("./spawnGradleAsync");

  _spawnGradleAsync = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function resolveAndroidProjectPathAsync(projectRoot) {
  try {
    return await _configPlugins().AndroidConfig.Paths.getProjectPathOrThrowAsync(projectRoot);
  } catch {
    // If the project doesn't have native code, prebuild it...
    await (0, _prebuildAppAsync().prebuildAsync)(projectRoot, {
      install: true,
      platforms: ['android']
    });
    return await _configPlugins().AndroidConfig.Paths.getProjectPathOrThrowAsync(projectRoot);
  }
}

async function attemptToGetApplicationIdFromGradleAsync(projectRoot) {
  try {
    const applicationIdFromGradle = await _configPlugins().AndroidConfig.Package.getApplicationIdAsync(projectRoot);

    if (applicationIdFromGradle) {
      _log().default.debug('Found Application ID in Gradle: ' + applicationIdFromGradle);

      return applicationIdFromGradle;
    }
  } catch {}

  return null;
}

async function resolveOptionsAsync(projectRoot, options) {
  var _await$attemptToGetAp;

  if (typeof options.variant !== 'string') {
    throw new (_CommandError().default)('--variant must be a string');
  }

  const device = await (0, _resolveDeviceAsync().resolveDeviceAsync)(options.device);

  if (!device) {
    throw new (_CommandError().default)('Cannot resolve an Android device');
  }

  const filePath = await _configPlugins().AndroidConfig.Paths.getAndroidManifestAsync(projectRoot);
  const androidManifest = await _configPlugins().AndroidConfig.Manifest.readAndroidManifestAsync(filePath); // Assert MainActivity defined.

  const activity = await _configPlugins().AndroidConfig.Manifest.getRunnableActivity(androidManifest);

  if (!activity) {
    throw new (_CommandError().default)(`${filePath} is missing a runnable activity element.`);
  } // Often this is ".MainActivity"


  const mainActivity = activity.$['android:name'];
  const packageName = // Try to get the application identifier from the gradle before checking the package name in the manifest.
  (_await$attemptToGetAp = await attemptToGetApplicationIdFromGradleAsync(projectRoot)) !== null && _await$attemptToGetAp !== void 0 ? _await$attemptToGetAp : androidManifest.manifest.$.package;

  if (!packageName) {
    throw new (_CommandError().default)(`Could not find package name in AndroidManifest.xml at "${filePath}"`);
  }

  let port = options.bundler ? await (0, _resolvePortAsync().resolvePortAsync)(projectRoot, {
    defaultPort: options.port,
    reuseExistingPort: true
  }) : null;
  options.bundler = !!port;

  if (!port) {
    // Skip bundling if the port is null
    // any random number
    port = 8081;
  } // TODO: why would this be different? Can we get the different name?


  const appName = 'app';

  const apkDirectory = _path().default.join(projectRoot, 'android', appName, 'build', 'outputs', 'apk'); // buildDeveloperTrust -> build, developer, trust (where developer, and trust are flavors).
  // This won't work for non-standard flavor names like "myFlavor" would be treated as "my", "flavor".


  const [buildType, ...flavors] = options.variant.split(/(?=[A-Z])/).map(v => v.toLowerCase());

  const buildDirectory = _path().default.join(apkDirectory, ...flavors, buildType);

  return { ...options,
    port,
    device,
    mainActivity,
    launchActivity: `${packageName}/${mainActivity}`,
    packageName,
    apkVariantDirectory: buildDirectory,
    appName,
    buildType,
    flavors
  };
}

async function actionAsync(projectRoot, options) {
  // If the user has an empty android folder then the project won't build, this can happen when they delete the prebuild files in git.
  // Check to ensure most of the core files are in place, and prompt to remove the folder if they aren't.
  await (0, _profileMethod().profileMethod)(_clearNativeFolder().promptToClearMalformedNativeProjectsAsync)(projectRoot, ['android']);
  const {
    exp
  } = (0, _config().getConfig)(projectRoot, {
    skipSDKVersionRequirement: true
  });
  track(projectRoot, exp);
  const androidProjectPath = await resolveAndroidProjectPathAsync(projectRoot);
  const props = await resolveOptionsAsync(projectRoot, options);

  _log().default.log('\u203A Building app...');

  await (0, _spawnGradleAsync().assembleAsync)({ ...props,
    androidProjectPath
  });
  await (0, _startBundlerAsync().setGlobalDevClientSettingsAsync)(projectRoot);

  if (props.bundler) {
    await (0, _startBundlerAsync().startBundlerAsync)(projectRoot, {
      metroPort: props.port,
      platforms: exp.platforms
    });
  }

  const apkFile = await getInstallApkNameAsync(props.device, props);

  _log().default.debug(`\u203A Installing: ${apkFile}`);

  if (apkFile) {
    const binaryPath = _path().default.join(props.apkVariantDirectory, apkFile);

    await _xdl().Android.installOnDeviceAsync(props.device, {
      binaryPath
    });
  } else {
    _log().default.log('\u203A Failed to locate binary file, installing with Gradle...');

    await (0, _spawnGradleAsync().installAsync)({ ...props,
      androidProjectPath
    });
  }

  const schemes = await (0, _schemes().getSchemesForAndroidAsync)(projectRoot);
  const result = await _xdl().Android.openProjectAsync({
    projectRoot,
    device: props.device,
    devClient: true,
    scheme: schemes[0],
    applicationId: props.packageName,
    launchActivity: props.launchActivity
  });

  if (!result.success) {
    throw new (_CommandError().default)(typeof result.error === 'string' ? result.error : result.error.message);
  }

  if (props.bundler) {
    // TODO: unify logs
    _log().default.nested(`\nLogs for your project will appear below. ${_chalk().default.dim(`Press Ctrl+C to exit.`)}`);
  }
}

function track(projectRoot, exp) {
  _xdl().UnifiedAnalytics.logEvent('dev client run command', {
    status: 'started',
    platform: 'android',
    ...(0, _getDevClientProperties().default)(projectRoot, exp)
  });

  _StatusEventEmitter().default.once('bundleBuildFinish', () => {
    // Send the 'bundle ready' event once the JS has been built.
    _xdl().UnifiedAnalytics.logEvent('dev client run command', {
      status: 'bundle ready',
      platform: 'android',
      ...(0, _getDevClientProperties().default)(projectRoot, exp)
    });
  });

  _StatusEventEmitter().default.once('deviceLogReceive', () => {
    // Send the 'ready' event once the app is running in a device.
    _xdl().UnifiedAnalytics.logEvent('dev client run command', {
      status: 'ready',
      platform: 'android',
      ...(0, _getDevClientProperties().default)(projectRoot, exp)
    });
  });

  (0, _installExitHooks().installCustomExitHook)(() => {
    _xdl().UnifiedAnalytics.logEvent('dev client run command', {
      status: 'finished',
      platform: 'android',
      ...(0, _getDevClientProperties().default)(projectRoot, exp)
    });

    _xdl().UnifiedAnalytics.flush();
  });
}

async function getInstallApkNameAsync(device, {
  appName,
  buildType,
  flavors,
  apkVariantDirectory
}) {
  const availableCPUs = await _xdl().Android.getDeviceABIsAsync(device);
  availableCPUs.push(_xdl().Android.DeviceABI.universal);

  _log().default.debug('Supported ABIs: ' + availableCPUs.join(', '));

  _log().default.debug('Searching for APK: ' + apkVariantDirectory); // Check for cpu specific builds first


  for (const availableCPU of availableCPUs) {
    const apkName = getApkFileName(appName, buildType, flavors, availableCPU);

    if (_fs().default.existsSync(_path().default.join(apkVariantDirectory, apkName))) {
      return apkName;
    }
  } // Otherwise use the default apk named after the variant: app-debug.apk


  const apkName = getApkFileName(appName, buildType, flavors);

  if (_fs().default.existsSync(_path().default.join(apkVariantDirectory, apkName))) {
    return apkName;
  }

  return null;
}

function getApkFileName(appName, buildType, flavors, cpuArch) {
  let apkName = `${appName}-`;

  if (flavors) {
    apkName += flavors.reduce((rest, flav) => `${rest}${flav}-`, '');
  }

  if (cpuArch) {
    apkName += `${cpuArch}-`;
  }

  apkName += `${buildType}.apk`;
  return apkName;
}
//# sourceMappingURL=runAndroid.js.map