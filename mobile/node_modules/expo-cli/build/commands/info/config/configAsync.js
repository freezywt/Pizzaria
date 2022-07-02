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

function _modCompiler() {
  const data = require("@expo/config-plugins/build/plugins/mod-compiler");

  _modCompiler = function () {
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

function _configureProjectAsync() {
  const data = require("../../eject/configureProjectAsync");

  _configureProjectAsync = function () {
    return data;
  };

  return data;
}

function _profileMethod() {
  const data = require("../../utils/profileMethod");

  _profileMethod = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function actionAsync(projectRoot, options) {
  let config;

  if (options.type === 'prebuild') {
    config = await (0, _profileMethod().profileMethod)(_prebuildConfig().getPrebuildConfigAsync)(projectRoot, {
      platforms: ['ios', 'android']
    });
  } else if (options.type === 'introspect') {
    config = await (0, _profileMethod().profileMethod)(_prebuildConfig().getPrebuildConfigAsync)(projectRoot, {
      platforms: ['ios', 'android']
    });
    await (0, _modCompiler().compileModsAsync)(config.exp, {
      projectRoot,
      introspect: true,
      platforms: ['ios', 'android'],
      assertMissingModProviders: false
    }); // @ts-ignore

    delete config.modRequest; // @ts-ignore

    delete config.modResults;
  } else if (options.type === 'public') {
    config = (0, _profileMethod().profileMethod)(_config().getConfig)(projectRoot, {
      skipSDKVersionRequirement: true,
      isPublicConfig: true
    });
  } else if (options.type) {
    throw new (_CommandError().default)(`Invalid option: --type ${options.type}. Valid options are: public, prebuild`);
  } else {
    config = (0, _profileMethod().profileMethod)(_config().getConfig)(projectRoot, {
      skipSDKVersionRequirement: true
    });
  }

  const configOutput = options.full ? config : config.exp;

  if (!options.json) {
    _log().default.log();

    (0, _configureProjectAsync().logConfig)(configOutput);

    _log().default.log();
  } else {
    _log().default.nested(JSON.stringify(configOutput));
  }
}
//# sourceMappingURL=configAsync.js.map