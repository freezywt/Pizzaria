"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAppDeltaDirectory = getAppDeltaDirectory;
exports.installOnDeviceAsync = installOnDeviceAsync;

function _chalk() {
  const data = _interopRequireDefault(require("chalk"));

  _chalk = function () {
    return data;
  };

  return data;
}

function _commander() {
  const data = _interopRequireDefault(require("commander"));

  _commander = function () {
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

function _os() {
  const data = _interopRequireDefault(require("os"));

  _os = function () {
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

function _ora() {
  const data = require("../../../utils/ora");

  _ora = function () {
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

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Get the app_delta folder for faster subsequent rebuilds on devices.
 *
 * @param bundleId
 * @returns
 */
function getAppDeltaDirectory(bundleId) {
  // TODO: Maybe use .expo folder instead for debugging
  // TODO: Reuse existing folder from xcode?
  const deltaFolder = _path().default.join(_os().default.tmpdir(), 'ios', 'app-delta', bundleId);

  _fsExtra().default.ensureDirSync(deltaFolder);

  return deltaFolder;
} // To debug: `export DEBUG=expo:xdl:*`


async function installOnDeviceAsync(props) {
  if (!_xdl().AppleDevice.isEnabled()) {
    return await IOSDeploy().installOnDeviceAsync(props);
  }

  const {
    bundle,
    bundleIdentifier,
    appDeltaDirectory,
    udid,
    deviceName
  } = props;
  let indicator;

  try {
    // TODO: Connect for logs
    await _xdl().AppleDevice.runOnDevice({
      udid,
      appPath: bundle,
      bundleId: bundleIdentifier,
      waitForApp: false,
      deltaPath: appDeltaDirectory,

      onProgress({
        status,
        isComplete,
        progress
      }) {
        if (!indicator) {
          indicator = (0, _ora().ora)(status).start();
        }

        indicator.text = `${_chalk().default.bold(status)} ${progress}%`;

        if (isComplete) {
          indicator.succeed();
        }
      }

    });
  } catch (err) {
    if (indicator) {
      indicator.fail();
    }

    if (err.code === 'DeviceLocked') {
      var _path$basename$split$;

      // Get the app name from the binary path.
      const appName = (_path$basename$split$ = _path().default.basename(bundle).split('.')[0]) !== null && _path$basename$split$ !== void 0 ? _path$basename$split$ : 'app';

      if (!_commander().default.nonInteractive && (await _xdl().Prompts.confirmAsync({
        message: `Cannot launch ${appName} because the device is locked. Unlock ${deviceName} to continue...`,
        initial: true
      }))) {
        return installOnDeviceAsync(props);
      }

      throw new (_CommandError().default)(`Cannot launch ${appName} on ${deviceName} because the device is locked.`);
    }

    throw err;
  }
}
//# sourceMappingURL=installOnDeviceAsync.js.map