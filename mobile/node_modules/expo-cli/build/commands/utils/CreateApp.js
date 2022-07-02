"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assertFolderEmptyAsync = assertFolderEmptyAsync;
exports.getChangeDirectoryPath = getChangeDirectoryPath;
exports.getConflictsForDirectory = getConflictsForDirectory;
exports.installCocoaPodsAsync = installCocoaPodsAsync;
exports.installNodeDependenciesAsync = installNodeDependenciesAsync;
exports.isFolderNameForbidden = isFolderNameForbidden;
exports.resolvePackageManager = resolvePackageManager;
exports.validateName = validateName;

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

function _fsExtra() {
  const data = _interopRequireDefault(require("fs-extra"));

  _fsExtra = function () {
    return data;
  };

  return data;
}

function _getenv() {
  const data = _interopRequireDefault(require("getenv"));

  _getenv = function () {
    return data;
  };

  return data;
}

function _jsYaml() {
  const data = _interopRequireDefault(require("js-yaml"));

  _jsYaml = function () {
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

function _Podfile() {
  const data = require("../run/ios/Podfile");

  _Podfile = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function validateName(name) {
  if (typeof name !== 'string' || name === '') {
    return 'The project name can not be empty.';
  }

  if (!/^[a-z0-9@.\-_]+$/i.test(name)) {
    return 'The project name can only contain URL-friendly characters (alphanumeric and @ . -  _)';
  }

  return true;
}

const FORBIDDEN_NAMES = ['react-native', 'react', 'react-dom', 'react-native-web', 'expo'];

function isFolderNameForbidden(folderName) {
  return FORBIDDEN_NAMES.includes(folderName);
} // Any of these files are allowed to exist in the projectRoot


const TOLERABLE_FILES = [// System
'.DS_Store', 'Thumbs.db', // Git
'.git', '.gitattributes', '.gitignore', // Project
'.npmignore', '.travis.yml', 'LICENSE', 'docs', '.idea', // Package manager
'npm-debug.log', 'yarn-debug.log', 'yarn-error.log'];

function getConflictsForDirectory(projectRoot, tolerableFiles = TOLERABLE_FILES) {
  return _fsExtra().default.readdirSync(projectRoot).filter(file => !(/\.iml$/.test(file) || tolerableFiles.includes(file)));
}

async function assertFolderEmptyAsync({
  projectRoot,
  folderName = path().dirname(projectRoot),
  overwrite
}) {
  const conflicts = getConflictsForDirectory(projectRoot);

  if (conflicts.length) {
    _log().default.addNewLineIfNone();

    _log().default.nested(`The directory ${_chalk().default.green(folderName)} has files that might be overwritten:`);

    _log().default.newLine();

    for (const file of conflicts) {
      _log().default.nested(`  ${file}`);
    }

    if (overwrite) {
      _log().default.newLine();

      _log().default.nested(`Removing existing files from ${_chalk().default.green(folderName)}`);

      await Promise.all(conflicts.map(conflict => _fsExtra().default.remove(path().join(projectRoot, conflict))));
      return true;
    }

    return false;
  }

  return true;
}

function resolvePackageManager(options) {
  let packageManager = 'npm';

  if (options.yarn || !options.npm && PackageManager().shouldUseYarn()) {
    packageManager = 'yarn';
  } else {
    packageManager = 'npm';
  }

  if (options.install) {
    _log().default.log(packageManager === 'yarn' ? `🧶 Using Yarn to install packages. ${_chalk().default.dim('Pass --npm to use npm instead.')}` : '📦 Using npm to install packages.');
  }

  return packageManager;
}

const EXPO_DEBUG = _getenv().default.boolish('EXPO_DEBUG', false);

async function installNodeDependenciesAsync(projectRoot, packageManager, flags = {
  // default to silent
  silent: !EXPO_DEBUG
}) {
  const options = {
    cwd: projectRoot,
    silent: flags.silent
  };

  if (packageManager === 'yarn') {
    const yarn = new (PackageManager().YarnPackageManager)(options);
    const version = await yarn.versionAsync();
    const nodeLinker = await yarn.getConfigAsync('nodeLinker');

    if (_semver().default.satisfies(version, '>=2.0.0-rc.24') && nodeLinker !== 'node-modules') {
      const yarnRc = path().join(projectRoot, '.yarnrc.yml');
      let yamlString = '';

      try {
        yamlString = _fsExtra().default.readFileSync(yarnRc, 'utf8');
      } catch (error) {
        if (error.code !== 'ENOENT') {
          throw error;
        }
      }

      const config = yamlString ? _jsYaml().default.safeLoad(yamlString) : {};
      config.nodeLinker = 'node-modules';
      !flags.silent && _log().default.warn(`Yarn v${version} detected, enabling experimental Yarn v2 support using the node-modules plugin.`);
      !flags.silent && _log().default.log(`Writing ${yarnRc}...`);

      _fsExtra().default.writeFileSync(yarnRc, _jsYaml().default.safeDump(config));
    }

    await yarn.installAsync();
  } else {
    await new (PackageManager().NpmPackageManager)(options).installAsync();
  }
}

function getChangeDirectoryPath(projectRoot) {
  const cdPath = path().relative(process.cwd(), projectRoot);

  if (cdPath.length <= projectRoot.length) {
    return cdPath;
  }

  return projectRoot;
}

async function installCocoaPodsAsync(projectRoot) {
  let step = (0, _ora().logNewSection)('Installing CocoaPods...');

  if (process.platform !== 'darwin') {
    step.succeed('Skipped installing CocoaPods because operating system is not on macOS.');
    return false;
  }

  const packageManager = new (PackageManager().CocoaPodsPackageManager)({
    cwd: path().join(projectRoot, 'ios'),
    silent: !EXPO_DEBUG
  });

  if (!(await packageManager.isCLIInstalledAsync())) {
    try {
      // prompt user -- do you want to install cocoapods right now?
      step.text = 'CocoaPods CLI not found in your PATH, installing it now.';
      step.stopAndPersist();
      await PackageManager().CocoaPodsPackageManager.installCLIAsync({
        nonInteractive: true,
        spawnOptions: { ...packageManager.options,
          // Don't silence this part
          stdio: ['inherit', 'inherit', 'pipe']
        }
      });
      step.succeed('Installed CocoaPods CLI.');
      step = (0, _ora().logNewSection)('Running `pod install` in the `ios` directory.');
    } catch (e) {
      step.stopAndPersist({
        symbol: '⚠️ ',
        text: _chalk().default.red('Unable to install the CocoaPods CLI.')
      });

      if (e instanceof PackageManager().CocoaPodsError) {
        _log().default.log(e.message);
      } else {
        _log().default.log(`Unknown error: ${e.message}`);
      }

      return false;
    }
  }

  try {
    await packageManager.installAsync({
      spinner: step
    }); // Create cached list for later

    await (0, _Podfile().hasPackageJsonDependencyListChangedAsync)(projectRoot).catch(() => null);
    step.succeed('Installed pods and initialized Xcode workspace.');
    return true;
  } catch (e) {
    step.stopAndPersist({
      symbol: '⚠️ ',
      text: _chalk().default.red('Something went wrong running `pod install` in the `ios` directory.')
    });

    if (e instanceof PackageManager().CocoaPodsError) {
      _log().default.log(e.message);
    } else {
      _log().default.log(`Unknown error: ${e.message}`);
    }

    return false;
  }
}
//# sourceMappingURL=CreateApp.js.map