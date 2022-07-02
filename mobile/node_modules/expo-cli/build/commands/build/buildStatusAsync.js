"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actionAsync = actionAsync;

function _BaseBuilder() {
  const data = _interopRequireDefault(require("./BaseBuilder"));

  _BaseBuilder = function () {
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

async function actionAsync(projectRoot, options) {
  (0, _utils().assertPublicUrl)(options.publicUrl);
  const builder = new (_BaseBuilder().default)(projectRoot, options);
  return builder.commandCheckStatus();
}
//# sourceMappingURL=buildStatusAsync.js.map