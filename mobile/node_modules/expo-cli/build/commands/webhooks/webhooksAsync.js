"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actionAsync = actionAsync;

function _chalk() {
  const data = _interopRequireDefault(require("chalk"));

  _chalk = function () {
    return data;
  };

  return data;
}

function _cliTable() {
  const data = _interopRequireDefault(require("cli-table3"));

  _cliTable = function () {
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

function _utils() {
  const data = require("./utils");

  _utils = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function actionAsync(projectRoot) {
  const {
    experienceName,
    project,
    client
  } = await (0, _utils().setupAsync)(projectRoot);
  const webhooks = await client.getAsync(`projects/${project.id}/webhooks`);

  if (webhooks.length) {
    const table = new (_cliTable().default)({
      head: ['Webhook ID', 'URL', 'Event']
    });
    table.push(...webhooks.map(hook => [hook.id, hook.url, hook.event]));

    _log().default.log(table.toString());
  } else {
    _log().default.log(`${_chalk().default.bold(experienceName)} has no webhooks.`);

    _log().default.log('Use `expo webhooks:add` to add one.');
  }
}
//# sourceMappingURL=webhooksAsync.js.map