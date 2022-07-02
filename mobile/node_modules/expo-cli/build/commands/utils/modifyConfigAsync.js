"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.attemptAddingPluginsAsync = attemptAddingPluginsAsync;
exports.attemptModification = attemptModification;
exports.warnAboutConfigAndThrow = warnAboutConfigAndThrow;

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

function _CommandError() {
  const data = require("../../CommandError");

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

async function attemptModification(projectRoot, edits, exactEdits) {
  const modification = await (0, _config().modifyConfigAsync)(projectRoot, edits, {
    skipSDKVersionRequirement: true
  });

  if (modification.type === 'success') {
    _log().default.addNewLineIfNone();
  } else {
    warnAboutConfigAndThrow(modification.type, modification.message, exactEdits);
  }
}

function logNoConfig() {
  _log().default.log(_chalk().default.yellow(`No Expo config was found. Please create an Expo config (${_chalk().default.bold`app.json`} or ${_chalk().default.bold`app.config.js`}) in your project root.`));
}

async function attemptAddingPluginsAsync(projectRoot, exp, plugins) {
  if (!plugins.length) return;
  const edits = {
    plugins: [...new Set((exp.plugins || []).concat(plugins))]
  };
  const modification = await (0, _config().modifyConfigAsync)(projectRoot, edits, {
    skipSDKVersionRequirement: true,
    skipPlugins: true
  });

  if (modification.type === 'success') {
    _log().default.log(`\u203A Added config plugin${plugins.length === 1 ? '' : 's'}: ${plugins.join(', ')}`);
  } else {
    const exactEdits = {
      plugins
    };
    warnAboutConfigAndThrow(modification.type, modification.message, exactEdits);
  }
}

function warnAboutConfigAndThrow(type, message, edits) {
  _log().default.addNewLineIfNone();

  if (type === 'warn') {
    // The project is using a dynamic config, give the user a helpful log and bail out.
    _log().default.log(_chalk().default.yellow(message));
  } else {
    logNoConfig();
  }

  notifyAboutManualConfigEdits(edits);
  throw new (_CommandError().SilentError)();
}

function notifyAboutManualConfigEdits(edits) {
  _log().default.log(_chalk().default.cyan(`Please add the following to your Expo config`));

  _log().default.newLine();

  _log().default.log(JSON.stringify(edits, null, 2));

  _log().default.newLine();
}
//# sourceMappingURL=modifyConfigAsync.js.map