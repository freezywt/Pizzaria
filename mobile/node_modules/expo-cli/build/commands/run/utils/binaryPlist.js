"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseBinaryPlistAsync = parseBinaryPlistAsync;
exports.parsePlistBuffer = parsePlistBuffer;

function _plist() {
  const data = _interopRequireDefault(require("@expo/plist"));

  _plist = function () {
    return data;
  };

  return data;
}

function _bplistParser() {
  const data = _interopRequireDefault(require("bplist-parser"));

  _bplistParser = function () {
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

function _log() {
  const data = _interopRequireDefault(require("../../../log"));

  _log = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @ts-ignore
const CHAR_CHEVRON_OPEN = 60;
const CHAR_B_LOWER = 98; // .mobileprovision
// const CHAR_ZERO = 30;

async function parseBinaryPlistAsync(plistPath) {
  _log().default.debug(`Parse plist: ${plistPath}`);

  return parsePlistBuffer(await _fsExtra().default.readFile(plistPath));
}

function parsePlistBuffer(contents) {
  if (contents[0] === CHAR_CHEVRON_OPEN) {
    const info = _plist().default.parse(contents.toString());

    if (Array.isArray(info)) return info[0];
    return info;
  } else if (contents[0] === CHAR_B_LOWER) {
    const info = _bplistParser().default.parseBuffer(contents);

    if (Array.isArray(info)) return info[0];
    return info;
  } else {
    throw new Error(`Cannot parse plist of type byte (0x${contents[0].toString(16)})`);
  }
}
//# sourceMappingURL=binaryPlist.js.map