"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureTypeScriptSetupAsync = ensureTypeScriptSetupAsync;
exports.shouldSetupTypeScriptAsync = shouldSetupTypeScriptAsync;

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

function _profileMethod() {
  const data = require("../profileMethod");

  _profileMethod = function () {
    return data;
  };

  return data;
}

function _resolveModules() {
  const data = require("./resolveModules");

  _resolveModules = function () {
    return data;
  };

  return data;
}

function _updateTSConfig() {
  const data = require("./updateTSConfig");

  _updateTSConfig = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

async function ensureTypeScriptSetupAsync(projectRoot) {
  if (_updateTSConfig().isTypeScriptSetupDisabled) {
    _log().default.log(_chalk().default.dim('\u203A Skipping TypeScript verification'));

    return;
  }

  const tsConfigPath = path().join(projectRoot, 'tsconfig.json'); // Ensure the project is TypeScript before continuing.

  const intent = await shouldSetupTypeScriptAsync(projectRoot);

  if (!intent) {
    return;
  } // Ensure TypeScript packages are installed


  await ensureRequiredDependenciesAsync(projectRoot, // Don't prompt in CI
  _commander().default.nonInteractive); // Update the config

  await (0, _updateTSConfig().updateTSConfigAsync)({
    projectRoot,
    tsConfigPath,
    isBootstrapping: intent.isBootstrapping
  });
}

async function shouldSetupTypeScriptAsync(projectRoot) {
  const tsConfigPath = await (0, _resolveModules().hasTSConfig)(projectRoot); // Enable TS setup if the project has a `tsconfig.json`

  if (tsConfigPath) {
    const content = await fs().readFile(tsConfigPath, {
      encoding: 'utf8'
    }).then(txt => txt.trim(), () => null);
    const isBlankConfig = content === '' || content === '{}';
    return {
      isBootstrapping: isBlankConfig
    };
  } // This is a somewhat heavy check in larger projects.
  // Test that this is reasonably paced by running expo start in `expo/apps/native-component-list`


  const typescriptFile = await (0, _profileMethod().profileMethod)(_resolveModules().queryFirstProjectTypeScriptFileAsync)(projectRoot);

  if (typescriptFile) {
    return {
      isBootstrapping: true
    };
  }

  return null;
}

async function getSDKVersionsAsync(projectRoot) {
  try {
    const {
      exp
    } = (0, _config().getConfig)(projectRoot, {
      skipSDKVersionRequirement: true
    });

    if (exp.sdkVersion) {
      var _sdkVersions$exp$sdkV;

      const sdkVersions = await _xdl().Versions.releasedSdkVersionsAsync();
      return (_sdkVersions$exp$sdkV = sdkVersions[exp.sdkVersion]) !== null && _sdkVersions$exp$sdkV !== void 0 ? _sdkVersions$exp$sdkV : null;
    }
  } catch {// This is a convenience method and we should avoid making this halt the process.
  }

  return null;
}

async function ensureRequiredDependenciesAsync(projectRoot, skipPrompt = false) {
  const {
    resolutions,
    missing
  } = (0, _resolveModules().collectMissingPackages)(projectRoot);

  if (!missing.length) {
    return resolutions.typescript;
  } // Ensure the versions are right for the SDK that the project is currently using.


  const versions = await getSDKVersionsAsync(projectRoot);

  if (versions !== null && versions !== void 0 && versions.relatedPackages) {
    for (const pkg of missing) {
      if (pkg.pkg in versions.relatedPackages) {
        pkg.version = versions.relatedPackages[pkg.pkg];
      }
    }
  } // Prompt to install or bail out...


  const readableMissingPackages = missing.map(p => p.pkg).join(', ');
  const isYarn = PackageManager().isUsingYarn(projectRoot);
  let title = `It looks like you're trying to use TypeScript but don't have the required dependencies installed.`;

  if (!skipPrompt) {
    if (await (0, _prompts().confirmAsync)({
      message: (0, _wrapAnsi().default)(title + ` Would you like to install ${_chalk().default.cyan(readableMissingPackages)}?`, // This message is a bit too long, so wrap it to fit smaller terminals
      process.stdout.columns || 80),
      initial: true
    })) {
      await installPackagesAsync(projectRoot, {
        isYarn,
        devPackages: missing.map(({
          pkg,
          version
        }) => {
          if (version) {
            return [pkg, version].join('@');
          }

          return pkg;
        })
      }); // Try again but skip prompting twice.

      return await ensureRequiredDependenciesAsync(projectRoot, true);
    } // Reset the title so it doesn't print twice in interactive mode.


    title = '';
  } else {
    title += '\n\n';
  }

  const col = process.stdout.columns || 80;
  const installCommand = (isYarn ? 'yarn add --dev' : 'npm install --save-dev') + ' ' + missing.map(({
    pkg,
    version
  }) => {
    if (version) {
      return [pkg, version].join('@');
    }

    return pkg;
  }).join(' ');
  let disableMessage = "If you're not using TypeScript, please remove the TypeScript files from your project";

  if (await (0, _resolveModules().hasTSConfig)(projectRoot)) {
    disableMessage += ` and delete the tsconfig.json.`;
  } else {
    disableMessage += '.';
  }

  const solution = `Please install ${_chalk().default.bold(readableMissingPackages)} by running:\n\n  ${_chalk().default.reset.bold(installCommand)}\n\n`; // This prevents users from starting a misconfigured JS or TS project by default.

  throw new (_CommandError().default)((0, _wrapAnsi().default)(title + solution + disableMessage + '\n', col));
}

async function installPackagesAsync(projectRoot, {
  isYarn,
  devPackages
}) {
  const packageManager = PackageManager().createForProject(projectRoot, {
    yarn: isYarn,
    log: _log().default.log,
    silent: !_log().default.isDebug
  });

  const packagesStr = _chalk().default.bold(devPackages.join(', '));

  _log().default.newLine();

  const installingPackageStep = (0, _ora().logNewSection)(`Installing ${packagesStr}`);

  try {
    await packageManager.addDevAsync(...devPackages);
  } catch (e) {
    installingPackageStep.fail(`Failed to install ${packagesStr} with error: ${e.message}`);
    throw e;
  }

  installingPackageStep.succeed(`Installed ${packagesStr}`);
}
//# sourceMappingURL=ensureTypeScriptSetup.js.map