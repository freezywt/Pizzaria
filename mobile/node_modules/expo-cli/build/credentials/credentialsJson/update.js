"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateAndroidCredentialsAsync = updateAndroidCredentialsAsync;
exports.updateIosCredentialsAsync = updateIosCredentialsAsync;

function _fsExtra() {
  const data = _interopRequireDefault(require("fs-extra"));

  _fsExtra = function () {
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

function _log() {
  const data = _interopRequireDefault(require("../../log"));

  _log = function () {
    return data;
  };

  return data;
}

function _prompts() {
  const data = require("../../utils/prompts");

  _prompts = function () {
    return data;
  };

  return data;
}

function _git() {
  const data = require("../utils/git");

  _git = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function updateAndroidCredentialsAsync(ctx) {
  var _rawCredentialsJsonOb, _rawCredentialsJsonOb2, _rawCredentialsJsonOb3, _rawCredentialsJsonOb4;

  const credentialsJsonFilePath = _path().default.join(ctx.projectDir, 'credentials.json');

  let rawCredentialsJsonObject = {};

  if (await _fsExtra().default.pathExists(credentialsJsonFilePath)) {
    try {
      const rawFile = await _fsExtra().default.readFile(credentialsJsonFilePath, 'utf-8');
      rawCredentialsJsonObject = JSON.parse(rawFile);
    } catch (error) {
      _log().default.error(`There was an error while reading credentials.json [${error}]`);

      _log().default.error('Make sure that file is correct (or remove it) and rerun this command.');

      throw error;
    }
  }

  const experienceName = `@${ctx.projectOwner}/${ctx.manifest.slug}`;
  const keystore = await ctx.android.fetchKeystore(experienceName);

  if (!keystore) {
    _log().default.error('There are no credentials configured for this project on Expo servers');

    return;
  }

  const isKeystoreComplete = keystore.keystore && keystore.keystorePassword && keystore.keyPassword && keystore.keyAlias;

  if (!isKeystoreComplete) {
    const confirm = await (0, _prompts().confirmAsync)({
      message: 'Credentials on Expo servers might be invalid or incomplete. Are you sure you want to continue?'
    });

    if (!confirm) {
      _log().default.warn('Aborting...');

      return;
    }
  }

  const keystorePath = (_rawCredentialsJsonOb = (_rawCredentialsJsonOb2 = rawCredentialsJsonObject) === null || _rawCredentialsJsonOb2 === void 0 ? void 0 : (_rawCredentialsJsonOb3 = _rawCredentialsJsonOb2.android) === null || _rawCredentialsJsonOb3 === void 0 ? void 0 : (_rawCredentialsJsonOb4 = _rawCredentialsJsonOb3.keystore) === null || _rawCredentialsJsonOb4 === void 0 ? void 0 : _rawCredentialsJsonOb4.keystorePath) !== null && _rawCredentialsJsonOb !== void 0 ? _rawCredentialsJsonOb : 'android/keystores/keystore.jks';

  _log().default.log(`Writing Keystore to ${keystorePath}`);

  await updateFileAsync(ctx.projectDir, keystorePath, keystore.keystore);
  const shouldWarnKeystore = await isFileUntrackedAsync(keystorePath);
  rawCredentialsJsonObject.android = {
    keystore: {
      keystorePath,
      keystorePassword: keystore.keystorePassword,
      keyAlias: keystore.keyAlias,
      keyPassword: keystore.keyPassword
    }
  };
  await _fsExtra().default.writeJson(credentialsJsonFilePath, rawCredentialsJsonObject, {
    spaces: 2
  });
  const shouldWarnCredentialsJson = await isFileUntrackedAsync('credentials.json');
  const newFilePaths = [];

  if (shouldWarnKeystore) {
    newFilePaths.push(keystorePath);
  }

  if (shouldWarnCredentialsJson) {
    newFilePaths.push('credentials.json');
  }

  displayUntrackedFilesWarning(newFilePaths);
}

async function updateIosCredentialsAsync(ctx, bundleIdentifier) {
  var _rawCredentialsJsonOb5, _rawCredentialsJsonOb6, _rawCredentialsJsonOb7, _rawCredentialsJsonOb8, _rawCredentialsJsonOb9, _rawCredentialsJsonOb10, _rawCredentialsJsonOb11, _appCredentials$crede, _appCredentials$crede2, _appCredentials$crede3, _appCredentials$crede4;

  const credentialsJsonFilePath = _path().default.join(ctx.projectDir, 'credentials.json');

  let rawCredentialsJsonObject = {};

  if (await _fsExtra().default.pathExists(credentialsJsonFilePath)) {
    try {
      const rawFile = await _fsExtra().default.readFile(credentialsJsonFilePath, 'utf-8');
      rawCredentialsJsonObject = JSON.parse(rawFile);
    } catch (error) {
      _log().default.error(`There was an error while reading credentials.json [${error}]`);

      _log().default.error('Make sure that file is correct (or remove it) and rerun this command.');

      throw error;
    }
  }

  const appLookupParams = {
    accountName: ctx.projectOwner,
    projectName: ctx.manifest.slug,
    bundleIdentifier
  };
  const pprofilePath = (_rawCredentialsJsonOb5 = (_rawCredentialsJsonOb6 = rawCredentialsJsonObject) === null || _rawCredentialsJsonOb6 === void 0 ? void 0 : (_rawCredentialsJsonOb7 = _rawCredentialsJsonOb6.ios) === null || _rawCredentialsJsonOb7 === void 0 ? void 0 : _rawCredentialsJsonOb7.provisioningProfilePath) !== null && _rawCredentialsJsonOb5 !== void 0 ? _rawCredentialsJsonOb5 : 'ios/certs/profile.mobileprovision';
  const distCertPath = (_rawCredentialsJsonOb8 = (_rawCredentialsJsonOb9 = rawCredentialsJsonObject) === null || _rawCredentialsJsonOb9 === void 0 ? void 0 : (_rawCredentialsJsonOb10 = _rawCredentialsJsonOb9.ios) === null || _rawCredentialsJsonOb10 === void 0 ? void 0 : (_rawCredentialsJsonOb11 = _rawCredentialsJsonOb10.distributionCertificate) === null || _rawCredentialsJsonOb11 === void 0 ? void 0 : _rawCredentialsJsonOb11.path) !== null && _rawCredentialsJsonOb8 !== void 0 ? _rawCredentialsJsonOb8 : 'ios/certs/dist-cert.p12';
  const appCredentials = await ctx.ios.getAppCredentials(appLookupParams);
  const distCredentials = await ctx.ios.getDistCert(appLookupParams);

  if (!(appCredentials !== null && appCredentials !== void 0 && (_appCredentials$crede = appCredentials.credentials) !== null && _appCredentials$crede !== void 0 && _appCredentials$crede.provisioningProfile) && !distCredentials) {
    _log().default.error('There are no credentials configured for this project on Expo servers');

    return;
  }

  const areCredentialsComplete = (appCredentials === null || appCredentials === void 0 ? void 0 : (_appCredentials$crede2 = appCredentials.credentials) === null || _appCredentials$crede2 === void 0 ? void 0 : _appCredentials$crede2.provisioningProfile) && (distCredentials === null || distCredentials === void 0 ? void 0 : distCredentials.certP12) && (distCredentials === null || distCredentials === void 0 ? void 0 : distCredentials.certPassword);

  if (!areCredentialsComplete) {
    const confirm = await (0, _prompts().confirmAsync)({
      message: 'Credentials on Expo servers might be invalid or incomplete. Are you sure you want to continue?'
    });

    if (!confirm) {
      _log().default.warn('Aborting...');

      return;
    }
  }

  _log().default.log(`Writing Provisioning Profile to ${pprofilePath}`);

  await updateFileAsync(ctx.projectDir, pprofilePath, appCredentials === null || appCredentials === void 0 ? void 0 : (_appCredentials$crede3 = appCredentials.credentials) === null || _appCredentials$crede3 === void 0 ? void 0 : _appCredentials$crede3.provisioningProfile);
  const shouldWarnPProfile = await isFileUntrackedAsync(pprofilePath);

  _log().default.log(`Writing Distribution Certificate to ${distCertPath}`);

  await updateFileAsync(ctx.projectDir, distCertPath, distCredentials === null || distCredentials === void 0 ? void 0 : distCredentials.certP12);
  const shouldWarnDistCert = await isFileUntrackedAsync(distCertPath);
  rawCredentialsJsonObject.ios = { ...(appCredentials !== null && appCredentials !== void 0 && (_appCredentials$crede4 = appCredentials.credentials) !== null && _appCredentials$crede4 !== void 0 && _appCredentials$crede4.provisioningProfile ? {
      provisioningProfilePath: pprofilePath
    } : {}),
    ...(distCredentials !== null && distCredentials !== void 0 && distCredentials.certP12 && distCredentials !== null && distCredentials !== void 0 && distCredentials.certPassword ? {
      distributionCertificate: {
        path: distCertPath,
        password: distCredentials === null || distCredentials === void 0 ? void 0 : distCredentials.certPassword
      }
    } : {})
  };
  await _fsExtra().default.writeJson(credentialsJsonFilePath, rawCredentialsJsonObject, {
    spaces: 2
  });
  const shouldWarnCredentialsJson = await isFileUntrackedAsync('credentials.json');
  const newFilePaths = [];

  if (shouldWarnPProfile) {
    newFilePaths.push(pprofilePath);
  }

  if (shouldWarnDistCert) {
    newFilePaths.push(distCertPath);
  }

  if (shouldWarnCredentialsJson) {
    newFilePaths.push('credentials.json');
  }

  displayUntrackedFilesWarning(newFilePaths);
}

async function updateFileAsync(projectDir, filePath, base64Data) {
  const absolutePath = _path().default.isAbsolute(filePath) ? filePath : _path().default.join(projectDir, filePath);

  if (await _fsExtra().default.pathExists(absolutePath)) {
    await _fsExtra().default.remove(absolutePath);
  }

  if (base64Data) {
    await _fsExtra().default.mkdirp(_path().default.dirname(filePath));
    await _fsExtra().default.writeFile(filePath, Buffer.from(base64Data, 'base64'));
  }
}

async function isFileUntrackedAsync(path) {
  const withUntrackedFiles = await (0, _git().gitStatusAsync)({
    showUntracked: true
  });
  const trackedFiles = await (0, _git().gitStatusAsync)({
    showUntracked: false
  });
  const pathWithoutLeadingDot = path.replace(/^\.\//, ''); // remove leading './' from path

  return withUntrackedFiles.includes(pathWithoutLeadingDot) && !trackedFiles.includes(pathWithoutLeadingDot);
}

function displayUntrackedFilesWarning(newFilePaths) {
  if (newFilePaths.length === 1) {
    _log().default.warn(`File ${newFilePaths[0]} is currently untracked, remember to add it to .gitignore or to encrypt it. (e.g. with git-crypt)`);
  } else if (newFilePaths.length > 1) {
    _log().default.warn(`Files ${newFilePaths.join(', ')} are currently untracked, remember to add them to .gitignore or to encrypt them. (e.g. with git-crypt)`);
  }
}
//# sourceMappingURL=update.js.map