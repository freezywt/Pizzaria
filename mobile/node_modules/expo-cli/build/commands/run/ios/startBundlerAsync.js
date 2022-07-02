"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setGlobalDevClientSettingsAsync = setGlobalDevClientSettingsAsync;
exports.startBundlerAsync = startBundlerAsync;

function _xdl() {
  const data = require("xdl");

  _xdl = function () {
    return data;
  };

  return data;
}

function TerminalUI() {
  const data = _interopRequireWildcard(require("../../start/TerminalUI"));

  TerminalUI = function () {
    return data;
  };

  return data;
}

function _installExitHooks() {
  const data = require("../../start/installExitHooks");

  _installExitHooks = function () {
    return data;
  };

  return data;
}

function _schemes() {
  const data = require("../utils/schemes");

  _schemes = function () {
    return data;
  };

  return data;
}

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

async function setGlobalDevClientSettingsAsync(projectRoot) {
  const devClient = true;
  const scheme = await (0, _schemes().getOptionalDevClientSchemeAsync)(projectRoot).catch(() => null);
  await _xdl().ProjectSettings.setAsync(projectRoot, {
    devClient,
    scheme
  });
}

async function startBundlerAsync(projectRoot, {
  metroPort,
  platforms
}) {
  // Add clean up hooks
  (0, _installExitHooks().installExitHooks)(projectRoot); // This basically means don't use the Client app.

  const devClient = true;
  await _xdl().Project.startAsync(projectRoot, {
    devClient,
    metroPort
  });
  await TerminalUI().startAsync(projectRoot, {
    devClient,
    // Enable controls
    isWebSocketsEnabled: true,
    isRemoteReloadingEnabled: true,
    platforms
  });
}
//# sourceMappingURL=startBundlerAsync.js.map