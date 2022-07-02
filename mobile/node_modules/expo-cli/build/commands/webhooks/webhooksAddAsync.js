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

function _ora() {
  const data = require("../../utils/ora");

  _ora = function () {
    return data;
  };

  return data;
}

function _utils() {
  const data = require("./utils");

  _utils = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function actionAsync(projectRoot, {
  url,
  event,
  ...options
}) {
  (0, _assert().default)(typeof url === 'string' && /^https?/.test(url), '--url: a HTTP URL is required');
  (0, _assert().default)(typeof event === 'string', '--event: string is required');
  const secret = (0, _utils().validateSecret)(options) || (0, _utils().generateSecret)();
  const {
    experienceName,
    project,
    client
  } = await (0, _utils().setupAsync)(projectRoot);
  const spinner = (0, _ora().ora)(`Adding webhook to ${experienceName}`).start();
  await client.postAsync(`projects/${project.id}/webhooks`, {
    url,
    event,
    secret
  });
  spinner.succeed();
}
//# sourceMappingURL=webhooksAddAsync.js.map