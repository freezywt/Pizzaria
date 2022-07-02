"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findReusableBuildAsync = findReusableBuildAsync;

function _xdl() {
  const data = require("xdl");

  _xdl = function () {
    return data;
  };

  return data;
}

async function findReusableBuildAsync(releaseChannel, platform, sdkVersion, slug, owner) {
  const user = await _xdl().UserManager.getCurrentUserAsync();
  const buildReuseStatus = await _xdl().ApiV2.clientForUser(user).postAsync('standalone-build/reuse', {
    releaseChannel,
    platform,
    sdkVersion,
    slug,
    owner
  });
  return buildReuseStatus;
}
//# sourceMappingURL=findReusableBuildAsync.js.map