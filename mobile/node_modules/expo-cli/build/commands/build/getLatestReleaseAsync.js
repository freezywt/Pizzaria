"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLatestReleaseAsync = getLatestReleaseAsync;

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

async function getLatestReleaseAsync(projectRoot, options) {
  const user = await _xdl().UserManager.ensureLoggedInAsync();

  const api = _xdl().ApiV2.clientForUser(user);

  const {
    exp
  } = (0, _config().getConfig)(projectRoot, {
    skipSDKVersionRequirement: true
  });
  const result = await api.postAsync('publish/history', {
    owner: options.owner,
    slug: exp.slug,
    releaseChannel: options.releaseChannel,
    count: 1,
    platform: options.platform
  });
  const {
    queryResult
  } = result;

  if (queryResult && queryResult.length > 0) {
    return queryResult[0];
  } else {
    return null;
  }
}
//# sourceMappingURL=getLatestReleaseAsync.js.map