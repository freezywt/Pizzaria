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
  (0, _applyAsyncAction().applyAsyncActionProjectDir)(program.command('build:ios [path]').alias('bi').helpGroup('deprecated').option('-c, --clear-credentials', 'Clear all credentials stored on Expo servers.').option('--clear-dist-cert', 'Remove Distribution Certificate stored on Expo servers.').option('--clear-push-key', 'Remove Push Notifications Key stored on Expo servers.').option('--clear-push-cert', 'Remove Push Notifications Certificate stored on Expo servers. Use of Push Notifications Certificates is deprecated.').option('--clear-provisioning-profile', 'Remove Provisioning Profile stored on Expo servers.').option('-r --revoke-credentials', 'Revoke credentials on developer.apple.com, select appropriate using --clear-* options.').option('--apple-id <login>', 'Apple ID username (please also set the Apple ID password as EXPO_APPLE_PASSWORD environment variable).').option('-t --type <archive|simulator>', 'Type of build: [archive|simulator].').option('--release-channel <name>', 'Pull from specified release channel.', 'default').option('--no-publish', 'Disable automatic publishing before building.').option('--no-wait', 'Exit immediately after scheduling build.').option('--team-id <apple-teamId>', 'Apple Team ID.').option('--dist-p12-path <path>', 'Path to your Distribution Certificate P12 (set password as EXPO_IOS_DIST_P12_PASSWORD environment variable).').option('--push-id <push-id>', 'Push Key ID (ex: 123AB4C56D).').option('--push-p8-path <path>', 'Path to your Push Key .p8 file.').option('--provisioning-profile-path <path>', 'Path to your Provisioning Profile.').option('--public-url <url>', 'The URL of an externally hosted manifest (for self-hosted apps).').option('--skip-credentials-check', 'Skip checking credentials.').option('--skip-workflow-check', 'Skip warning about build service bare workflow limitations.').longDescription('Build and sign a standalone IPA for the Apple App Store').description(`${_chalk().default.yellow`Superseded`} by ${_chalk().default.bold`eas build`} in eas-cli`), () => Promise.resolve().then(() => _interopRequireWildcard(require('./buildIosAsync'))), {
    checkConfig: true
  });
  (0, _applyAsyncAction().applyAsyncActionProjectDir)(program.command('build:android [path]').alias('ba').helpGroup('deprecated').option('-c, --clear-credentials', 'Clear stored credentials.').option('--release-channel <name>', 'Pull from specified release channel.', 'default').option('--no-publish', 'Disable automatic publishing before building.').option('--no-wait', 'Exit immediately after triggering build.').option('--keystore-path <path>', 'Path to your Keystore: *.jks.').option('--keystore-alias <alias>', 'Keystore Alias').option('--generate-keystore', '[deprecated] Generate Keystore if one does not exist').option('--public-url <url>', 'The URL of an externally hosted manifest (for self-hosted apps)').option('--skip-workflow-check', 'Skip warning about build service bare workflow limitations.').option('-t --type <app-bundle|apk>', 'Type of build: [app-bundle|apk].').longDescription('Build and sign a standalone APK or App Bundle for the Google Play Store').description(`${_chalk().default.yellow`Superseded`} by ${_chalk().default.bold`eas build`} in eas-cli`), () => Promise.resolve().then(() => _interopRequireWildcard(require('./buildAndroidAsync'))), {
    checkConfig: true
  });
  (0, _applyAsyncAction().applyAsyncActionProjectDir)(program.command('build:web [path]').helpGroup('build').option('-c, --clear', 'Clear all cached build files and assets.').option('--no-pwa', 'Prevent webpack from generating the manifest.json and injecting meta into the index.html head.').option('-d, --dev', 'Turns dev flag on before bundling').description('Build the web app for production'), () => Promise.resolve().then(() => _interopRequireWildcard(require('./buildWebAsync'))));
  (0, _applyAsyncAction().applyAsyncActionProjectDir)(program.command('build:status [path]').alias('bs').helpGroup('deprecated').option('--public-url <url>', 'The URL of an externally hosted manifest (for self-hosted apps).').longDescription('Get the status of the latest build for the project').description(`${_chalk().default.yellow`Superseded`} by ${_chalk().default.bold`eas build:list`} in eas-cli`), () => Promise.resolve().then(() => _interopRequireWildcard(require('./buildStatusAsync'))));
}
//# sourceMappingURL=index.js.map