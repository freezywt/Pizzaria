"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DEVELOPER_TOOL = void 0;
var _config = require("@expo/config");
var _url = require("url");
var Log = _interopRequireWildcard(require("../../../log"));
var _url1 = require("../../../utils/url");
var ProjectDevices = _interopRequireWildcard(require("../../project/devices"));
var _expoMiddleware = require("./ExpoMiddleware");
var _resolveAssets = require("./resolveAssets");
var _resolveEntryPoint = require("./resolveEntryPoint");
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
const DEVELOPER_TOOL = "expo-cli";
exports.DEVELOPER_TOOL = DEVELOPER_TOOL;
class ManifestMiddleware extends _expoMiddleware.ExpoMiddleware {
    constructor(projectRoot, options){
        super(projectRoot, /**
       * Only support `/`, `/manifest`, `/index.exp` for the manifest middleware.
       */ [
            "/",
            "/manifest",
            "/index.exp"
        ]);
        this.projectRoot = projectRoot;
        this.options = options;
    }
    /** Exposed for testing. */ async _resolveProjectSettingsAsync({ platform , hostname  }) {
        // Read the config
        const projectConfig = (0, _config).getConfig(this.projectRoot);
        // Read from headers
        const mainModuleName = this.resolveMainModuleName(projectConfig, platform);
        // Create the manifest and set fields within it
        const expoGoConfig = this.getExpoGoConfig({
            mainModuleName,
            hostname
        });
        const hostUri = this.options.constructUrl({
            scheme: "",
            hostname
        });
        const bundleUrl = this._getBundleUrl({
            platform,
            mainModuleName,
            hostname
        });
        // Resolve all assets and set them on the manifest as URLs
        await this.mutateManifestWithAssetsAsync(projectConfig.exp, bundleUrl);
        return {
            expoGoConfig,
            hostUri,
            bundleUrl,
            exp: projectConfig.exp
        };
    }
    /** Get the main entry module ID (file) relative to the project root. */ resolveMainModuleName(projectConfig, platform) {
        let entryPoint = (0, _resolveEntryPoint).resolveEntryPoint(this.projectRoot, platform, projectConfig);
        // NOTE(Bacon): Webpack is currently hardcoded to index.bundle on native
        // in the future (TODO) we should move this logic into a Webpack plugin and use
        // a generated file name like we do on web.
        // const server = getDefaultDevServer();
        // // TODO: Move this into BundlerDevServer and read this info from self.
        // const isNativeWebpack = server instanceof WebpackBundlerDevServer && server.isTargetingNative();
        if (this.options.isNativeWebpack) {
            entryPoint = "index.js";
        }
        return (0, _url1).stripExtension(entryPoint, "js");
    }
    /** Store device IDs that were sent in the request headers. */ async saveDevicesAsync(req) {
        var ref;
        const deviceIds = (ref = req.headers) == null ? void 0 : ref["expo-dev-client-id"];
        if (deviceIds) {
            await ProjectDevices.saveDevicesAsync(this.projectRoot, deviceIds).catch((e)=>Log.exception(e)
            );
        }
    }
    /** Create the bundle URL (points to the single JS entry file). Exposed for testing. */ _getBundleUrl({ platform , mainModuleName , hostname  }) {
        const queryParams = new URLSearchParams({
            platform: encodeURIComponent(platform),
            dev: String(this.options.mode !== "production"),
            // TODO: Is this still needed?
            hot: String(false)
        });
        if (this.options.minify) {
            queryParams.append("minify", String(this.options.minify));
        }
        const path = `/${encodeURI(mainModuleName)}.bundle?${queryParams.toString()}`;
        return this.options.constructUrl({
            scheme: "http",
            // hostType: this.options.location.hostType,
            hostname
        }) + path;
    }
    getExpoGoConfig({ mainModuleName , hostname  }) {
        return {
            // localhost:19000
            debuggerHost: this.options.constructUrl({
                scheme: "",
                hostname
            }),
            // http://localhost:19000/logs -- used to send logs to the CLI for displaying in the terminal.
            // This is deprecated in favor of the WebSocket connection setup in Metro.
            logUrl: this.options.constructUrl({
                scheme: "http",
                hostname
            }) + "/logs",
            // Required for Expo Go to function.
            developer: {
                tool: DEVELOPER_TOOL,
                projectRoot: this.projectRoot
            },
            packagerOpts: {
                // Required for dev client.
                dev: this.options.mode !== "production"
            },
            // Indicates the name of the main bundle.
            mainModuleName,
            // Add this string to make Flipper register React Native / Metro as "running".
            // Can be tested by running:
            // `METRO_SERVER_PORT=19000 open -a flipper.app`
            // Where 19000 is the port where the Expo project is being hosted.
            __flipperHack: "React Native packager is running"
        };
    }
    /** Resolve all assets and set them on the manifest as URLs */ async mutateManifestWithAssetsAsync(manifest, bundleUrl) {
        await (0, _resolveAssets).resolveManifestAssets(this.projectRoot, {
            manifest,
            resolver: async (path)=>{
                if (this.options.isNativeWebpack) {
                    // When using our custom dev server, just do assets normally
                    // without the `assets/` subpath redirect.
                    return (0, _url).resolve(bundleUrl.match(/^https?:\/\/.*?\//)[0], path);
                }
                return bundleUrl.match(/^https?:\/\/.*?\//)[0] + "assets/" + path;
            }
        });
        // The server normally inserts this but if we're offline we'll do it here
        await (0, _resolveAssets).resolveGoogleServicesFile(this.projectRoot, manifest);
    }
    async handleRequestAsync(req, res, next) {
        // Save device IDs for dev client.
        await this.saveDevicesAsync(req);
        // Read from headers
        const options = this.getParsedHeaders(req);
        const { body , version , headers  } = await this._getManifestResponseAsync(options);
        for (const [headerName, headerValue] of headers){
            res.setHeader(headerName, headerValue);
        }
        res.end(body);
        // Log analytics
        this.trackManifest(version != null ? version : null);
    }
}
exports.ManifestMiddleware = ManifestMiddleware;

//# sourceMappingURL=ManifestMiddleware.js.map