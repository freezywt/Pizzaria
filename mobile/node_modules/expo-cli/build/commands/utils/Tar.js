"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.downloadAndDecompressAsync = downloadAndDecompressAsync;

function _got() {
  const data = _interopRequireDefault(require("got"));

  _got = function () {
    return data;
  };

  return data;
}

function _stream() {
  const data = _interopRequireDefault(require("stream"));

  _stream = function () {
    return data;
  };

  return data;
}

function _tar() {
  const data = _interopRequireDefault(require("tar"));

  _tar = function () {
    return data;
  };

  return data;
}

function _util() {
  const data = require("util");

  _util = function () {
    return data;
  };

  return data;
}

function _progress() {
  const data = require("./progress");

  _progress = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const pipeline = (0, _util().promisify)(_stream().default.pipeline);
/**
 * Download a tar.gz file and extract it to a folder.
 *
 * @param url remote URL to download.
 * @param destination destination folder to extract the tar to.
 */

async function downloadAndDecompressAsync(url, destination) {
  const downloadStream = _got().default.stream(url).on('downloadProgress', (0, _progress().createProgressTracker)());

  await pipeline(downloadStream, _tar().default.extract({
    cwd: destination
  }));
  return destination;
}
//# sourceMappingURL=Tar.js.map