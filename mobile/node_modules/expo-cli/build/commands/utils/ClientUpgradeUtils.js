"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.askClientToInstall = askClientToInstall;
exports.getAvailableClients = getAvailableClients;
exports.getClient = getClient;
exports.getExpoSdkConfig = getExpoSdkConfig;

function _config() {
  const data = require("@expo/config");

  _config = function () {
    return data;
  };

  return data;
}

function _chalk() {
  const data = _interopRequireDefault(require("chalk"));

  _chalk = function () {
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

function _prompts() {
  const data = _interopRequireDefault(require("../../utils/prompts"));

  _prompts = function () {
    return data;
  };

  return data;
}

function _ProjectUtils() {
  const data = require("./ProjectUtils");

  _ProjectUtils = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function getExpoSdkConfig(path) {
  try {
    const {
      projectRoot
    } = await (0, _ProjectUtils().findProjectRootAsync)(path);
    const {
      exp
    } = (0, _config().getConfig)(projectRoot, {
      skipSDKVersionRequirement: true
    });
    return exp;
  } catch (error) {
    if (error.code !== 'NO_PROJECT') {
      throw error;
    }
  }

  return undefined;
}

function getClient(platform, sdk) {
  if (!sdk) {
    return null;
  }

  if (platform === 'android' && sdk.androidClientUrl) {
    return {
      url: sdk.androidClientUrl,
      version: sdk.androidClientVersion
    };
  }

  if (platform === 'ios' && sdk.iosClientUrl) {
    return {
      url: sdk.iosClientUrl,
      version: sdk.iosClientVersion
    };
  }

  return null;
}

function getAvailableClients(options) {
  return Object.keys(options.sdkVersions).reverse().map(version => {
    const client = getClient(options.platform, options.sdkVersions[version]);
    return {
      sdkVersionString: version,
      sdkVersion: options.sdkVersions[version],
      clientUrl: client === null || client === void 0 ? void 0 : client.url,
      clientVersion: client === null || client === void 0 ? void 0 : client.version
    };
  }).filter(client => {
    const hasUrl = !!client.clientUrl;
    const isDeprecated = !!client.sdkVersion.isDeprecated;
    const IsCompatible = options.project ? _xdl().Versions.lteSdkVersion(options.project, client.sdkVersionString) : true;
    return !isDeprecated && IsCompatible && hasUrl;
  });
}

async function askClientToInstall(options) {
  const answer = await (0, _prompts().default)({
    type: 'select',
    name: 'targetClient',
    message: 'Choose an SDK version to install the client for:',
    optionsPerPage: 20,
    choices: options.clients.map(client => {
      const clientVersion = `- client ${client.clientVersion || 'version unknown'}`;
      const clientLabels = [client.sdkVersionString === options.latestSdkVersion && 'latest', client.sdkVersionString === options.currentSdkVersion && 'recommended'].filter(Boolean);
      const clientMessage = clientLabels.length ? `${clientVersion} (${clientLabels.join(', ')})` : clientVersion;
      return {
        value: client,
        title: `${_chalk().default.bold(client.sdkVersionString)} ${_chalk().default.gray(clientMessage)}`
      };
    })
  });
  return answer.targetClient;
}
//# sourceMappingURL=ClientUpgradeUtils.js.map