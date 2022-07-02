"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.bundleAsync = bundleAsync;
var _config = require("@expo/config");
var _hermesBundler = require("@expo/dev-server/build/HermesBundler");
var _importMetroFromProject = require("@expo/dev-server/build/metro/importMetroFromProject");
var _chalk = _interopRequireDefault(require("chalk"));
var _metroCore = require("metro-core");
var _metroTerminalReporter = require("../start/server/metro/MetroTerminalReporter");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function getExpoMetroConfig(projectRoot, { logger  }) {
    try {
        return (0, _importMetroFromProject).importExpoMetroConfigFromProject(projectRoot);
    } catch  {
    // If expo isn't installed, use the unversioned config and warn about installing expo.
    }
    const unversionedVersion = require("@expo/metro-config/package.json").version;
    logger.info({
        tag: "expo"
    }, _chalk.default.gray(`\u203A Unversioned ${_chalk.default.bold`@expo/metro-config@${unversionedVersion}`} is being used. Bundling apps may not work as expected, and is subject to breaking changes. Install ${_chalk.default.bold`expo`} or set the app.json sdkVersion to use a stable version of @expo/metro-config.`));
    return require("@expo/metro-config");
}
let nextBuildID = 0;
async function bundleAsync(projectRoot, expoConfig, options, bundles) {
    const metro = (0, _importMetroFromProject).importMetroFromProject(projectRoot);
    const Server = (0, _importMetroFromProject).importMetroServerFromProject(projectRoot);
    let reportEvent;
    const terminal = new _metroCore.Terminal(process.stdout);
    const terminalReporter = new _metroTerminalReporter.MetroTerminalReporter(projectRoot, terminal);
    const reporter = {
        update (event) {
            terminalReporter.update(event);
            if (reportEvent) {
                reportEvent(event);
            }
        }
    };
    const ExpoMetroConfig = getExpoMetroConfig(projectRoot, options);
    const config = await ExpoMetroConfig.loadAsync(projectRoot, {
        reporter,
        ...options
    });
    const buildID = `bundle_${nextBuildID++}`;
    // @ts-expect-error
    const metroServer = await metro.runMetro(config, {
        watch: false
    });
    const buildAsync = async (bundle)=>{
        var _dev, _minify;
        const bundleOptions = {
            ...Server.DEFAULT_BUNDLE_OPTIONS,
            bundleType: "bundle",
            platform: bundle.platform,
            entryFile: bundle.entryPoint,
            dev: (_dev = bundle.dev) != null ? _dev : false,
            minify: (_minify = bundle.minify) != null ? _minify : !bundle.dev,
            inlineSourceMap: false,
            sourceMapUrl: bundle.sourceMapUrl,
            createModuleIdFactory: config.serializer.createModuleIdFactory,
            onProgress: (transformedFileCount, totalFileCount)=>{
                if (!options.quiet) {
                    reporter.update({
                        buildID,
                        type: "bundle_transform_progressed",
                        transformedFileCount,
                        totalFileCount
                    });
                }
            }
        };
        var _dev1, _minify1;
        reporter.update({
            buildID,
            type: "bundle_build_started",
            bundleDetails: {
                bundleType: bundleOptions.bundleType,
                platform: bundle.platform,
                entryFile: bundle.entryPoint,
                dev: (_dev1 = bundle.dev) != null ? _dev1 : false,
                minify: (_minify1 = bundle.minify) != null ? _minify1 : false
            }
        });
        const { code , map  } = await metroServer.build(bundleOptions);
        const assets = await metroServer.getAssets(bundleOptions);
        reporter.update({
            buildID,
            type: "bundle_build_done"
        });
        return {
            code,
            map,
            assets
        };
    };
    const maybeAddHermesBundleAsync = async (bundle, bundleOutput)=>{
        const { platform  } = bundle;
        const isHermesManaged = (0, _hermesBundler).isEnableHermesManaged(expoConfig, platform);
        const paths = (0, _config).getConfigFilePaths(projectRoot);
        var _dynamicConfigPath, ref;
        const configFilePath = (ref = (_dynamicConfigPath = paths.dynamicConfigPath) != null ? _dynamicConfigPath : paths.staticConfigPath) != null ? ref : "app.json";
        await (0, _hermesBundler).maybeThrowFromInconsistentEngineAsync(projectRoot, configFilePath, platform, isHermesManaged);
        if (isHermesManaged) {
            const platformTag = _chalk.default.bold({
                ios: "iOS",
                android: "Android",
                web: "Web"
            }[platform] || platform);
            options.logger.info({
                tag: "expo"
            }, `💿 ${platformTag} Building Hermes bytecode for the bundle`);
            const hermesBundleOutput = await (0, _hermesBundler).buildHermesBundleAsync(projectRoot, bundleOutput.code, bundleOutput.map, bundle.minify);
            bundleOutput.hermesBytecodeBundle = hermesBundleOutput.hbc;
            bundleOutput.hermesSourcemap = hermesBundleOutput.sourcemap;
        }
        return bundleOutput;
    };
    try {
        const intermediateOutputs = await Promise.all(bundles.map((bundle)=>buildAsync(bundle)
        ));
        const bundleOutputs = [];
        for(let i = 0; i < bundles.length; ++i){
            // hermesc does not support parallel building even we spawn processes.
            // we should build them sequentially.
            bundleOutputs.push(await maybeAddHermesBundleAsync(bundles[i], intermediateOutputs[i]));
        }
        return bundleOutputs;
    } finally{
        metroServer.end();
    }
}

//# sourceMappingURL=fork-bundleAsync.js.map