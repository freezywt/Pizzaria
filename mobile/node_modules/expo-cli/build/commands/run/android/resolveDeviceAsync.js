"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveDeviceAsync = resolveDeviceAsync;

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

function _CommandError() {
  const data = _interopRequireDefault(require("../../../CommandError"));

  _CommandError = function () {
    return data;
  };

  return data;
}

function _log() {
  const data = _interopRequireDefault(require("../../../log"));

  _log = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function ensureEmulatorOpenAsync(device) {
  if (!device) {
    const devices = await _xdl().Android.getAllAvailableDevicesAsync();
    device = devices[0];
  }

  const bootedDevice = await _xdl().Android.attemptToStartEmulatorOrAssertAsync(device);

  if (!bootedDevice) {
    // TODO: Improve
    throw new (_CommandError().default)('Unauthorized');
  }

  return bootedDevice;
}

async function resolveDeviceAsync(device) {
  if (!device) {
    return await ensureEmulatorOpenAsync();
  }

  const devices = await _xdl().Android.getAllAvailableDevicesAsync().catch(() => []);

  if (device === true) {
    // --device with no props after
    const device = await _xdl().Android.promptForDeviceAsync(devices);

    if (!device) {
      throw new (_CommandError().default)('Select a device to use');
    }

    _log().default.log(_chalk().default.dim`\u203A Using --device ${device.name}`);

    return device;
  }

  const searchValue = device.toLowerCase();
  const resolved = devices.find(device => {
    return device.name.toLowerCase() === searchValue;
  });

  if (!resolved) {
    throw new (_CommandError().default)(`No device name matching "${device}"`);
  }

  return await ensureEmulatorOpenAsync(resolved);
}
//# sourceMappingURL=resolveDeviceAsync.js.map