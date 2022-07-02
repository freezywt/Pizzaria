"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.resolveOptionsAsync = resolveOptionsAsync;
var _resolveOptions = require("../prebuild/resolveOptions");
async function resolveOptionsAsync(args) {
    var ref;
    const platforms = (0, _resolveOptions).resolvePlatformOption((ref = args["--platform"]) != null ? ref : "all", {
        loose: true
    });
    var ref1;
    return {
        outputDir: (ref1 = args["--output-dir"]) != null ? ref1 : "dist",
        platforms,
        clear: !!args["--clear"],
        dev: !!args["--dev"],
        maxWorkers: args["--max-workers"],
        dumpAssetmap: !!args["--dump-assetmap"],
        dumpSourcemap: !!args["--dump-sourcemap"]
    };
}

//# sourceMappingURL=resolveOptions.js.map