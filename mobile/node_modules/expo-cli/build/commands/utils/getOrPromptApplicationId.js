"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOrPromptForBundleIdentifier = getOrPromptForBundleIdentifier;
exports.getOrPromptForPackage = getOrPromptForPackage;

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

function _prompts() {
  const data = _interopRequireWildcard(require("../../utils/prompts"));

  _prompts = function () {
    return data;
  };

  return data;
}

function _TerminalLink() {
  const data = require("./TerminalLink");

  _TerminalLink = function () {
    return data;
  };

  return data;
}

function _modifyConfigAsync() {
  const data = require("./modifyConfigAsync");

  _modifyConfigAsync = function () {
    return data;
  };

  return data;
}

function _validateApplicationId() {
  const data = require("./validateApplicationId");

  _validateApplicationId = function () {
    return data;
  };

  return data;
}

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const noBundleIdMessage = `Your project must have a \`bundleIdentifier\` set in the Expo config (app.json or app.config.js).\nSee https://expo.fyi/bundle-identifier`;
const noPackageMessage = `Your project must have a \`package\` set in the Expo config (app.json or app.config.js).\nSee https://expo.fyi/android-package`;

async function getOrPromptForBundleIdentifier(projectRoot) {
  var _exp$ios, _exp$android, _exp$android2;

  const {
    exp
  } = (0, _config().getConfig)(projectRoot, {
    skipSDKVersionRequirement: true
  });
  const currentBundleId = (_exp$ios = exp.ios) === null || _exp$ios === void 0 ? void 0 : _exp$ios.bundleIdentifier;

  if (currentBundleId) {
    if ((0, _validateApplicationId().validateBundleId)(currentBundleId)) {
      return currentBundleId;
    }

    throw new (_CommandError().default)(`The ios.bundleIdentifier defined in your Expo config is not formatted properly. Only alphanumeric characters, '.', '-', and '_' are allowed, and each '.' must be followed by a letter.`);
  } // Recommend a bundle ID based on the username and project slug.


  let recommendedBundleId; // Attempt to use the android package name first since it's convenient to have them aligned.

  if ((_exp$android = exp.android) !== null && _exp$android !== void 0 && _exp$android.package && (0, _validateApplicationId().validateBundleId)((_exp$android2 = exp.android) === null || _exp$android2 === void 0 ? void 0 : _exp$android2.package)) {
    var _exp$android3;

    recommendedBundleId = (_exp$android3 = exp.android) === null || _exp$android3 === void 0 ? void 0 : _exp$android3.package;
  } else {
    var _exp$owner;

    const username = (_exp$owner = exp.owner) !== null && _exp$owner !== void 0 ? _exp$owner : await _xdl().UserManager.getCurrentUsernameAsync();
    const possibleId = `com.${username}.${exp.slug}`;

    if (username && (0, _validateApplicationId().validateBundleId)(possibleId)) {
      recommendedBundleId = possibleId;
    }
  }

  _log().default.addNewLineIfNone();

  _log().default.log(`${_chalk().default.bold(`📝  iOS Bundle Identifier`)} ${_chalk().default.dim((0, _TerminalLink().learnMore)('https://expo.fyi/bundle-identifier'))}`);

  _log().default.newLine(); // Prompt the user for the bundle ID.
  // Even if the project is using a dynamic config we can still
  // prompt a better error message, recommend a default value, and help the user
  // validate their custom bundle ID upfront.


  const {
    bundleIdentifier
  } = await (0, _prompts().default)({
    type: 'text',
    name: 'bundleIdentifier',
    initial: recommendedBundleId,
    // The Apple helps people know this isn't an EAS feature.
    message: `What would you like your iOS bundle identifier to be?`,
    validate: _validateApplicationId().validateBundleId
  }, {
    nonInteractiveHelp: noBundleIdMessage
  }); // Warn the user if the bundle ID is already in use.

  const warning = await (0, _validateApplicationId().getBundleIdWarningAsync)(bundleIdentifier);

  if (warning) {
    _log().default.newLine();

    _log().default.nestedWarn(warning);

    _log().default.newLine();

    if (!(await (0, _prompts().confirmAsync)({
      message: `Continue?`,
      initial: true
    }))) {
      _log().default.newLine();

      return getOrPromptForBundleIdentifier(projectRoot);
    }
  } // Apply the changes to the config.


  await (0, _modifyConfigAsync().attemptModification)(projectRoot, {
    ios: { ...(exp.ios || {}),
      bundleIdentifier
    }
  }, {
    ios: {
      bundleIdentifier
    }
  });
  return bundleIdentifier;
}

async function getOrPromptForPackage(projectRoot) {
  var _exp$android4, _exp$ios2;

  const {
    exp
  } = (0, _config().getConfig)(projectRoot, {
    skipSDKVersionRequirement: true
  });
  const currentPackage = (_exp$android4 = exp.android) === null || _exp$android4 === void 0 ? void 0 : _exp$android4.package;

  if (currentPackage) {
    if ((0, _validateApplicationId().validatePackage)(currentPackage)) {
      return currentPackage;
    }

    throw new (_CommandError().default)(`Invalid format of Android package name. Only alphanumeric characters, '.' and '_' are allowed, and each '.' must be followed by a letter.`);
  } // Recommend a package name based on the username and project slug.


  let recommendedPackage; // Attempt to use the ios bundle id first since it's convenient to have them aligned.

  if ((_exp$ios2 = exp.ios) !== null && _exp$ios2 !== void 0 && _exp$ios2.bundleIdentifier && (0, _validateApplicationId().validatePackage)(exp.ios.bundleIdentifier)) {
    recommendedPackage = exp.ios.bundleIdentifier;
  } else {
    var _exp$owner2;

    const username = (_exp$owner2 = exp.owner) !== null && _exp$owner2 !== void 0 ? _exp$owner2 : await _xdl().UserManager.getCurrentUsernameAsync(); // It's common to use dashes in your node project name, strip them from the suggested package name.

    const possibleId = `com.${username}.${exp.slug}`.split('-').join('');

    if (username && (0, _validateApplicationId().validatePackage)(possibleId)) {
      recommendedPackage = possibleId;
    }
  }

  _log().default.addNewLineIfNone();

  _log().default.log(`${_chalk().default.bold(`📝  Android package`)} ${_chalk().default.dim((0, _TerminalLink().learnMore)('https://expo.fyi/android-package'))}`);

  _log().default.newLine(); // Prompt the user for the android package.
  // Even if the project is using a dynamic config we can still
  // prompt a better error message, recommend a default value, and help the user
  // validate their custom android package upfront.


  const {
    packageName
  } = await (0, _prompts().default)({
    type: 'text',
    name: 'packageName',
    initial: recommendedPackage,
    message: `What would you like your Android package name to be?`,
    validate: _validateApplicationId().validatePackage
  }, {
    nonInteractiveHelp: noPackageMessage
  }); // Warn the user if the package name is already in use.

  const warning = await (0, _validateApplicationId().getPackageNameWarningAsync)(packageName);

  if (warning) {
    _log().default.newLine();

    _log().default.nestedWarn(warning);

    _log().default.newLine();

    if (!(await (0, _prompts().confirmAsync)({
      message: `Continue?`,
      initial: true
    }))) {
      _log().default.newLine();

      return getOrPromptForPackage(projectRoot);
    }
  } // Apply the changes to the config.


  await (0, _modifyConfigAsync().attemptModification)(projectRoot, {
    android: { ...(exp.android || {}),
      package: packageName
    }
  }, {
    android: {
      package: packageName
    }
  });
  return packageName;
}
//# sourceMappingURL=getOrPromptApplicationId.js.map