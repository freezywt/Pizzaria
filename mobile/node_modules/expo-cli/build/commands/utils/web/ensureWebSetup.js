"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createInstallCommand = createInstallCommand;
exports.ensureWebSupportSetupAsync = ensureWebSupportSetupAsync;
exports.isWebPlatformExcluded = isWebPlatformExcluded;
exports.shouldSetupWebSupportAsync = shouldSetupWebSupportAsync;

function _config() {
  const data = require("@expo/config");

  _config = function () {
    return data;
  };

  return data;
}

function PackageManager() {
  const data = _interopRequireWildcard(require("@expo/package-manager"));

  PackageManager = function () {
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

function _commander() {
  const data = _interopRequireDefault(require("commander"));

  _commander = function () {
    return data;
  };

  return data;
}

function _getenv() {
  const data = require("getenv");

  _getenv = function () {
    return data;
  };

  return data;
}

function _wrapAnsi() {
  const data = _interopRequireDefault(require("wrap-ansi"));

  _wrapAnsi = function () {
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

function _log() {
  const data = _interopRequireDefault(require("../../../log"));

  _log = function () {
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

function _prompts() {
  const data = require("../../../utils/prompts");

  _prompts = function () {
    return data;
  };

  return data;
}

function _getMissingPackages() {
  const data = require("./getMissingPackages");

  _getMissingPackages = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const WEB_FEATURE_FLAG = 'EXPO_NO_WEB_SETUP'; // Only check once per run.

let hasChecked = false;
let disabledReason = '';

async function ensureWebSupportSetupAsync(projectRoot, {
  skipCache = false
} = {}) {
  if (!skipCache && hasChecked) {
    if (disabledReason) {
      _log().default.log(_chalk().default.dim(disabledReason));
    }

    return false;
  }

  hasChecked = true;
  const result = await shouldSetupWebSupportAsync(projectRoot);

  if ('failureReason' in result) {
    disabledReason = result.failureReason;
    return ensureWebSupportSetupAsync(projectRoot);
  } // Ensure web packages are installed


  await ensureWebDependenciesInstalledAsync(projectRoot, {
    exp: result.exp
  });
  return true;
}

function isWebPlatformExcluded(rootConfig) {
  var _rootConfig$expo, _rootConfig$expo2, _rootConfig$expo3;

  // Detect if the 'web' string is purposefully missing from the platforms array.
  const isWebExcluded = Array.isArray((_rootConfig$expo = rootConfig.expo) === null || _rootConfig$expo === void 0 ? void 0 : _rootConfig$expo.platforms) && !!((_rootConfig$expo2 = rootConfig.expo) !== null && _rootConfig$expo2 !== void 0 && _rootConfig$expo2.platforms.length) && !((_rootConfig$expo3 = rootConfig.expo) !== null && _rootConfig$expo3 !== void 0 && _rootConfig$expo3.platforms.includes('web'));
  return isWebExcluded;
}

async function shouldSetupWebSupportAsync(projectRoot) {
  if ((0, _getenv().boolish)(WEB_FEATURE_FLAG, false)) {
    return {
      failureReason: '\u203A Skipping web setup: EXPO_NO_WEB_SETUP is enabled.'
    };
  }

  const projectConfig = (0, _config().getConfig)(projectRoot, {
    skipSDKVersionRequirement: true
  }); // Detect if the 'web' string is purposefully missing from the platforms array.

  if (isWebPlatformExcluded(projectConfig.rootConfig)) {
    // Get exact config description with paths.
    const configName = (0, _config().getProjectConfigDescriptionWithPaths)(projectRoot, projectConfig);
    return {
      failureReason: `\u203A Skipping web setup: ${_chalk().default.bold`"web"`} is not included in the project ${configName} ${_chalk().default.bold`"platforms"`} array.`
    };
  }

  return projectConfig;
}

const requiredPackages = [// use react-native-web/package.json to skip node module cache issues when the user installs
// the package and attempts to resolve the module in the same process.
{
  file: 'react-native-web/package.json',
  pkg: 'react-native-web'
}, {
  file: 'react-dom/package.json',
  pkg: 'react-dom'
}];

async function ensureWebDependenciesInstalledAsync(projectRoot, {
  exp = (0, _config().getConfig)(projectRoot, {
    skipSDKVersionRequirement: true
  }).exp,
  // Don't prompt in CI
  skipPrompt = _commander().default.nonInteractive
} = {}) {
  const {
    missing
  } = await (0, _getMissingPackages().getMissingPackagesAsync)(projectRoot, {
    exp,
    requiredPackages
  });

  if (!missing.length) {
    return true;
  } // Prompt to install or bail out...


  const readableMissingPackages = missing.map(p => p.pkg).join(', ');
  const isYarn = PackageManager().isUsingYarn(projectRoot);
  let title = `It looks like you're trying to use web support but don't have the required dependencies installed.`;

  if (skipPrompt) {
    title += '\n\n';
  } else {
    _xdl().Prompts.pauseInteractions();

    let confirm;

    try {
      confirm = await (0, _prompts().confirmAsync)({
        message: wrapForTerminal(title + ` Would you like to install ${_chalk().default.cyan(readableMissingPackages)}?`),
        initial: true
      });
    } finally {
      _xdl().Prompts.resumeInteractions();
    }

    if (confirm) {
      // Format with version if available.
      const packages = missing.map(({
        pkg,
        version
      }) => version ? [pkg, version].join('@') : pkg); // Install packages with versions

      await installPackagesAsync(projectRoot, {
        isYarn,
        packages
      }); // Try again but skip prompting twice, simply fail if the packages didn't install correctly.

      return await ensureWebDependenciesInstalledAsync(projectRoot, {
        skipPrompt: true
      });
    } // Reset the title so it doesn't print twice in interactive mode.


    title = '';
  }

  const installCommand = createInstallCommand({
    isYarn,
    packages: missing
  });
  const disableMessage = `If you're not using web, please remove the ${_chalk().default.bold('"web"')} string from the platforms array in the project Expo config.`;
  const solution = `Please install ${_chalk().default.bold(readableMissingPackages)} by running:\n\n  ${_chalk().default.reset.bold(installCommand)}\n\n`; // Reset the cached check so we can re-run the check if the user re-runs the command.

  hasChecked = false; // This prevents users from starting a misconfigured JS or TS project by default.

  throw new (_CommandError().default)(wrapForTerminal(title + solution + disableMessage + '\n'));
} // Wrap long messages to fit smaller terminals.


function wrapForTerminal(message) {
  return (0, _wrapAnsi().default)(message, process.stdout.columns || 80);
}

function createInstallCommand({
  isYarn,
  packages
}) {
  return (isYarn ? 'yarn add' : 'npm install') + ' ' + packages.map(({
    pkg,
    version
  }) => {
    if (version) {
      return [pkg, version].join('@');
    }

    return pkg;
  }).join(' ');
}

async function installPackagesAsync(projectRoot, {
  isYarn,
  packages
}) {
  const packageManager = PackageManager().createForProject(projectRoot, {
    yarn: isYarn,
    log: _log().default.log,
    silent: !_log().default.isDebug
  });

  const packagesStr = _chalk().default.bold(packages.join(', '));

  _log().default.newLine();

  const installingPackageStep = (0, _ora().logNewSection)(`Installing ${packagesStr}`);

  try {
    await packageManager.addAsync(...packages);
  } catch (e) {
    installingPackageStep.fail(`Failed to install ${packagesStr} with error: ${e.message}`);
    throw e;
  }

  installingPackageStep.succeed(`Installed ${packagesStr}`);
}
//# sourceMappingURL=ensureWebSetup.js.map