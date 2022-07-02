"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _applyAsyncAction() {
  const data = require("./utils/applyAsyncAction");

  _applyAsyncAction = function () {
    return data;
  };

  return data;
}

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _default(program) {
  // TODO: audit params
  (0, _applyAsyncAction().applyAsyncActionProjectDir)(program.command('url [path]').alias('u').helpGroup('url').description('Log a URL for opening the project in Expo Go').urlOpts().allowOffline(), () => Promise.resolve().then(() => _interopRequireWildcard(require('./url/urlAsync'))));
  (0, _applyAsyncAction().applyAsyncActionProjectDir)(program.command('url:ipa [path]').helpGroup('url').option('--public-url <url>', 'The URL of an externally hosted manifest (for self-hosted apps)').description('Log the download URL for the standalone iOS binary'), () => Promise.resolve().then(() => _interopRequireWildcard(require('./url/urlIpaAsync'))));
  (0, _applyAsyncAction().applyAsyncActionProjectDir)(program.command('url:apk [path]').helpGroup('url').option('--public-url <url>', 'The URL of an externally hosted manifest (for self-hosted apps)').description('Log the download URL for the standalone Android binary'), () => Promise.resolve().then(() => _interopRequireWildcard(require('./url/urlApkAsync'))));
}
//# sourceMappingURL=url.js.map