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
  return _xdl().Webpack.bundleAsync(projectRoot, { ...options,
    dev: typeof options.dev === 'undefined' ? false : options.dev
  });
}
//# sourceMappingURL=buildWebAsync.js.map