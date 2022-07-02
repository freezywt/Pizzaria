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

function _PublishUtils() {
  const data = require("../utils/PublishUtils");

  _PublishUtils = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function actionAsync(projectRoot, options) {
  (0, _assert().default)(options.publishId, '--publish-id must be specified.');
  const detail = await (0, _PublishUtils().getPublicationDetailAsync)(projectRoot, options);
  await (0, _PublishUtils().printPublicationDetailAsync)(detail, options);
}
//# sourceMappingURL=publishDetailsAsync.js.map