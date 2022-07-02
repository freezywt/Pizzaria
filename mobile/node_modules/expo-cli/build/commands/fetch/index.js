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
  (0, _applyAsyncAction().applyAsyncActionProjectDir)(program.command('fetch:ios:certs [path]').description(`Download the project's iOS standalone app signing credentials`).longDescription(`Fetch this project's iOS certificates/keys and provisioning profile. Writes files to the PROJECT_DIR and prints passwords to stdout.`).helpGroup('credentials'), () => Promise.resolve().then(() => _interopRequireWildcard(require('./fetchIosCertsAsync'))));
  (0, _applyAsyncAction().applyAsyncActionProjectDir)(program.command('fetch:android:keystore [path]').description("Download the project's Android keystore").longDescription("Fetch this project's Android Keystore. Writes Keystore to PROJECT_DIR/PROJECT_NAME.jks and prints passwords to stdout.").helpGroup('credentials'), () => Promise.resolve().then(() => _interopRequireWildcard(require('./fetchAndroidKeystoreAsync'))));
  (0, _applyAsyncAction().applyAsyncActionProjectDir)(program.command('fetch:android:hashes [path]').description("Compute and log the project's Android key hashes").longDescription("Fetch this project's Android key hashes needed to set up Google/Facebook authentication. Note: if you are using Google Play signing, this app will be signed with a different key after publishing to the store, and you'll need to use the hashes displayed in the Google Play console.").helpGroup('credentials'), () => Promise.resolve().then(() => _interopRequireWildcard(require('./fetchAndroidHashesAsync'))));
  (0, _applyAsyncAction().applyAsyncActionProjectDir)(program.command('fetch:android:upload-cert [path]').description("Download the project's Android keystore").longDescription("Fetch this project's upload certificate needed after opting in to app signing by Google Play or after resetting a previous upload certificate").helpGroup('credentials'), () => Promise.resolve().then(() => _interopRequireWildcard(require('./fetchAndroidUploadCertAsync'))));
}
//# sourceMappingURL=index.js.map