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

function _xdl() {
  const data = require("xdl");

  _xdl = function () {
    return data;
  };

  return data;
}

function _CommandError() {
  const data = _interopRequireDefault(require("../../CommandError"));

  _CommandError = function () {
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

function _prompts() {
  const data = require("../../utils/prompts");

  _prompts = function () {
    return data;
  };

  return data;
}

function _ProjectUtils() {
  const data = require("../utils/ProjectUtils");

  _ProjectUtils = function () {
    return data;
  };

  return data;
}

function _maybeBailOnGitStatusAsync() {
  const data = _interopRequireDefault(require("../utils/maybeBailOnGitStatusAsync"));

  _maybeBailOnGitStatusAsync = function () {
    return data;
  };

  return data;
}

function _clearNativeFolder() {
  const data = require("./clearNativeFolder");

  _clearNativeFolder = function () {
    return data;
  };

  return data;
}

function _logNextSteps() {
  const data = require("./logNextSteps");

  _logNextSteps = function () {
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

function _prebuildAppAsync() {
  const data = require("./prebuildAppAsync");

  _prebuildAppAsync = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function userWantsToEjectWithoutUpgradingAsync() {
  const answer = await (0, _prompts().confirmAsync)({
    message: `We recommend upgrading to the latest SDK version before ejecting. SDK 37 introduces support for OTA updates and notifications in ejected projects, and includes many features that make ejecting your project easier. Would you like to continue ejecting anyways?`
  });
  return answer;
}
/**
 * Entry point into the eject process, delegates to other helpers to perform various steps.
 *
 * 1. Verify git is clean
 * 2. Prebuild the project
 * 3. Log project info
 */


async function ejectAsync(projectRoot, {
  platforms,
  ...options
}) {
  (0, _platformOptions().assertPlatforms)(platforms);
  if (await (0, _maybeBailOnGitStatusAsync().default)()) return;
  await (0, _clearNativeFolder().promptToClearMalformedNativeProjectsAsync)(projectRoot, platforms);
  const results = await (0, _prebuildAppAsync().prebuildAsync)(projectRoot, {
    platforms,
    ...options
  });
  const legacyUpdates = await (0, _ProjectUtils().usesOldExpoUpdatesAsync)(projectRoot);
  (0, _logNextSteps().logNextSteps)(results, {
    legacyUpdates
  });
}

async function actionAsync(projectRoot, {
  platform,
  ...options
}) {
  const {
    exp
  } = (0, _config().getConfig)(projectRoot);

  if (options.npm) {
    options.packageManager = 'npm';
  } // Set EXPO_VIEW_DIR to universe/exponent to pull expo view code locally instead of from S3 for ExpoKit


  if (_xdl().Versions.lteSdkVersion(exp, '36.0.0')) {
    if (options.force || (await userWantsToEjectWithoutUpgradingAsync())) {
      throw new (_CommandError().default)(`Ejecting to ExpoKit is now deprecated. Upgrade to Expo SDK +37 or downgrade to expo-cli@4.1.3`);
    }
  } else {
    _log().default.debug('Eject Mode: Latest');

    await ejectAsync(projectRoot, { ...options,
      platforms: (0, _platformOptions().platformsFromPlatform)(platform)
    });
  }
}
//# sourceMappingURL=ejectAsync.js.map