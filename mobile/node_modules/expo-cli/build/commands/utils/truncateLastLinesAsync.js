"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.truncateLastLinesAsync = truncateLastLinesAsync;

function _fs() {
  const data = _interopRequireDefault(require("fs"));

  _fs = function () {
    return data;
  };

  return data;
}

function _readLastLines() {
  const data = _interopRequireDefault(require("read-last-lines"));

  _readLastLines = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// truncate the last n lines in a file
async function truncateLastLinesAsync(filePath, n) {
  const [lines, {
    size
  }] = await Promise.all([_readLastLines().default.read(filePath, n), _fs().default.promises.stat(filePath)]);
  const toTruncate = lines.length;
  await _fs().default.promises.truncate(filePath, size - toTruncate);
}
//# sourceMappingURL=truncateLastLinesAsync.js.map