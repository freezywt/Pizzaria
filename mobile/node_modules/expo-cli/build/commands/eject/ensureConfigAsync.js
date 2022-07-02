"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureConfigAsync = ensureConfigAsync;
exports.ensureConfigExistsAsync = ensureConfigExistsAsync;

function _config() {
  const data = require("@expo/config");

  _config = function () {
    return data;
  };

  return data;
}

function _jsonFile() {
  const data = _interopRequireDefault(require("@expo/json-file"));

  _jsonFile = function () {
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

function _getOrPromptApplicationId() {
  const data = require("../utils/getOrPromptApplicationId");

  _getOrPromptApplicationId = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * If an Expo config file does not exist, write a new one using the in-memory config.
 *
 * @param projectRoot
 */
async function ensureConfigExistsAsync(projectRoot) {
  try {
    const config = (0, _config().getConfig)(projectRoot, {
      skipSDKVersionRequirement: false
    }); // If no config exists in the file system then we should generate one so the process doesn't fail.

    if (!config.dynamicConfigPath && !config.staticConfigPath) {
      // Remove the internal object before writing.
      delete config.exp._internal; // Don't check for a custom config path because the process should fail if a custom file doesn't exist.
      // Write the generated config.
      // writeConfigJsonAsync(projectRoot, config.exp);

      await _jsonFile().default.writeAsync( // TODO: Write to app.config.json because it's easier to convert to a js config file.
      _path().default.join(projectRoot, 'app.json'), {
        expo: config.exp
      }, {
        json5: false
      });
    }
  } catch (error) {
    // TODO(Bacon): Currently this is already handled in the command
    _log().default.addNewLineIfNone();

    throw new (_CommandError().default)(`${error.message}\n`);
  }
}

async function ensureConfigAsync({
  projectRoot,
  platforms
}) {
  await ensureConfigExistsAsync(projectRoot); // Prompt for the Android package first because it's more strict than the bundle identifier
  // this means you'll have a better chance at matching the bundle identifier with the package name.

  if (platforms.includes('android')) {
    await (0, _getOrPromptApplicationId().getOrPromptForPackage)(projectRoot);
  }

  if (platforms.includes('ios')) {
    await (0, _getOrPromptApplicationId().getOrPromptForBundleIdentifier)(projectRoot);
  } // We need the SDK version to proceed


  const {
    exp,
    pkg
  } = (0, _config().getConfig)(projectRoot); // TODO: Should we attempt to persist this change?

  if (exp.entryPoint) {
    delete exp.entryPoint;

    _log().default.log(`\u203A expo.entryPoint is not needed and has been removed.`);
  } // Read config again because prompting for bundle id or package name may have mutated the results.


  return {
    exp,
    pkg
  };
}
//# sourceMappingURL=ensureConfigAsync.js.map