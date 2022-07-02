"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSetupWarnings = getSetupWarnings;
exports.warnIfDependenciesRequireAdditionalSetup = warnIfDependenciesRequireAdditionalSetup;

function _prebuildConfig() {
  const data = require("@expo/prebuild-config");

  _prebuildConfig = function () {
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

function _semver() {
  const data = _interopRequireDefault(require("semver"));

  _semver = function () {
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

function _TerminalLink() {
  const data = require("../utils/TerminalLink");

  _TerminalLink = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Some packages are not configured automatically on eject and may require
 * users to add some code, eg: to their AppDelegate.
 */
function warnIfDependenciesRequireAdditionalSetup(pkg, sdkVersion, appliedPlugins) {
  const warnings = getSetupWarnings({
    pkg,
    sdkVersion,
    appliedPlugins: appliedPlugins !== null && appliedPlugins !== void 0 ? appliedPlugins : [],
    autoPlugins: (0, _prebuildConfig().getLegacyExpoPlugins)()
  });
  logSetupWarnings(warnings);
  return warnings;
} // Exposed for testing


function getSetupWarnings({
  pkg,
  sdkVersion,
  appliedPlugins,
  autoPlugins
}) {
  const pkgsWithExtraSetup = autoPlugins.filter(plugin => !(appliedPlugins !== null && appliedPlugins !== void 0 && appliedPlugins.includes(plugin))).reduce((prev, curr) => ({ ...prev,
    [curr]: `https://github.com/expo/expo/tree/master/packages/${curr}`
  }), {}); // Starting with SDK 40 the manifest is embedded in ejected apps automatically

  if (sdkVersion && _semver().default.lte(sdkVersion, '39.0.0')) {
    pkgsWithExtraSetup['expo-constants'] = `${_chalk().default.bold('Constants.manifest')} is not available in the bare workflow. You should replace it with ${_chalk().default.bold('Updates.manifest')}. ${_chalk().default.dim((0, _TerminalLink().learnMore)('https://docs.expo.dev/versions/latest/sdk/updates/#updatesmanifest'))}`;
  }

  const warnings = {};

  if (pkg.dependencies) {
    for (const key in pkg.dependencies) {
      if (key in pkgsWithExtraSetup) {
        warnings[key] = pkgsWithExtraSetup[key];
      }
    }
  }

  return warnings;
}

function logSetupWarnings(warnings) {
  const warningLength = Object.keys(warnings).length;

  if (!warningLength) {
    return;
  }

  _log().default.newLine();

  const warnAdditionalSetupStep = (0, _ora().logNewSection)('Checking if any additional setup steps are required for installed SDK packages.');
  const plural = warningLength > 1;
  warnAdditionalSetupStep.stopAndPersist({
    symbol: '⚠️ ',
    text: _chalk().default.yellow.bold(`The app has ${warningLength} package${plural ? 's' : ''} that require${plural ? '' : 's'} extra setup before building:`)
  });

  for (const [pkgName, message] of Object.entries(warnings)) {
    _log().default.nested(`\u203A ${_chalk().default.bold(pkgName)}: ${message}`);
  }
}
//# sourceMappingURL=setupWarnings.js.map