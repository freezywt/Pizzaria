"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = validateKeystoreAsync;

function _spawnAsync() {
  const data = _interopRequireDefault(require("@expo/spawn-async"));

  _spawnAsync = function () {
    return data;
  };

  return data;
}

function _commandExists() {
  const data = _interopRequireDefault(require("command-exists"));

  _commandExists = function () {
    return data;
  };

  return data;
}

function _tempy() {
  const data = _interopRequireDefault(require("tempy"));

  _tempy = function () {
    return data;
  };

  return data;
}

function _terminalLink() {
  const data = _interopRequireDefault(require("terminal-link"));

  _terminalLink = function () {
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

async function validateKeystoreAsync({
  keystore: keystoreBase64,
  keystorePassword,
  keyAlias
}) {
  try {
    await (0, _commandExists().default)('keytool');
  } catch (e) {
    _log().default.warn(`Couldn't validate the provided Android keystore because the 'keytool' command is not available. Make sure that you have a Java Development Kit installed. See ${(0, _terminalLink().default)('https://openjdk.java.net', 'https://openjdk.java.net')} to install OpenJDK.`);

    return;
  }

  try {
    await _tempy().default.write.task(Buffer.from(keystoreBase64, 'base64'), async keystorePath => {
      await (0, _spawnAsync().default)('keytool', ['-list', '-keystore', keystorePath, '-storepass', keystorePassword, '-alias', keyAlias]);
    });
  } catch (e) {
    throw new Error(`An error occurred when validating the Android keystore: ${e.stdout || e.message}\nMake sure that you provided correct credentials in 'credentials.json' and the path provided under 'keystorePath' points to a valid keystore file.`);
  }
}
//# sourceMappingURL=validateKeystore.js.map