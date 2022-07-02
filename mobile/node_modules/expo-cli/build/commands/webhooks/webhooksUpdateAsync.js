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
  id,
  url,
  event,
  ...options
}) {
  var _event, _secret;

  (0, _assert().default)(typeof id === 'string', '--id must be a webhook ID');
  (0, _assert().default)(event == null || typeof event === 'string', '--event: string is required');
  let secret = (0, _utils().validateSecret)(options);
  const {
    project,
    client
  } = await (0, _utils().setupAsync)(projectRoot);
  const webhook = await client.getAsync(`projects/${project.id}/webhooks/${id}`);
  event = (_event = event) !== null && _event !== void 0 ? _event : webhook.event;
  secret = (_secret = secret) !== null && _secret !== void 0 ? _secret : webhook.secret;
  const spinner = (0, _ora().ora)(`Updating webhook ${id}`).start();
  await client.patchAsync(`projects/${project.id}/webhooks/${id}`, {
    url,
    event,
    secret
  });
  spinner.succeed();
}
//# sourceMappingURL=webhooksUpdateAsync.js.map