"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actionAsync = actionAsync;

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

async function actionAsync(projectRoot, options) {
  if (!options.apiKey || options.apiKey.length === 0) {
    throw new Error('Must specify an API key to upload with --api-key.');
  }

  const ctx = new (_context().Context)();
  await ctx.init(projectRoot);
  const experienceName = `@${ctx.projectOwner}/${ctx.manifest.slug}`;
  await ctx.android.updateFcmKey(experienceName, options.apiKey);

  _log().default.log('All done!');
}
//# sourceMappingURL=pushAndroidUploadAsync.js.map