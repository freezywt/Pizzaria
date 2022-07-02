"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBundledNativeModulesAsync = getBundledNativeModulesAsync;

function _jsonFile() {
  const data = _interopRequireDefault(require("@expo/json-file"));

  _jsonFile = function () {
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Gets the bundledNativeModules.json for a given SDK version:
 * - Tries to fetch the data from the /sdks/:sdkVersion/native-modules API endpoint.
 * - If the data is missing on the server (it can happen for SDKs that are yet fully released)
 *    or there's a downtime, reads the local .json file from the "expo" package.
 * - For UNVERSIONED, returns the local .json file contents.
 */
async function getBundledNativeModulesAsync(projectRoot, sdkVersion) {
  if (sdkVersion === 'UNVERSIONED') {
    return await getBundledNativeModulesFromExpoPackageAsync(projectRoot);
  } else {
    try {
      return await getBundledNativeModulesFromApiAsync(sdkVersion);
    } catch {
      _log().default.warn(`Unable to reach Expo servers. Falling back to using the cached dependency map (${_chalk().default.bold('bundledNativeModules.json')}) from the package "${_chalk().default.bold`expo`}" installed in your project.`);

      return await getBundledNativeModulesFromExpoPackageAsync(projectRoot);
    }
  }
}

async function getBundledNativeModulesFromApiAsync(sdkVersion) {
  const client = _xdl().ApiV2.clientForUser();
  /**
   * The endpoint returns the list of bundled native modules for a given SDK version.
   * The data is populated by the `et sync-bundled-native-modules` script from expo/expo repo.
   * See the code for more details:
   * https://github.com/expo/expo/blob/master/tools/src/commands/SyncBundledNativeModules.ts
   *
   * Example result:
   * [
   *   {
   *     id: "79285187-e5c4-47f7-b6a9-664f5d16f0db",
   *     sdkVersion: "41.0.0",
   *     npmPackage: "expo-analytics-amplitude",
   *     versionRange: "~10.1.0",
   *     createdAt: "2021-04-29T09:34:32.825Z",
   *     updatedAt: "2021-04-29T09:34:32.825Z"
   *   },
   *   ...
   * ]
   */


  const list = await client.getAsync(`sdks/${sdkVersion}/native-modules`);

  if (list.length === 0) {
    throw new Error('The bundled native module list from www is empty');
  }

  return fromBundledNativeModuleList(list);
}
/**
 * Get the legacy static `bundledNativeModules.json` file
 * that's shipped with the version of `expo` that the project has installed.
 */


async function getBundledNativeModulesFromExpoPackageAsync(projectRoot) {
  const bundledNativeModulesPath = _resolveFrom().default.silent(projectRoot, 'expo/bundledNativeModules.json');

  if (!bundledNativeModulesPath) {
    _log().default.addNewLineIfNone();

    throw new (_CommandError().default)(`The dependency map ${_chalk().default.bold(`expo/bundledNativeModules.json`)} cannot be found, please ensure you have the package "${_chalk().default.bold`expo`}" installed in your project.\n`);
  }

  return await _jsonFile().default.readAsync(bundledNativeModulesPath);
}

function fromBundledNativeModuleList(list) {
  return list.reduce((acc, i) => {
    acc[i.npmPackage] = i.versionRange;
    return acc;
  }, {});
}
//# sourceMappingURL=bundledNativeModules.js.map