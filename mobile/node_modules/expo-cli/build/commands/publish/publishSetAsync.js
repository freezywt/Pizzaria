"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actionAsync = actionAsync;

function table() {
  const data = _interopRequireWildcard(require("../../commands/utils/cli-table"));

  table = function () {
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

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

async function actionAsync(projectRoot, options) {
  if (!options.releaseChannel) {
    throw new Error('You must specify a release channel.');
  }

  if (!options.publishId) {
    throw new Error('You must specify a publish id. You can find ids using publish:history.');
  }

  try {
    const result = await (0, _PublishUtils().setPublishToChannelAsync)(projectRoot, options);
    const tableString = table().printTableJson(result.queryResult, 'Channel Set Status ', 'SUCCESS');

    _log().default.log(tableString);
  } catch (e) {
    _log().default.error(e);
  }
}
//# sourceMappingURL=publishSetAsync.js.map