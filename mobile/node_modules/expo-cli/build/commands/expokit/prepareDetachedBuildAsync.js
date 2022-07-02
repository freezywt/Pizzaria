"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actionAsync = actionAsync;

function _xdl() {
  const data = require("xdl");

  _xdl = function () {
    return data;
  };

  return data;
}

async function actionAsync(projectRoot, options) {
  await _xdl().Detach.prepareDetachedBuildAsync(projectRoot, options);
}
//# sourceMappingURL=prepareDetachedBuildAsync.js.map