"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actionAsync = actionAsync;

function _assert() {
  const data = _interopRequireDefault(require("assert"));

  _assert = function () {
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

function _PublishUtils() {
  const data = require("../utils/PublishUtils");

  _PublishUtils = function () {
    return data;
  };

  return data;
}

function _getUsageAsync() {
  const data = require("./getUsageAsync");

  _getUsageAsync = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function actionAsync(projectRoot, options) {
  (0, _assert().default)(!options.channelId, '--channel-id flag is deprecated and does not do anything. Please use --release-channel and --sdk-version instead.');

  if (!options.releaseChannel || !options.sdkVersion) {
    const usage = await (0, _getUsageAsync().getUsageAsync)(projectRoot);
    throw new (_CommandError().default)(usage);
  }

  if (options.platform) {
    if (options.platform !== 'android' && options.platform !== 'ios') {
      throw new (_CommandError().default)('Platform must be either android or ios. Leave out the platform flag to target both platforms.');
    }
  }

  await (0, _PublishUtils().rollbackPublicationFromChannelAsync)(projectRoot, options);
}
//# sourceMappingURL=publishRollbackAsync.js.map