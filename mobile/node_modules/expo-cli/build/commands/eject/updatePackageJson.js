"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createDependenciesMap = createDependenciesMap;
exports.createFileHash = createFileHash;
exports.hashForDependencyMap = hashForDependencyMap;
exports.isPkgMainExpoAppEntry = isPkgMainExpoAppEntry;
exports.shouldDeleteMainField = shouldDeleteMainField;
exports.updatePackageJSONAsync = updatePackageJSONAsync;
exports.updatePackageJSONDependencies = updatePackageJSONDependencies;

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

function _crypto() {
  const data = _interopRequireDefault(require("crypto"));

  _crypto = function () {
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

function _path() {
  const data = _interopRequireDefault(require("path"));

  _path = function () {
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

function _isModuleSymlinked() {
  const data = require("../utils/isModuleSymlinked");

  _isModuleSymlinked = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function updatePackageJSONAsync({
  projectRoot,
  tempDir,
  pkg,
  skipDependencyUpdate
}) {
  // NOTE(brentvatne): Removing spaces between steps for now, add back when
  // there is some additional context for steps
  const updatingPackageJsonStep = (0, _ora().logNewSection)('Updating your package.json scripts, dependencies, and main file');
  updatePackageJSONScripts({
    pkg
  });
  const results = updatePackageJSONDependencies({
    projectRoot,
    pkg,
    tempDir,
    skipDependencyUpdate
  });
  const removedPkgMain = updatePackageJSONEntryPoint({
    pkg
  });
  await _fsExtra().default.writeFile(_path().default.resolve(projectRoot, 'package.json'), // Add new line to match the format of running yarn.
  // This prevents the `package.json` from changing when running `prebuild --no-install` multiple times.
  JSON.stringify(pkg, null, 2) + '\n');
  updatingPackageJsonStep.succeed('Updated package.json and added index.js entry point for iOS and Android');

  if (removedPkgMain) {
    _log().default.log(`\u203A Removed ${_chalk().default.bold(`"main": "${removedPkgMain}"`)} from package.json because we recommend using index.js as main instead`);

    _log().default.newLine();
  }

  return results;
}
/**
 * Update package.json dependencies by combining the dependencies in the project we are ejecting
 * with the dependencies in the template project. Does the same for devDependencies.
 *
 * - The template may have some dependencies beyond react/react-native/react-native-unimodules,
 *   for example RNGH and Reanimated. We should prefer the version that is already being used
 *   in the project for those, but swap the react/react-native/react-native-unimodules versions
 *   with the ones in the template.
 * - The same applies to expo-updates -- since some native project configuration may depend on the
 *   version, we should always use the version of expo-updates in the template.
 */


function updatePackageJSONDependencies({
  projectRoot,
  tempDir,
  pkg,
  skipDependencyUpdate = []
}) {
  if (!pkg.devDependencies) {
    pkg.devDependencies = {};
  }

  const {
    dependencies,
    devDependencies
  } = (0, _config().getPackageJson)(tempDir);
  const defaultDependencies = createDependenciesMap(dependencies);
  const defaultDevDependencies = createDependenciesMap(devDependencies);
  const combinedDependencies = createDependenciesMap({ ...defaultDependencies,
    ...pkg.dependencies
  });
  const requiredDependencies = ['react', 'react-native-unimodules', 'react-native', 'expo-updates'].filter(depKey => !!defaultDependencies[depKey]);
  const symlinkedPackages = [];

  for (const dependenciesKey of requiredDependencies) {
    var _pkg$dependencies;

    if ( // If the local package.json defined the dependency that we want to overwrite...
    (_pkg$dependencies = pkg.dependencies) !== null && _pkg$dependencies !== void 0 && _pkg$dependencies[dependenciesKey]) {
      if ( // Then ensure it isn't symlinked (i.e. the user has a custom version in their yarn workspace).
      (0, _isModuleSymlinked().isModuleSymlinked)({
        projectRoot,
        moduleId: dependenciesKey,
        isSilent: true
      })) {
        // If the package is in the project's package.json and it's symlinked, then skip overwriting it.
        symlinkedPackages.push(dependenciesKey);
        continue;
      }

      if (skipDependencyUpdate.includes(dependenciesKey)) {
        continue;
      }
    }

    combinedDependencies[dependenciesKey] = defaultDependencies[dependenciesKey];
  }

  if (symlinkedPackages.length) {
    _log().default.log(`\u203A Using symlinked ${symlinkedPackages.map(pkg => _chalk().default.bold(pkg)).join(', ')} instead of recommended version(s).`);
  }

  const combinedDevDependencies = createDependenciesMap({ ...defaultDevDependencies,
    ...pkg.devDependencies
  }); // Only change the dependencies if the normalized hash changes, this helps to reduce meaningless changes.

  const hasNewDependencies = hashForDependencyMap(pkg.dependencies) !== hashForDependencyMap(combinedDependencies);
  const hasNewDevDependencies = hashForDependencyMap(pkg.devDependencies) !== hashForDependencyMap(combinedDevDependencies); // Save the dependencies

  if (hasNewDependencies) {
    // Use Object.assign to preserve the original order of dependencies, this makes it easier to see what changed in the git diff.
    pkg.dependencies = Object.assign(pkg.dependencies, combinedDependencies);
  }

  if (hasNewDevDependencies) {
    // Same as with dependencies
    pkg.devDependencies = Object.assign(pkg.devDependencies, combinedDevDependencies);
  }

  return {
    hasNewDependencies,
    hasNewDevDependencies
  };
}
/**
 * Create an object of type DependenciesMap a dependencies object or throw if not valid.
 *
 * @param dependencies - ideally an object of type {[key]: string} - if not then this will error.
 */


function createDependenciesMap(dependencies) {
  if (typeof dependencies !== 'object') {
    throw new Error(`Dependency map is invalid, expected object but got ${typeof dependencies}`);
  } else if (!dependencies) {
    return {};
  }

  const outputMap = {};

  for (const key of Object.keys(dependencies)) {
    const value = dependencies[key];

    if (typeof value === 'string') {
      outputMap[key] = value;
    } else {
      throw new Error(`Dependency for key \`${key}\` should be a \`string\`, instead got: \`{ ${key}: ${JSON.stringify(value)} }\``);
    }
  }

  return outputMap;
}
/**
 * Update package.json scripts - `npm start` should default to `react-native
 * start` rather than `expo start` after ejecting, for example.
 */


function updatePackageJSONScripts({
  pkg
}) {
  var _pkg$scripts$start, _pkg$scripts$android, _pkg$scripts$ios;

  if (!pkg.scripts) {
    pkg.scripts = {};
  }

  if (!((_pkg$scripts$start = pkg.scripts.start) !== null && _pkg$scripts$start !== void 0 && _pkg$scripts$start.includes('--dev-client'))) {
    pkg.scripts.start = 'expo start --dev-client';
  }

  if (!((_pkg$scripts$android = pkg.scripts.android) !== null && _pkg$scripts$android !== void 0 && _pkg$scripts$android.includes('run'))) {
    pkg.scripts.android = 'expo run:android';
  }

  if (!((_pkg$scripts$ios = pkg.scripts.ios) !== null && _pkg$scripts$ios !== void 0 && _pkg$scripts$ios.includes('run'))) {
    pkg.scripts.ios = 'expo run:ios';
  }
}
/**
 * Add new app entry points
 */


function updatePackageJSONEntryPoint({
  pkg
}) {
  let removedPkgMain = false; // Check that the pkg.main doesn't match:
  // - ./node_modules/expo/AppEntry
  // - ./node_modules/expo/AppEntry.js
  // - node_modules/expo/AppEntry.js
  // - expo/AppEntry.js
  // - expo/AppEntry

  if (shouldDeleteMainField(pkg.main)) {
    // Save the custom
    removedPkgMain = pkg.main;
    delete pkg.main;
  }

  return removedPkgMain;
}
/**
 * Returns true if the input string matches the default expo main field.
 *
 * - ./node_modules/expo/AppEntry
 * - ./node_modules/expo/AppEntry.js
 * - node_modules/expo/AppEntry.js
 * - expo/AppEntry.js
 * - expo/AppEntry
 *
 * @param input package.json main field
 */


function isPkgMainExpoAppEntry(input) {
  const main = input || '';

  if (main.startsWith('./')) {
    return main.includes('node_modules/expo/AppEntry');
  }

  return main.includes('expo/AppEntry');
}

function normalizeDependencyMap(deps) {
  return Object.keys(deps).map(dependency => `${dependency}@${deps[dependency]}`).sort();
}

function hashForDependencyMap(deps = {}) {
  const depsList = normalizeDependencyMap(deps);
  const depsString = depsList.join('\n');
  return createFileHash(depsString);
}

function createFileHash(contents) {
  // this doesn't need to be secure, the shorter the better.
  return _crypto().default.createHash('sha1').update(contents).digest('hex');
}

function shouldDeleteMainField(main) {
  if (!main || !isPkgMainExpoAppEntry(main)) {
    return false;
  }

  return !(main !== null && main !== void 0 && main.startsWith('index.'));
}
//# sourceMappingURL=updatePackageJson.js.map