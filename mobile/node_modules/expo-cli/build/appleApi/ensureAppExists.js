"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureBundleIdExistsAsync = ensureBundleIdExistsAsync;
exports.ensureBundleIdExistsWithNameAsync = ensureBundleIdExistsWithNameAsync;

function _appleUtils() {
  const data = require("@expo/apple-utils");

  _appleUtils = function () {
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

function _ora() {
  const data = require("../utils/ora");

  _ora = function () {
    return data;
  };

  return data;
}

function _authenticate() {
  const data = require("./authenticate");

  _authenticate = function () {
    return data;
  };

  return data;
}

function _contractMessages() {
  const data = require("./contractMessages");

  _contractMessages = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function ensureBundleIdExistsAsync(authCtx, {
  accountName,
  projectName,
  bundleIdentifier
}, options) {
  return ensureBundleIdExistsWithNameAsync(authCtx, {
    name: `@${accountName}/${projectName}`,
    bundleIdentifier
  }, options);
}

async function ensureBundleIdExistsWithNameAsync(authCtx, {
  name,
  bundleIdentifier
}, options) {
  const context = (0, _authenticate().getRequestContext)(authCtx);
  let spinner = (0, _ora().ora)(`Linking bundle identifier ${_chalk().default.dim(bundleIdentifier)}`).start();
  let bundleId;

  try {
    // Get the bundle id
    bundleId = await _appleUtils().BundleId.findAsync(context, {
      identifier: bundleIdentifier
    });

    if (!bundleId) {
      spinner.text = `Registering bundle identifier ${_chalk().default.dim(bundleIdentifier)}`; // If it doesn't exist, create it

      bundleId = await _appleUtils().BundleId.createAsync(context, {
        name,
        identifier: bundleIdentifier
      });
    }

    spinner.succeed(`Bundle identifier registered ${_chalk().default.dim(bundleIdentifier)}`);
  } catch (err) {
    if (err.message.match(/An App ID with Identifier '(.*)' is not available/)) {
      spinner.fail(`The bundle identifier ${_chalk().default.bold(bundleIdentifier)} is not available to team "${authCtx.team.name}" (${authCtx.team.id}), please change it in your app config and try again.`);
    } else {
      spinner.fail(`Failed to register bundle identifier ${_chalk().default.dim(bundleIdentifier)}`); // Assert contract errors for easier resolution when the user has an expired developer account.

      if (err.message.match(/forbidden for security reasons/)) {
        await (0, _contractMessages().assertContractMessagesAsync)(context);
      }
    }

    throw err;
  }

  if (options) {
    try {
      spinner = (0, _ora().ora)(`Syncing capabilities`).start(); // Update the capabilities

      await bundleId.updateBundleIdCapabilityAsync({
        capabilityType: _appleUtils().CapabilityType.PUSH_NOTIFICATIONS,
        option: options.enablePushNotifications ? _appleUtils().CapabilityTypeOption.ON : _appleUtils().CapabilityTypeOption.OFF // TODO: Add more capabilities

      });
      spinner.succeed(`Synced capabilities`);
    } catch (err) {
      spinner.fail(`Failed to sync capabilities ${_chalk().default.dim(bundleIdentifier)}`);
      throw err;
    }
  }
}
//# sourceMappingURL=ensureAppExists.js.map