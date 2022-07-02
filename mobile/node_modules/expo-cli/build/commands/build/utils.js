"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.askBuildType = askBuildType;
exports.assertPublicUrl = assertPublicUrl;
exports.assertReleaseChannel = assertReleaseChannel;
exports.checkIfSdkIsSupported = checkIfSdkIsSupported;
exports.maybeBailOnWorkflowWarning = maybeBailOnWorkflowWarning;

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

function ProjectUtils() {
  const data = _interopRequireWildcard(require("../utils/ProjectUtils"));

  ProjectUtils = function () {
    return data;
  };

  return data;
}

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function maybeBailOnWorkflowWarning({
  projectRoot,
  platform,
  nonInteractive
}) {
  const {
    workflow
  } = await ProjectUtils().findProjectRootAsync(projectRoot);

  if (workflow === 'managed') {
    return false;
  }

  const command = `expo build:${platform}`;

  _log().default.warn(_chalk().default.bold(`⚠️  ${command} currently only supports managed workflow apps.`));

  _log().default.warn(`If you proceed with this command, we can run the build for you but it will not include any custom native modules or changes that you have made to your local native projects.`);

  _log().default.warn(`Unless you are sure that you know what you are doing, we recommend aborting the build and doing a native release build through ${platform === 'ios' ? 'Xcode' : 'Android Studio'}.`);

  if (nonInteractive) {
    _log().default.warn(`Skipping confirmation prompt because non-interactive mode is enabled.`);

    return false;
  }

  const answer = await (0, _prompts().confirmAsync)({
    message: `Would you like to proceed?`
  });
  return !answer;
}

function assertReleaseChannel(releaseChannel) {
  const channelRe = new RegExp(/^[a-z\d][a-z\d._-]*$/);

  if (!channelRe.test(releaseChannel)) {
    throw new (_CommandError().default)('Release channel name can only contain lowercase letters, numbers and special characters . _ and -');
  }
}

function assertPublicUrl(publicUrl) {
  if (publicUrl && !_xdl().UrlUtils.isHttps(publicUrl)) {
    throw new (_CommandError().default)('INVALID_PUBLIC_URL', '--public-url must be a valid HTTPS URL');
  }
}

async function checkIfSdkIsSupported(sdkVersion, platform) {
  const isSupported = await _xdl().Versions.canTurtleBuildSdkVersion(sdkVersion, platform);
  const minimumSdkVersionSupported = await _xdl().Versions.oldestSupportedMajorVersionAsync();
  const majorSdkVersion = Number(sdkVersion.split('.')[0]);
  const {
    version: latestSDKVersion
  } = await _xdl().Versions.newestReleasedSdkVersionAsync();

  if (!isSupported) {
    _log().default.error(_chalk().default.red('Unsupported SDK version: our app builders ' + (majorSdkVersion < minimumSdkVersionSupported ? `no longer support SDK version ${majorSdkVersion}. Please upgrade to at least SDK ${minimumSdkVersionSupported}, or to the latest SDK version (${latestSDKVersion}).` : `do not support SDK version ${majorSdkVersion}, yet. The latest SDK version is ${latestSDKVersion}.`)));

    throw new Error('Unsupported SDK version');
  }
}

async function askBuildType(typeFromFlag, availableTypes) {
  const allowedTypes = Object.keys(availableTypes);
  const typeIsInvalid = typeFromFlag !== undefined && !allowedTypes.includes(typeFromFlag);

  if (typeFromFlag && !typeIsInvalid) {
    return typeFromFlag;
  }

  if (typeIsInvalid) {
    _log().default.error(`Build type must be one of (${allowedTypes.join(', ')})`);

    if (_commander().default.nonInteractive) {
      process.exit(1);
    }
  }

  if (!typeFromFlag && _commander().default.nonInteractive) {
    return allowedTypes[0];
  }

  const {
    answer
  } = await (0, _prompts().default)({
    type: 'select',
    name: 'answer',
    message: 'Choose the build type you would like:',
    choices: allowedTypes.map(type => ({
      title: type,
      value: type,
      description: availableTypes[type]
    }))
  });
  return answer;
}
//# sourceMappingURL=utils.js.map