"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPublicationDetailAsync = getPublicationDetailAsync;
exports.getPublishHistoryAsync = getPublishHistoryAsync;
exports.printPublicationDetailAsync = printPublicationDetailAsync;
exports.rollbackPublicationFromChannelAsync = rollbackPublicationFromChannelAsync;
exports.setPublishToChannelAsync = setPublishToChannelAsync;

function _config() {
  const data = require("@expo/config");

  _config = function () {
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

function _log() {
  const data = _interopRequireDefault(require("../../log"));

  _log = function () {
    return data;
  };

  return data;
}

function _ora() {
  const data = require("../../utils/ora");

  _ora = function () {
    return data;
  };

  return data;
}

function _prompts() {
  const data = require("../../utils/prompts");

  _prompts = function () {
    return data;
  };

  return data;
}

function table() {
  const data = _interopRequireWildcard(require("./cli-table"));

  table = function () {
    return data;
  };

  return data;
}

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const VERSION = 2;

async function getPublishHistoryAsync(projectRoot, options) {
  if (options.count && (isNaN(options.count) || options.count < 1 || options.count > 100)) {
    throw new Error('-n must be a number between 1 and 100 inclusive');
  } // TODO(ville): handle the API result for not authenticated user instead of checking upfront


  const user = await _xdl().UserManager.ensureLoggedInAsync();
  const {
    exp
  } = (0, _config().getConfig)(projectRoot, {
    skipSDKVersionRequirement: true
  });

  const api = _xdl().ApiV2.clientForUser(user);

  return await api.postAsync('publish/history', {
    owner: _xdl().UserManager.getProjectOwner(user, exp),
    slug: exp.slug,
    version: VERSION,
    releaseChannel: options.releaseChannel,
    count: options.count,
    platform: options.platform,
    sdkVersion: options.sdkVersion,
    runtimeVersion: options.runtimeVersion
  });
}

async function setPublishToChannelAsync(projectRoot, options) {
  const user = await _xdl().UserManager.ensureLoggedInAsync();

  const api = _xdl().ApiV2.clientForUser(user);

  const exp = (0, _config().getConfig)(projectRoot, {
    skipSDKVersionRequirement: true
  }).exp;
  return await api.postAsync('publish/set', {
    releaseChannel: options.releaseChannel,
    publishId: options.publishId,
    slug: exp.slug
  });
}

async function _rollbackPublicationFromChannelForPlatformAsync(projectRoot, platform, options) {
  const {
    releaseChannel,
    sdkVersion,
    runtimeVersion
  } = options; // get the 2 most recent things in the channel history

  const historyQueryResult = await getPublishHistoryAsync(projectRoot, {
    releaseChannel,
    platform,
    sdkVersion,
    runtimeVersion,
    count: 2
  });
  const history = historyQueryResult.queryResult;

  if (history.length === 0) {
    throw new Error(`There isn't anything published for release channel: ${releaseChannel}, sdk version: ${sdkVersion}, platform: ${platform}`);
  } else if (history.length === 1) {
    throw new Error(`There is only 1 publication for release channel: ${releaseChannel}, sdk version: ${sdkVersion}, platform: ${platform}. There won't be anything for users to receive if we rollback.`);
  } // The second most recent publication in the history


  const secondMostRecent = history[history.length - 1];
  const nonInteractiveOptions = options.parent ? {
    parent: options.parent
  } : {}; // confirm that users will be receiving the secondMostRecent item in the Publish history

  await _printAndConfirm(projectRoot, secondMostRecent.publicationId, releaseChannel, platform, nonInteractiveOptions); // apply the revert publication to channel

  const revertProgress = (0, _ora().ora)(`${platform}: Applying a revert publication to channel ${releaseChannel}`).start();
  await setPublishToChannelAsync(projectRoot, {
    releaseChannel,
    publishId: secondMostRecent.publicationId
  });
  revertProgress.succeed(`${platform}: Successfully applied revert publication. You can view it with \`publish:history\``);
}

async function rollbackPublicationFromChannelAsync(projectRoot, options) {
  const {
    platform,
    ...restOfTheOptions
  } = options;

  if (platform) {
    return await _rollbackPublicationFromChannelForPlatformAsync(projectRoot, platform, restOfTheOptions);
  }

  const platforms = ['android', 'ios'];
  const completedPlatforms = [];

  try {
    for (const platform of platforms) {
      await _rollbackPublicationFromChannelForPlatformAsync(projectRoot, platform, restOfTheOptions);
      completedPlatforms.push(platform);
    }
  } catch (e) {
    if (completedPlatforms.length > 0) {
      _log().default.error(`The platforms ${platforms.filter(platform => !completedPlatforms.includes(platform))} have not been rolled back. You can complete the missing platforms by running \`expo publish:rollback\` with the --platform flag`);
    }

    throw e;
  }
}

async function _printAndConfirm(projectRoot, publicationId, channel, platform, partialOptions) {
  const detailOptions = {
    publishId: publicationId
  };
  const detail = await getPublicationDetailAsync(projectRoot, detailOptions);
  await printPublicationDetailAsync(detail, detailOptions);

  if (partialOptions.parent && partialOptions.parent.nonInteractive) {
    return;
  }

  const confirm = await (0, _prompts().confirmAsync)({
    message: `${platform}: Users on the '${channel}' channel will receive the above publication as a result of the rollback.`
  });

  if (!confirm) {
    throw new Error(`You can run 'publish:set' to send the desired publication to users`);
  }
}

async function getPublicationDetailAsync(projectRoot, options) {
  // TODO(ville): handle the API result for not authenticated user instead of checking upfront
  const user = await _xdl().UserManager.ensureLoggedInAsync();
  const {
    exp
  } = (0, _config().getConfig)(projectRoot, {
    skipSDKVersionRequirement: true
  });

  const api = _xdl().ApiV2.clientForUser(user);

  const result = await api.postAsync('publish/details', {
    owner: _xdl().UserManager.getProjectOwner(user, exp),
    publishId: options.publishId,
    slug: exp.slug
  });

  if (!result.queryResult) {
    throw new Error('No records found matching your query.');
  }

  return result.queryResult;
}

async function printPublicationDetailAsync(detail, options) {
  if (options.raw) {
    _log().default.log(JSON.stringify(detail));

    return;
  }

  const manifest = detail.manifest;
  delete detail.manifest; // Print general release info

  const generalTableString = table().printTableJson(detail, 'Release Description');

  _log().default.log(generalTableString);

  if (manifest) {
    // Print manifest info
    const manifestTableString = table().printTableJson(manifest, 'Manifest Details');

    _log().default.log(manifestTableString);
  }
}
//# sourceMappingURL=PublishUtils.js.map