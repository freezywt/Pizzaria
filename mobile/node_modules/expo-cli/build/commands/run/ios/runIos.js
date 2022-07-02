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

function _binaryPlist() {
  const data = require("../utils/binaryPlist");

  _binaryPlist = function () {
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

function IOSDeploy() {
  const data = _interopRequireWildcard(require("./IOSDeploy"));

  IOSDeploy = function () {
    return data;
  };

  return data;
}

function _Podfile() {
  const data = _interopRequireDefault(require("./Podfile"));

  _Podfile = function () {
    return data;
  };

  return data;
}

function XcodeBuild() {
  const data = _interopRequireWildcard(require("./XcodeBuild"));

  XcodeBuild = function () {
    return data;
  };

  return data;
}

function _installOnDeviceAsync() {
  const data = require("./installOnDeviceAsync");

  _installOnDeviceAsync = function () {
    return data;
  };

  return data;
}

function _resolveOptionsAsync() {
  const data = require("./resolveOptionsAsync");

  _resolveOptionsAsync = function () {
    return data;
  };

  return data;
}

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const isMac = process.platform === 'darwin';

async function actionAsync(projectRoot, options) {
  // If the user has an empty ios folder then the project won't build, this can happen when they delete the prebuild files in git.
  // Check to ensure most of the core files are in place, and prompt to remove the folder if they aren't.
  await (0, _profileMethod().profileMethod)(_clearNativeFolder().promptToClearMalformedNativeProjectsAsync)(projectRoot, ['ios']);
  const {
    exp
  } = (0, _config().getConfig)(projectRoot, {
    skipSDKVersionRequirement: true
  });
  track(projectRoot, exp);

  if (!isMac) {
    // TODO: Prompt to use EAS?
    _log().default.warn(`iOS apps can only be built on macOS devices. Use ${_chalk().default.cyan`eas build -p ios`} to build in the cloud.`);

    return;
  } // If the project doesn't have native code, prebuild it...


  if (!_fsExtra().default.existsSync(path().join(projectRoot, 'ios'))) {
    await (0, _prebuildAppAsync().prebuildAsync)(projectRoot, {
      install: options.install,
      platforms: ['ios']
    });
  } else if (options.install) {
    await (0, _Podfile().default)(projectRoot); // TODO: Ensure the pods are in sync -- https://github.com/expo/expo/pull/11593
  }

  const props = await (0, _resolveOptionsAsync().resolveOptionsAsync)(projectRoot, options);

  if (!props.isSimulator) {
    if (_xdl().AppleDevice.isEnabled()) {
      _log().default.log(_chalk().default.gray(`\u203A Unstable feature ${_chalk().default.bold`EXPO_USE_APPLE_DEVICE`} is enabled. Device installation may not work as expected.`));
    } else {
      // Assert as early as possible
      await IOSDeploy().assertInstalledAsync();
    }
  }

  const buildOutput = await (0, _profileMethod().profileMethod)(XcodeBuild().buildAsync, 'XcodeBuild.buildAsync')(props);
  const binaryPath = await (0, _profileMethod().profileMethod)(XcodeBuild().getAppBinaryPath, 'XcodeBuild.getAppBinaryPath')(buildOutput);
  await (0, _startBundlerAsync().setGlobalDevClientSettingsAsync)(projectRoot);

  if (props.shouldStartBundler) {
    await (0, _startBundlerAsync().startBundlerAsync)(projectRoot, {
      metroPort: props.port,
      platforms: exp.platforms
    });
  }

  const bundleIdentifier = await (0, _profileMethod().profileMethod)(getBundleIdentifierForBinaryAsync)(binaryPath);

  if (props.isSimulator) {
    XcodeBuild().logPrettyItem(`${_chalk().default.bold`Installing`} on ${props.device.name}`);
    await _xdl().SimControl.installAsync({
      udid: props.device.udid,
      dir: binaryPath
    });
    await openInSimulatorAsync({
      projectRoot,
      bundleIdentifier,
      device: props.device,
      shouldStartBundler: props.shouldStartBundler
    });
  } else {
    await (0, _profileMethod().profileMethod)(_installOnDeviceAsync().installOnDeviceAsync)({
      bundleIdentifier,
      bundle: binaryPath,
      appDeltaDirectory: (0, _installOnDeviceAsync().getAppDeltaDirectory)(bundleIdentifier),
      udid: props.device.udid,
      deviceName: props.device.name
    });
  }

  if (props.shouldStartBundler) {
    _log().default.nested(`\nLogs for your project will appear below. ${_chalk().default.dim(`Press Ctrl+C to exit.`)}`);
  }
}

function track(projectRoot, exp) {
  _xdl().UnifiedAnalytics.logEvent('dev client run command', {
    status: 'started',
    platform: 'ios',
    ...(0, _getDevClientProperties().default)(projectRoot, exp)
  });

  _StatusEventEmitter().default.once('bundleBuildFinish', () => {
    // Send the 'bundle ready' event once the JS has been built.
    _xdl().UnifiedAnalytics.logEvent('dev client run command', {
      status: 'bundle ready',
      platform: 'ios',
      ...(0, _getDevClientProperties().default)(projectRoot, exp)
    });
  });

  _StatusEventEmitter().default.once('deviceLogReceive', () => {
    // Send the 'ready' event once the app is running in a device.
    _xdl().UnifiedAnalytics.logEvent('dev client run command', {
      status: 'ready',
      platform: 'ios',
      ...(0, _getDevClientProperties().default)(projectRoot, exp)
    });
  });

  (0, _installExitHooks().installCustomExitHook)(() => {
    _xdl().UnifiedAnalytics.logEvent('dev client run command', {
      status: 'finished',
      platform: 'ios',
      ...(0, _getDevClientProperties().default)(projectRoot, exp)
    });

    _xdl().UnifiedAnalytics.flush();
  });
}

async function getBundleIdentifierForBinaryAsync(binaryPath) {
  const builtInfoPlistPath = path().join(binaryPath, 'Info.plist');
  const {
    CFBundleIdentifier
  } = await (0, _binaryPlist().parseBinaryPlistAsync)(builtInfoPlistPath);
  return CFBundleIdentifier;
}

async function openInSimulatorAsync({
  projectRoot,
  bundleIdentifier,
  device,
  shouldStartBundler
}) {
  XcodeBuild().logPrettyItem(`${_chalk().default.bold`Opening`} on ${device.name} ${_chalk().default.dim(`(${bundleIdentifier})`)}`);

  if (shouldStartBundler) {
    await _xdl().Simulator.streamLogsAsync({
      udid: device.udid,
      bundleIdentifier
    });
  }

  const schemes = await (0, _schemes().getSchemesForIosAsync)(projectRoot);
  const result = await _xdl().Simulator.openProjectAsync({
    projectRoot,
    udid: device.udid,
    devClient: true,
    scheme: schemes[0],
    applicationId: bundleIdentifier,
    // We always setup native logs before launching to ensure we catch any fatal errors.
    skipNativeLogs: true
  });

  if (!result.success) {
    throw new (_CommandError().default)(result.error);
  }
}
//# sourceMappingURL=runIos.js.map