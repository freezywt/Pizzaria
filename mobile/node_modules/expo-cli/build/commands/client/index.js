"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _chalk() {
  const data = _interopRequireDefault(require("chalk"));

  _chalk = function () {
    return data;
  };

  return data;
}

function _applyAsyncAction() {
  const data = require("../utils/applyAsyncAction");

  _applyAsyncAction = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _default(program) {
  (0, _applyAsyncAction().applyAsyncActionProjectDir)(program.command('client:ios [path]').helpGroup('deprecated').description(_chalk().default.yellow`Superseded` + ' by Expo Dev Clients').longDescription('Build a custom version of Expo Go for iOS using your own Apple credentials and install it on your mobile device using Safari.').option('--apple-id <login>', 'Apple ID username (please also set the Apple ID password as EXPO_APPLE_PASSWORD environment variable).'), () => Promise.resolve().then(() => _interopRequireWildcard(require('./clientIosAsync'))));
  (0, _applyAsyncAction().applyAnyAsyncAction)(program.command('client:install:ios').description('Install Expo Go for iOS on the simulator').option('--latest', `Install the latest version of Expo Go, ignoring the current project version.`).helpGroup('client'), () => Promise.resolve().then(() => _interopRequireWildcard(require('./clientInstallIosAsync'))));
  (0, _applyAsyncAction().applyAnyAsyncAction)(program.command('client:install:android').description('Install Expo Go for Android on a connected device or emulator').option('-d, --device [device]', 'Device name to install the client on').option('--latest', `Install the latest version of Expo Go, ignore the current project version.`).helpGroup('client'), () => Promise.resolve().then(() => _interopRequireWildcard(require('./clientInstallAndroidAsync'))));
}
//# sourceMappingURL=index.js.map