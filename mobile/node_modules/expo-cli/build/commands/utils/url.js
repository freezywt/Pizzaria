"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.constructArtifactUrl = constructArtifactUrl;
exports.constructBuildLogsUrl = constructBuildLogsUrl;
exports.constructTurtleStatusUrl = constructTurtleStatusUrl;
exports.getExpoDomainUrl = getExpoDomainUrl;
exports.isUrlAvailableAsync = isUrlAvailableAsync;

function _dns() {
  const data = _interopRequireDefault(require("dns"));

  _dns = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getExpoDomainUrl() {
  if (process.env.EXPO_STAGING) {
    return `https://staging.expo.dev`;
  } else if (process.env.EXPO_LOCAL) {
    return `http://expo.test`;
  } else {
    return `https://expo.dev`;
  }
}

function constructBuildLogsUrl({
  buildId,
  username,
  projectSlug
}) {
  if (username && projectSlug) {
    return `${getExpoDomainUrl()}/accounts/${username}/projects/${projectSlug}/builds/${buildId}`;
  } else if (username) {
    return `${getExpoDomainUrl()}/accounts/${username}/builds/${buildId}`;
  } else {
    return `${getExpoDomainUrl()}/builds/${buildId}`;
  }
}

function constructTurtleStatusUrl() {
  return `${getExpoDomainUrl()}/turtle-status`;
}

function constructArtifactUrl(artifactId) {
  return `${getExpoDomainUrl()}/artifacts/${artifactId}`;
}

function isUrlAvailableAsync(url) {
  return new Promise(resolve => {
    _dns().default.lookup(url, err => {
      resolve(!err);
    });
  });
}
//# sourceMappingURL=url.js.map