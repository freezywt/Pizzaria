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

function _utils() {
  const data = require("./utils");

  _utils = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function actionAsync(projectRoot, {
  id
}) {
  (0, _assert().default)(typeof id === 'string', '--id must be a webhook ID');
  const {
    project,
    client
  } = await (0, _utils().setupAsync)(projectRoot);
  await client.deleteAsync(`projects/${project.id}/webhooks/${id}`);
}
//# sourceMappingURL=webhooksRemoveAsync.js.map