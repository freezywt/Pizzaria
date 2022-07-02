"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.displayAndroidAppCredentials = displayAndroidAppCredentials;
exports.displayAndroidCredentials = displayAndroidCredentials;
exports.displayIosAppCredentials = displayIosAppCredentials;
exports.displayIosCredentials = displayIosCredentials;
exports.displayIosUserCredentials = displayIosUserCredentials;
exports.displayProjectCredentials = displayProjectCredentials;

function _chalk() {
  const data = _interopRequireDefault(require("chalk"));

  _chalk = function () {
    return data;
  };

  return data;
}

function _fsExtra() {
  const data = _interopRequireDefault(require("fs-extra"));

  _fsExtra = function () {
    return data;
  };

  return data;
}

function _os() {
  const data = _interopRequireDefault(require("os"));

  _os = function () {
    return data;
  };

  return data;
}

function _path() {
  const data = _interopRequireDefault(require("path"));

  _path = function () {
    return data;
  };

  return data;
}

function _uuid() {
  const data = require("uuid");

  _uuid = function () {
    return data;
  };

  return data;
}

function _xdl() {
  const data = require("xdl");

  _xdl = function () {
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

function displayProjectCredentials(appLookupParams, appCredentials, pushKey, distCert) {
  const experienceName = `@${appLookupParams.accountName}/${appLookupParams.projectName}`;
  const bundleIdentifier = appLookupParams.bundleIdentifier;

  if (!appCredentials) {
    _log().default.log(_chalk().default.bold(`No credentials configured for app ${experienceName} with bundle identifier ${bundleIdentifier}\n`));

    return;
  }

  _log().default.log();

  _log().default.log(_chalk().default.bold('Project Credential Configuration:'));

  displayIosAppCredentials(appCredentials);

  _log().default.log();

  if (distCert) {
    displayIosUserCredentials(distCert);
  }

  if (pushKey) {
    displayIosUserCredentials(pushKey);
  }
}

async function displayIosCredentials(credentials) {
  _log().default.log(_chalk().default.bold('Available credentials for iOS apps\n'));

  _log().default.log(_chalk().default.bold('Application credentials\n'));

  for (const cred of credentials.appCredentials) {
    displayIosAppCredentials(cred);

    _log().default.log();
  }

  _log().default.log();

  _log().default.log(_chalk().default.bold('User credentials\n'));

  for (const cred of credentials.userCredentials) {
    displayIosUserCredentials(cred, credentials);

    _log().default.log();
  }

  _log().default.log();

  _log().default.log();
}

function displayIosAppCredentials(appCredentials) {
  _log().default.log(`  Experience: ${_chalk().default.bold(appCredentials.experienceName)}, bundle identifier: ${appCredentials.bundleIdentifier}`);

  if (appCredentials.credentials.provisioningProfile) {
    _log().default.log(`    Provisioning profile (ID: ${_chalk().default.green(appCredentials.credentials.provisioningProfileId || '---------')})`);
  } else {
    _log().default.log('    Provisioning profile is missing. It will be generated during the next build');
  }

  if (appCredentials.credentials.teamId || appCredentials.credentials.teamName) {
    _log().default.log(`    Apple Team ID: ${_chalk().default.green(appCredentials.credentials.teamId || '---------')},  Apple Team Name: ${_chalk().default.green(appCredentials.credentials.teamName || '---------')}`);
  }

  if (appCredentials.credentials.pushP12 && appCredentials.credentials.pushPassword) {
    _log().default.log(`    (deprecated) Push Certificate (Push ID: ${_chalk().default.green(appCredentials.credentials.pushId || '-----')})`);
  }
}

function displayIosUserCredentials(userCredentials, credentials) {
  if (userCredentials.type === 'push-key') {
    _log().default.log(`  Push Notifications Key - Key ID: ${_chalk().default.green(userCredentials.apnsKeyId)}`);
  } else if (userCredentials.type === 'dist-cert') {
    _log().default.log(`  Distribution Certificate - Certificate ID: ${_chalk().default.green(userCredentials.certId || '-----')}`);
  } else {
    _log().default.warn(`  Unknown key type ${userCredentials.type}`);
  }

  _log().default.log(`    Apple Team ID: ${_chalk().default.green(userCredentials.teamId || '---------')},  Apple Team Name: ${_chalk().default.green(userCredentials.teamName || '---------')}`);

  if (credentials) {
    const field = userCredentials.type === 'push-key' ? 'pushCredentialsId' : 'distCredentialsId';
    const usedByApps = [...new Set(credentials.appCredentials.filter(c => c[field] === userCredentials.id).map(c => `${c.experienceName} (${c.bundleIdentifier})`))].join(',\n      ');
    const usedByAppsText = usedByApps ? `used by\n      ${usedByApps}` : 'not used by any apps';

    _log().default.log(`    ${_chalk().default.gray(usedByAppsText)}`);
  }
}

async function displayAndroidCredentials(credentialsList) {
  _log().default.log(_chalk().default.bold('Available Android credentials'));

  _log().default.log();

  for (const credentials of credentialsList) {
    await displayAndroidAppCredentials(credentials);
  }
}

async function displayAndroidAppCredentials(credentials) {
  const tmpFilename = _path().default.join(_os().default.tmpdir(), `expo_tmp_keystore_${(0, _uuid().v4)()}file.jks`);

  try {
    var _credentials$keystore, _credentials$pushCred, _credentials$pushCred2;

    _log().default.log(_chalk().default.green(credentials.experienceName));

    _log().default.log(_chalk().default.bold('  Upload Keystore hashes'));

    if ((_credentials$keystore = credentials.keystore) !== null && _credentials$keystore !== void 0 && _credentials$keystore.keystore) {
      const storeBuf = Buffer.from(credentials.keystore.keystore, 'base64');
      await _fsExtra().default.writeFile(tmpFilename, storeBuf);
      await _xdl().AndroidCredentials.logKeystoreHashes({
        keystorePath: tmpFilename,
        ...credentials.keystore
      }, '    ');
    } else {
      _log().default.log('    -----------------------');
    }

    _log().default.log(_chalk().default.bold('  Push Notifications credentials'));

    _log().default.log('    FCM Api Key: ', (_credentials$pushCred = (_credentials$pushCred2 = credentials.pushCredentials) === null || _credentials$pushCred2 === void 0 ? void 0 : _credentials$pushCred2.fcmApiKey) !== null && _credentials$pushCred !== void 0 ? _credentials$pushCred : '---------------------');

    _log().default.log('\n');
  } catch (error) {
    _log().default.error('  Failed to parse the Keystore', error);

    _log().default.log('\n');
  } finally {
    await _fsExtra().default.remove(tmpFilename);
  }
}
//# sourceMappingURL=list.js.map