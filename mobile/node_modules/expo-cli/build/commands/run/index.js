"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _applyAsyncAction() {
  const data = require("../utils/applyAsyncAction");

  _applyAsyncAction = function () {
    return data;
  };

  return data;
}

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _default(program) {
  (0, _applyAsyncAction().applyAsyncActionProjectDir)(program.command('run:android [path]').description('Run the Android app binary locally').helpGroup('core').option('--no-bundler', 'Skip starting the Metro bundler').option('-d, --device [device]', 'Device name to build the app on').option('-p, --port <port>', 'Port to start the Metro bundler on. Default: 8081').option('--variant [name]', '(Android) build variant', 'debug'), () => Promise.resolve().then(() => _interopRequireWildcard(require('./android/runAndroid'))));
  (0, _applyAsyncAction().applyAsyncActionProjectDir)(program.command('run:ios [path]').description('Run the iOS app binary locally').helpGroup('core').option('--no-build-cache', 'Clear the native derived data before building').option('--no-install', 'Skip installing dependencies').option('--no-bundler', 'Skip starting the Metro bundler').option('-d, --device [device]', 'Device name or UDID to build the app on').option('-p, --port <port>', 'Port to start the Metro bundler on. Default: 8081').option('--scheme [scheme]', 'Scheme to build').option('--configuration <configuration>', 'Xcode configuration to use. Debug or Release. Default: Debug'), () => Promise.resolve().then(() => _interopRequireWildcard(require('./ios/runIos'))), {
    checkConfig: false
  });
}
//# sourceMappingURL=index.js.map