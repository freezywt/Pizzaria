"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actionAsync = actionAsync;

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

function _resolveDeviceAsync() {
  const data = require("../run/android/resolveDeviceAsync");

  _resolveDeviceAsync = function () {
    return data;
  };

  return data;
}

function ClientUpgradeUtils() {
  const data = _interopRequireWildcard(require("../utils/ClientUpgradeUtils"));

  ClientUpgradeUtils = function () {
    return data;
  };

  return data;
}

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function actionAsync(options) {
  const device = await (0, _resolveDeviceAsync().resolveDeviceAsync)(options.device);
  const forceLatest = !!options.latest;
  const currentSdkConfig = await ClientUpgradeUtils().getExpoSdkConfig(process.cwd());
  const currentSdkVersion = currentSdkConfig ? currentSdkConfig.sdkVersion : undefined;
  const sdkVersions = await _xdl().Versions.sdkVersionsAsync();
  const latestSdk = await _xdl().Versions.newestReleasedSdkVersionAsync();
  const currentSdk = sdkVersions[currentSdkVersion];
  const recommendedClient = ClientUpgradeUtils().getClient('android', currentSdk);
  const latestClient = ClientUpgradeUtils().getClient('android', latestSdk.data);

  if (forceLatest) {
    if (!(latestClient !== null && latestClient !== void 0 && latestClient.url)) {
      _log().default.error(`Unable to find latest client version. Check your internet connection or run this command again without the ${_chalk().default.bold('--latest')} flag.`);

      return;
    }

    if (await _xdl().Android.upgradeExpoAsync({
      device,
      url: latestClient.url,
      version: latestClient.version
    })) {
      _log().default.log('Done!');
    } else {
      _log().default.error(`Unable to install Expo Go ${latestClient.version} for Android.`);
    }

    return;
  }

  if (!currentSdkVersion) {
    _log().default.log('Could not find your Expo project. If you run this from a project, we can help pick the right Expo Go version!');
  }

  if (currentSdk && !recommendedClient) {
    _log().default.log(`You are currently using SDK ${currentSdkVersion}. Unfortunately, we couldn't detect the proper client version for this SDK.`);
  }

  if (currentSdk && recommendedClient) {
    const recommendedClientVersion = recommendedClient.version || 'version unknown';
    const answer = await (0, _prompts().confirmAsync)({
      message: `You are currently using SDK ${currentSdkVersion}. Would you like to install client ${recommendedClientVersion} released for this SDK?`
    });

    if (answer) {
      await _xdl().Android.upgradeExpoAsync({
        device,
        url: recommendedClient.url,
        version: recommendedClient.version
      });

      _log().default.log('Done!');

      return;
    }
  } else {
    const answer = await (0, _prompts().confirmAsync)({
      message: latestClient !== null && latestClient !== void 0 && latestClient.version ? (0, _chalk().default)`Do you want to install the latest client? {dim (${latestClient.version})}` : 'Do you want to install the latest client?'
    });

    if (answer) {
      await _xdl().Android.upgradeExpoAsync({
        device,
        url: latestClient === null || latestClient === void 0 ? void 0 : latestClient.url,
        version: latestClient === null || latestClient === void 0 ? void 0 : latestClient.version
      });

      _log().default.log('Done!');

      return;
    }
  }

  const availableClients = ClientUpgradeUtils().getAvailableClients({
    sdkVersions,
    project: currentSdkConfig,
    platform: 'android'
  });

  if (availableClients.length === 0) {
    const answer = await (0, _prompts().confirmAsync)({
      message: currentSdk ? `We don't have a compatible client for SDK ${currentSdkVersion}. Do you want to try the latest client?` : "It looks like we don't have a compatible client. Do you want to try the latest client?"
    });

    if (answer) {
      await _xdl().Android.upgradeExpoAsync({
        device,
        url: latestClient === null || latestClient === void 0 ? void 0 : latestClient.url,
        version: latestClient === null || latestClient === void 0 ? void 0 : latestClient.version
      });

      _log().default.log('Done!');
    } else {
      _log().default.log('No client to install');
    }

    return;
  }

  const targetClient = await ClientUpgradeUtils().askClientToInstall({
    currentSdkVersion,
    latestSdkVersion: latestSdk.version,
    clients: availableClients
  });

  if (await _xdl().Android.upgradeExpoAsync({
    device,
    url: targetClient.clientUrl
  })) {
    _log().default.log('Done!');
  }
}
//# sourceMappingURL=clientInstallAndroidAsync.js.map