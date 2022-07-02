"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBundleIdWarningAsync = getBundleIdWarningAsync;
exports.getPackageNameWarningAsync = getPackageNameWarningAsync;
exports.validateBundleId = validateBundleId;
exports.validatePackage = validatePackage;

function _chalk() {
  const data = _interopRequireDefault(require("chalk"));

  _chalk = function () {
    return data;
  };

  return data;
}

function _nodeFetch() {
  const data = _interopRequireDefault(require("node-fetch"));

  _nodeFetch = function () {
    return data;
  };

  return data;
}

function _TerminalLink() {
  const data = require("./TerminalLink");

  _TerminalLink = function () {
    return data;
  };

  return data;
}

function _url() {
  const data = require("./url");

  _url = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validateBundleId(value) {
  return /^[a-zA-Z0-9-.]+$/.test(value);
}

function validatePackage(value) {
  return /^[a-zA-Z][a-zA-Z0-9_]*(\.[a-zA-Z][a-zA-Z0-9_]*)+$/.test(value);
}

const cachedBundleIdResults = {};
const cachedPackageNameResults = {};
/**
 * A quality of life method that provides a warning when the bundle ID is already in use.
 *
 * @param bundleId
 */

async function getBundleIdWarningAsync(bundleId) {
  // Prevent fetching for the same ID multiple times.
  if (cachedBundleIdResults[bundleId]) {
    return cachedBundleIdResults[bundleId];
  }

  if (!(await (0, _url().isUrlAvailableAsync)('itunes.apple.com'))) {
    // If no network, simply skip the warnings since they'll just lead to more confusion.
    return null;
  }

  const url = `http://itunes.apple.com/lookup?bundleId=${bundleId}`;

  try {
    const response = await (0, _nodeFetch().default)(url);
    const json = await response.json();

    if (json.resultCount > 0) {
      const firstApp = json.results[0];
      const message = formatInUseWarning(firstApp.trackName, firstApp.sellerName, bundleId);
      cachedBundleIdResults[bundleId] = message;
      return message;
    }
  } catch {// Error fetching itunes data.
  }

  return null;
}

async function getPackageNameWarningAsync(packageName) {
  // Prevent fetching for the same ID multiple times.
  if (cachedPackageNameResults[packageName]) {
    return cachedPackageNameResults[packageName];
  }

  if (!(await (0, _url().isUrlAvailableAsync)('play.google.com'))) {
    // If no network, simply skip the warnings since they'll just lead to more confusion.
    return null;
  }

  const url = `https://play.google.com/store/apps/details?id=${packageName}`;

  try {
    const response = await (0, _nodeFetch().default)(url); // If the page exists, then warn the user.

    if (response.status === 200) {
      // There is no JSON API for the Play Store so we can't concisely
      // locate the app name and developer to match the iOS warning.
      const message = `⚠️  The package ${_chalk().default.bold(packageName)} is already in use. ${_chalk().default.dim((0, _TerminalLink().learnMore)(url))}`;
      cachedPackageNameResults[packageName] = message;
      return message;
    }
  } catch {// Error fetching play store data or the page doesn't exist.
  }

  return null;
}

function formatInUseWarning(appName, author, id) {
  return `⚠️  The app ${_chalk().default.bold(appName)} by ${_chalk().default.italic(author)} is already using ${_chalk().default.bold(id)}`;
}
//# sourceMappingURL=validateApplicationId.js.map