"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createMetadataJson = createMetadataJson;
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function createMetadataJson({ bundles , fileNames  }) {
    // Build metadata.json
    return {
        version: 0,
        bundler: "metro",
        fileMetadata: Object.entries(bundles).reduce((metadata, [platform, bundle])=>({
                ...metadata,
                [platform]: {
                    // Get the filename for each platform's bundle.
                    bundle: _path.default.join("bundles", fileNames[platform]),
                    // Collect all of the assets and convert them to the serial format.
                    assets: bundle.assets.map((asset)=>// Each asset has multiple hashes which we convert and then flatten.
                        asset.fileHashes.map((hash)=>({
                                path: _path.default.join("assets", hash),
                                ext: asset.type
                            })
                        )
                    ).flat()
                }
            })
        , {})
    };
}

//# sourceMappingURL=createMetadataJson.js.map