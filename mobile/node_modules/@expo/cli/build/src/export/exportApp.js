"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.exportAppAsync = exportAppAsync;
var _path = _interopRequireDefault(require("path"));
var Log = _interopRequireWildcard(require("../log"));
var _dir = require("../utils/dir");
var _createBundles = require("./createBundles");
var _exportAssets = require("./exportAssets");
var _getPublicExpoManifest = require("./getPublicExpoManifest");
var _printBundleSizes = require("./printBundleSizes");
var _writeContents = require("./writeContents");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    } else {
        var newObj = {};
        if (obj != null) {
            for(var key in obj){
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};
                    if (desc.get || desc.set) {
                        Object.defineProperty(newObj, key, desc);
                    } else {
                        newObj[key] = obj[key];
                    }
                }
            }
        }
        newObj.default = obj;
        return newObj;
    }
}
async function exportAppAsync(projectRoot, { platforms , outputDir , clear , dev , dumpAssetmap , dumpSourcemap  }) {
    const exp = await (0, _getPublicExpoManifest).getPublicExpoManifestAsync(projectRoot);
    const outputPath = _path.default.resolve(projectRoot, outputDir);
    const assetsPath = _path.default.join(outputPath, "assets");
    const bundlesPath = _path.default.join(outputPath, "bundles");
    await Promise.all([
        assetsPath,
        bundlesPath
    ].map(_dir.ensureDirectoryAsync));
    // Run metro bundler and create the JS bundles/source maps.
    const bundles = await (0, _createBundles).createBundlesAsync(projectRoot, {
        resetCache: !!clear
    }, {
        platforms,
        dev,
        useDevServer: true
    });
    // Log bundle size info to the user
    (0, _printBundleSizes).printBundleSizes(bundles);
    // Write the JS bundles to disk, and get the bundle file names (this could change with async chunk loading support).
    const { hashes , fileNames  } = await (0, _writeContents).writeBundlesAsync({
        bundles,
        outputDir: bundlesPath
    });
    Log.log("Finished saving JS Bundles");
    const { assets  } = await (0, _exportAssets).exportAssetsAsync(projectRoot, {
        exp,
        outputDir: outputPath,
        bundles
    });
    if (dumpAssetmap) {
        Log.log("Dumping asset map");
        await (0, _writeContents).writeAssetMapAsync({
            outputDir: outputPath,
            assets
        });
    }
    // build source maps
    if (dumpSourcemap) {
        Log.log("Dumping source maps");
        await (0, _writeContents).writeSourceMapsAsync({
            bundles,
            hashes,
            outputDir: bundlesPath,
            fileNames
        });
        Log.log("Preparing additional debugging files");
        // If we output source maps, then add a debug HTML file which the user can open in
        // the web browser to inspect the output like web.
        await (0, _writeContents).writeDebugHtmlAsync({
            outputDir: outputPath,
            fileNames
        });
    }
    // Generate a `metadata.json` and the export is complete.
    await (0, _writeContents).writeMetadataJsonAsync({
        outputDir,
        bundles,
        fileNames
    });
}

//# sourceMappingURL=exportApp.js.map