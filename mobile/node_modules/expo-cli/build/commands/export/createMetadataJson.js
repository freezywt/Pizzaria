"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createMetadataJson = createMetadataJson;

function _assert() {
  const data = _interopRequireDefault(require("assert"));

  _assert = function () {
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createMetadataJson({
  bundles,
  fileNames
}) {
  // Build metadata.json
  const fileMetadata = {};
  Object.keys(bundles).forEach(platform => {
    const filename = fileNames[platform];
    (0, _assert().default)(filename, `Expected filename for ${platform}`);
    fileMetadata[platform] = {
      bundle: _path().default.join('bundles', filename),
      assets: []
    };
    bundles[platform].assets.forEach(asset => {
      fileMetadata[platform].assets = [...fileMetadata[platform].assets, ...asset.fileHashes.map(hash => {
        return {
          path: _path().default.join('assets', hash),
          ext: asset.type
        };
      })];
    });
  });
  const metadata = {
    version: 0,
    bundler: 'metro',
    fileMetadata: fileMetadata
  };
  return metadata;
}
//# sourceMappingURL=createMetadataJson.js.map