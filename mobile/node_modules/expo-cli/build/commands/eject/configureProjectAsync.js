"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = configureManagedProjectAsync;
exports.logConfig = logConfig;

function _config() {
  const data = require("@expo/config");

  _config = function () {
    return data;
  };

  return data;
}

function _configPlugins() {
  const data = require("@expo/config-plugins");

  _configPlugins = function () {
    return data;
  };

  return data;
}

function _prebuildConfig() {
  const data = require("@expo/prebuild-config");

  _prebuildConfig = function () {
    return data;
  };

  return data;
}

function _util() {
  const data = _interopRequireDefault(require("util"));

  _util = function () {
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

function logConfig(config) {
  const isObjStr = str => /^\w+: {/g.test(str);

  _log().default.log(_util().default.inspect(config, {
    colors: true,
    compact: false,

    // Sort objects to the end so that smaller values aren't hidden between large objects.
    sorted(a, b) {
      if (isObjStr(a)) return 1;
      if (isObjStr(b)) return -1;
      return 0;
    },

    showHidden: false,
    depth: null
  }));
}

async function configureManagedProjectAsync({
  projectRoot,
  platforms
}) {
  let bundleIdentifier;

  if (platforms.includes('ios')) {
    // Check bundle ID before reading the config because it may mutate the config if the user is prompted to define it.
    bundleIdentifier = await (0, _getOrPromptApplicationId().getOrPromptForBundleIdentifier)(projectRoot);
  }

  let packageName;

  if (platforms.includes('android')) {
    // Check package before reading the config because it may mutate the config if the user is prompted to define it.
    packageName = await (0, _getOrPromptApplicationId().getOrPromptForPackage)(projectRoot);
  }

  let {
    exp: config
  } = await (0, _prebuildConfig().getPrebuildConfigAsync)(projectRoot, {
    platforms,
    packageName,
    bundleIdentifier,

    expoUsername(config) {
      return (0, _config().getAccountUsername)(config);
    }

  }); // compile all plugins and mods

  config = await (0, _configPlugins().compileModsAsync)(config, {
    projectRoot,
    platforms,
    assertMissingModProviders: false
  });

  if (_log().default.isDebug) {
    _log().default.debug();

    _log().default.debug('Evaluated config:');

    logConfig(config);

    _log().default.debug();
  }

  return config;
}
//# sourceMappingURL=configureProjectAsync.js.map