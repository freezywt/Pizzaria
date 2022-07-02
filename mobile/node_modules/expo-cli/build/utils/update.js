"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _xdl() {
  const data = require("xdl");

  _xdl = function () {
    return data;
  };

  return data;
}

const packageJSON = require('../../package.json');

const ModuleVersionChecker = _xdl().ModuleVersion.createModuleVersionChecker(packageJSON.name, packageJSON.version);

async function checkForUpdateAsync() {
  return await ModuleVersionChecker.checkAsync();
}

var _default = {
  checkForUpdateAsync
};
exports.default = _default;
//# sourceMappingURL=update.js.map