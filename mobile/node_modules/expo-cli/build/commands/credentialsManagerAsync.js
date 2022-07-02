"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actionAsync = actionAsync;

function _credentials() {
  const data = require("../credentials");

  _credentials = function () {
    return data;
  };

  return data;
}

function _Select() {
  const data = require("../credentials/views/Select");

  _Select = function () {
    return data;
  };

  return data;
}

async function actionAsync(projectRoot, options) {
  var _options$parent;

  const context = new (_credentials().Context)();
  await context.init(projectRoot, {
    nonInteractive: (_options$parent = options.parent) === null || _options$parent === void 0 ? void 0 : _options$parent.nonInteractive
  });
  let mainpage;

  if (options.platform === 'android') {
    mainpage = new (_Select().SelectAndroidExperience)();
  } else if (options.platform === 'ios') {
    mainpage = new (_Select().SelectIosExperience)();
  } else {
    mainpage = new (_Select().SelectPlatform)();
  }

  await (0, _credentials().runCredentialsManagerStandalone)(context, mainpage);
}
//# sourceMappingURL=credentialsManagerAsync.js.map