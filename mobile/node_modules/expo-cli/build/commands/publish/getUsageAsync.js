"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUsageAsync = getUsageAsync;

function _uniqBy() {
  const data = _interopRequireDefault(require("lodash/uniqBy"));

  _uniqBy = function () {
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

function _PublishUtils() {
  const data = require("../utils/PublishUtils");

  _PublishUtils = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function getUsageAsync(projectRoot) {
  try {
    return await _getUsageAsync(projectRoot);
  } catch (e) {
    _log().default.warn(e); // couldn't print out warning for some reason


    return _getGenericUsage();
  }
}

async function _getUsageAsync(projectRoot) {
  const allPlatforms = ['ios', 'android'];
  const publishesResult = await (0, _PublishUtils().getPublishHistoryAsync)(projectRoot, {
    releaseChannel: 'default',
    // not specifying a channel will return most recent publishes but this is not neccesarily the most recent entry in a channel (user could have set an older publish to top of the channel)
    count: allPlatforms.length
  });
  const publishes = publishesResult.queryResult; // If the user published normally, there would be a publish for each platform with the same revisionId

  const uniquePlatforms = (0, _uniqBy().default)(publishes, publish => publish.platform);

  if (uniquePlatforms.length !== allPlatforms.length) {
    // User probably applied some custom `publish:set` or `publish:rollback` command
    return _getGenericUsage();
  }

  const details = await Promise.all(publishes.map(async publication => {
    const detailOptions = {
      publishId: publication.publicationId
    };
    return await (0, _PublishUtils().getPublicationDetailAsync)(projectRoot, detailOptions);
  }));
  const uniqueRevisionIds = (0, _uniqBy().default)(details, detail => detail.revisionId);

  if (uniqueRevisionIds.length !== 1) {
    // User probably applied some custom `publish:set` or `publish:rollback` command
    return _getGenericUsage();
  }

  const {
    channel
  } = publishes[0];
  const {
    revisionId,
    publishedTime,
    sdkVersion
  } = details[0];

  const timeDifferenceString = _getTimeDifferenceString(new Date(), new Date(publishedTime));

  return `--release-channel and either --sdk-version or --runtime-version arguments are required. \n` + `For example, to roll back the revision [${revisionId}] on release channel [${channel}] (published ${timeDifferenceString}), \n` + `run: expo publish:rollback --release-channel ${channel} --sdk-version ${sdkVersion}`;
}

function _getTimeDifferenceString(t0, t1) {
  const minutesInMs = 60 * 1000;
  const hourInMs = 60 * minutesInMs;
  const dayInMs = 24 * hourInMs; // hours*minutes*seconds*milliseconds

  const diffMs = Math.abs(t1.getTime() - t0.getTime());
  const diffDays = Math.round(diffMs / dayInMs);

  if (diffDays > 0) {
    return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
  }

  const diffHours = Math.round(diffMs / hourInMs);

  if (diffHours > 0) {
    return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
  }

  const diffMinutes = Math.round(diffMs / minutesInMs);

  if (diffMinutes > 0) {
    return `${diffMinutes} minute${diffMinutes === 1 ? '' : 's'} ago`;
  }

  return 'recently';
}

function _getGenericUsage() {
  return `--release-channel and either --sdk-version or --runtime-version arguments are required. \n` + `For example, to roll back the latest publishes on the default channel for sdk 37.0.0, \n` + `run: expo publish:rollback --release-channel default --sdk-version 37.0.0 \n` + `To rollback a specific platform, use the --platform flag.`;
}
//# sourceMappingURL=getUsageAsync.js.map