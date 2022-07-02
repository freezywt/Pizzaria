"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logArtifactUrl = void 0;

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

function _getBuildStatusAsync() {
  const data = require("../build/getBuildStatusAsync");

  _getBuildStatusAsync = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function assertHTTPS(url) {
  if (url && !_xdl().UrlUtils.isHttps(url)) {
    throw new (_CommandError().default)('INVALID_PUBLIC_URL', '--public-url must be a valid HTTPS URL.');
  }
}

const logArtifactUrl = platform => async (projectRoot, options) => {
  var _result$jobs, _result$jobs$filter$, _result$jobs$filter$$;

  assertHTTPS(options.publicUrl);
  const result = await (0, _getBuildStatusAsync().getBuildStatusAsync)(projectRoot, {
    current: false,
    ...(options.publicUrl ? {
      publicUrl: options.publicUrl
    } : {})
  });
  const url = (_result$jobs = result.jobs) === null || _result$jobs === void 0 ? void 0 : (_result$jobs$filter$ = _result$jobs.filter(job => job.platform === platform)[0]) === null || _result$jobs$filter$ === void 0 ? void 0 : (_result$jobs$filter$$ = _result$jobs$filter$.artifacts) === null || _result$jobs$filter$$ === void 0 ? void 0 : _result$jobs$filter$$.url;

  if (!url) {
    throw new (_CommandError().default)(`No ${platform} binary file found. Use "expo build:${platform}" to create one.`);
  }

  _log().default.nested(url);
};

exports.logArtifactUrl = logArtifactUrl;
//# sourceMappingURL=logArtifactUrl.js.map