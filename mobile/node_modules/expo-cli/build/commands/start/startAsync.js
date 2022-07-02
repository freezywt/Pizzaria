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

function _path() {
  const data = _interopRequireDefault(require("path"));

  _path = function () {
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

function _xdl() {
  const data = require("xdl");

  _xdl = function () {
    return data;
  };

  return data;
}

function _StatusEventEmitter() {
  const data = _interopRequireDefault(require("../../analytics/StatusEventEmitter"));

  _StatusEventEmitter = function () {
    return data;
  };

  return data;
}

function _getDevClientProperties() {
  const data = _interopRequireDefault(require("../../analytics/getDevClientProperties"));

  _getDevClientProperties = function () {
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

function _deprecatedExtensionWarnings() {
  const data = require("../utils/deprecatedExtensionWarnings");

  _deprecatedExtensionWarnings = function () {
    return data;
  };

  return data;
}

function _profileMethod() {
  const data = require("../utils/profileMethod");

  _profileMethod = function () {
    return data;
  };

  return data;
}

function sendTo() {
  const data = _interopRequireWildcard(require("../utils/sendTo"));

  sendTo = function () {
    return data;
  };

  return data;
}

function _ensureTypeScriptSetup() {
  const data = require("../utils/typescript/ensureTypeScriptSetup");

  _ensureTypeScriptSetup = function () {
    return data;
  };

  return data;
}

function _urlOpts() {
  const data = _interopRequireDefault(require("../utils/urlOpts"));

  _urlOpts = function () {
    return data;
  };

  return data;
}

function _validateDependenciesVersions() {
  const data = require("../utils/validateDependenciesVersions");

  _validateDependenciesVersions = function () {
    return data;
  };

  return data;
}

function _ensureWebSetup() {
  const data = require("../utils/web/ensureWebSetup");

  _ensureWebSetup = function () {
    return data;
  };

  return data;
}

function TerminalUI() {
  const data = _interopRequireWildcard(require("./TerminalUI"));

  TerminalUI = function () {
    return data;
  };

  return data;
}

function _installExitHooks() {
  const data = require("./installExitHooks");

  _installExitHooks = function () {
    return data;
  };

  return data;
}

function _openDevTools() {
  const data = require("./openDevTools");

  _openDevTools = function () {
    return data;
  };

  return data;
}

function _parseStartOptions() {
  const data = require("./parseStartOptions");

  _parseStartOptions = function () {
    return data;
  };

  return data;
}

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function actionAsync(projectRoot, options) {
  _log().default.log(_chalk().default.gray(`Starting project at ${projectRoot}`)); // Add clean up hooks


  (0, _installExitHooks().installExitHooks)(projectRoot); // Only validate expo in Expo Go contexts

  if (!options.devClient) {
    // Find expo binary in project/workspace node_modules
    const hasExpoInstalled = _resolveFrom().default.silent(projectRoot, 'expo');

    if (!hasExpoInstalled) {
      throw new (_config().ConfigError)(`Unable to find expo in this project - have you run yarn / npm install yet?`, 'MODULE_NOT_FOUND');
    }
  }

  const {
    exp,
    pkg
  } = (0, _profileMethod().profileMethod)(_config().getConfig)(projectRoot, {
    skipSDKVersionRequirement: options.webOnly || options.devClient
  });

  if (options.web || options.webOnly) {
    await (0, _ensureWebSetup().ensureWebSupportSetupAsync)(projectRoot);
  }

  if (options.devClient) {
    track(projectRoot, exp);
  } // Assert various random things
  // TODO: split up this method


  await (0, _profileMethod().profileMethod)(_urlOpts().default.optsAsync)(projectRoot, options); // TODO: This is useless on mac, check if useless on win32

  const rootPath = _path().default.resolve(projectRoot); // Optionally open the developer tools UI.


  await (0, _profileMethod().profileMethod)(_openDevTools().tryOpeningDevToolsAsync)(rootPath, {
    exp,
    options
  });

  if (_xdl().Versions.gteSdkVersion(exp, '34.0.0')) {
    await (0, _profileMethod().profileMethod)(_ensureTypeScriptSetup().ensureTypeScriptSetupAsync)(projectRoot);
  }

  if (!options.webOnly) {
    // TODO: only validate dependencies if starting in managed workflow
    await (0, _profileMethod().profileMethod)(_validateDependenciesVersions().validateDependenciesVersionsAsync)(projectRoot, exp, pkg); // Warn about expo extensions.

    if (!(0, _config().isLegacyImportsEnabled)(exp)) {
      // Adds a few seconds in basic projects so we should
      // drop this in favor of the upgrade version as soon as possible.
      await (0, _profileMethod().profileMethod)(_deprecatedExtensionWarnings().assertProjectHasExpoExtensionFilesAsync)(projectRoot);
    }
  }

  const startOptions = (0, _profileMethod().profileMethod)(_parseStartOptions().parseStartOptions)(options, exp);

  _xdl().LoadingPageHandler.setOnDeepLink(async (projectRoot, isDevClient, platform) => {
    if (!isDevClient) {
      return;
    }

    const {
      exp
    } = (0, _config().getConfig)(projectRoot, {
      skipSDKVersionRequirement: true
    });

    _StatusEventEmitter().default.once('deviceLogReceive', () => {
      // Send the 'ready' event once the app is running in a device.
      _xdl().UnifiedAnalytics.logEvent('dev client start command', {
        status: 'ready',
        platform,
        ...(0, _getDevClientProperties().default)(projectRoot, exp)
      });
    });

    _xdl().UnifiedAnalytics.logEvent('dev client start command', {
      status: 'started',
      platform,
      ...(0, _getDevClientProperties().default)(projectRoot, exp)
    });
  });

  await (0, _profileMethod().profileMethod)(_xdl().Project.startAsync)(rootPath, { ...startOptions,
    exp
  }); // Send to option...

  const url = await (0, _profileMethod().profileMethod)(_xdl().UrlUtils.constructDeepLinkAsync, 'UrlUtils.constructDeepLinkAsync')(projectRoot).catch(error => {
    // TODO: Maybe there's a better way to do this
    if (!options.devClient || error.code !== 'NO_DEV_CLIENT_SCHEME') {
      throw error;
    }

    return null;
  });

  if (options.sendTo) {
    if (url) {
      const recipient = await (0, _profileMethod().profileMethod)(sendTo().getRecipient)(options.sendTo);

      if (recipient) {
        await sendTo().sendUrlAsync(url, recipient);
      }
    } else {
      _log().default.warn('Cannot send URL because the linking URI cannot be resolved');
    }
  } // Open project on devices.


  await (0, _profileMethod().profileMethod)(_urlOpts().default.handleMobileOptsAsync)(projectRoot, options); // Present the Terminal UI.

  const isTerminalUIEnabled = !options.nonInteractive && !exp.isDetached;

  if (isTerminalUIEnabled) {
    await (0, _profileMethod().profileMethod)(TerminalUI().startAsync, 'TerminalUI.startAsync')(projectRoot, startOptions);
  } else if (url) {
    if (!exp.isDetached) {
      _log().default.newLine();

      _urlOpts().default.printQRCode(url);
    }

    _log().default.log(`Your native app is running at ${_chalk().default.underline(url)}`);
  } // Final note about closing the server.


  if (!options.webOnly) {
    _log().default.nested(`Logs for your project will appear below. ${_chalk().default.dim(`Press Ctrl+C to exit.`)}`);
  } else {
    _log().default.nested(`\nLogs for your project will appear in the browser console. ${_chalk().default.dim(`Press Ctrl+C to exit.`)}`);
  }

  if (options.devClient) {
    _xdl().UnifiedAnalytics.logEvent('dev client start command', {
      status: 'ready',
      ...(0, _getDevClientProperties().default)(projectRoot, exp)
    });
  }
}

function track(projectRoot, exp) {
  _xdl().UnifiedAnalytics.logEvent('dev client start command', {
    status: 'started',
    ...(0, _getDevClientProperties().default)(projectRoot, exp)
  });

  (0, _installExitHooks().installCustomExitHook)(() => {
    _xdl().UnifiedAnalytics.logEvent('dev client start command', {
      status: 'finished',
      ...(0, _getDevClientProperties().default)(projectRoot, exp)
    });

    _xdl().UnifiedAnalytics.flush();
  });
}
//# sourceMappingURL=startAsync.js.map