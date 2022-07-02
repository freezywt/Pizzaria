"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actionAsync = actionAsync;

function _CommandError() {
  const data = _interopRequireDefault(require("../../CommandError"));

  _CommandError = function () {
    return data;
  };

  return data;
}

function _context() {
  const data = require("../../credentials/context");

  _context = function () {
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function actionAsync(projectRoot) {
  const ctx = new (_context().Context)();
  await ctx.init(projectRoot);
  const experienceName = `@${ctx.projectOwner}/${ctx.manifest.slug}`;
  const fcmCredentials = await ctx.android.fetchFcmKey(experienceName);

  if (fcmCredentials !== null && fcmCredentials !== void 0 && fcmCredentials.fcmApiKey) {
    _log().default.log(`FCM API key: ${fcmCredentials === null || fcmCredentials === void 0 ? void 0 : fcmCredentials.fcmApiKey}`);
  } else {
    throw new (_CommandError().default)(`There is no FCM API key configured for this project`);
  }
}
//# sourceMappingURL=pushAndroidShowAsync.js.map