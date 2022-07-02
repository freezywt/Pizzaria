"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _devServer = require("@expo/dev-server");
var _assert = _interopRequireDefault(require("assert"));
var _chalk = _interopRequireDefault(require("chalk"));
var Log = _interopRequireWildcard(require("../../log"));
var _link = require("../../utils/link");
var _prompts = require("../../utils/prompts");
var _commandsTable = require("./commandsTable");
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
class DevServerManagerActions {
    constructor(devServerManager){
        this.devServerManager = devServerManager;
    }
    printDevServerInfo(options) {
        var ref;
        // If native dev server is running, print its URL.
        if (this.devServerManager.getNativeDevServerPort()) {
            try {
                const url = this.devServerManager.getDefaultDevServer().getNativeRuntimeUrl();
                (0, _commandsTable).printQRCode(url);
                Log.log((0, _commandsTable).printItem(_chalk.default`Metro waiting on {underline ${url}}`));
                // TODO: if development build, change this message!
                Log.log((0, _commandsTable).printItem("Scan the QR code above with Expo Go (Android) or the Camera app (iOS)"));
            } catch (error) {
                // @ts-ignore: If there is no development build scheme, then skip the QR code.
                if (error.code !== "NO_DEV_CLIENT_SCHEME") {
                    throw error;
                } else {
                    const serverUrl = this.devServerManager.getDefaultDevServer().getDevServerUrl();
                    Log.log((0, _commandsTable).printItem(_chalk.default`Metro waiting on {underline ${serverUrl}}`));
                    Log.log((0, _commandsTable).printItem(`Linking is disabled because the client scheme cannot be resolved.`));
                }
            }
        }
        const webUrl = (ref = this.devServerManager.getWebDevServer()) == null ? void 0 : ref.getDevServerUrl({
            hostType: "localhost"
        });
        if (webUrl) {
            Log.log();
            Log.log((0, _commandsTable).printItem(_chalk.default`Webpack waiting on {underline ${webUrl}}`));
            Log.log(_chalk.default.gray((0, _commandsTable).printItem("Expo Webpack (web) is in beta, and subject to breaking changes!")));
        }
        (0, _commandsTable).printUsage(options, {
            verbose: false
        });
        (0, _commandsTable).printHelp();
        Log.log();
    }
    async openJsInspectorAsync() {
        Log.log("Opening JavaScript inspector in the browser...");
        const port = this.devServerManager.getNativeDevServerPort();
        (0, _assert).default(port, "Metro dev server is not running");
        const metroServerOrigin = `http://localhost:${port}`;
        const apps = await (0, _devServer).queryAllInspectorAppsAsync(metroServerOrigin);
        if (!apps.length) {
            Log.warn(`No compatible apps connected. This feature is only available for apps using the Hermes runtime. ${(0, _link).learnMore("https://docs.expo.dev/guides/using-hermes/")}`);
            return;
        }
        for (const app of apps){
            (0, _devServer).openJsInspector(app);
        }
    }
    reloadApp() {
        Log.log(`${_commandsTable.BLT} Reloading apps`);
        // Send reload requests over the dev servers
        this.devServerManager.broadcastMessage("reload");
    }
    async openMoreToolsAsync() {
        try {
            // Options match: Chrome > View > Developer
            const value = await (0, _prompts).selectAsync(_chalk.default`Dev tools {dim (native only)}`, [
                {
                    title: "Inspect elements",
                    value: "toggleElementInspector"
                },
                {
                    title: "Toggle performance monitor",
                    value: "togglePerformanceMonitor"
                },
                {
                    title: "Toggle developer menu",
                    value: "toggleDevMenu"
                },
                {
                    title: "Reload app",
                    value: "reload"
                }, 
            ]);
            this.devServerManager.broadcastMessage("sendDevCommand", {
                name: value
            });
        } catch (error) {
            Log.debug(error);
        // do nothing
        } finally{
            (0, _commandsTable).printHelp();
        }
    }
    toggleDevMenu() {
        Log.log(`${_commandsTable.BLT} Toggling dev menu`);
        this.devServerManager.broadcastMessage("devMenu");
    }
}
exports.DevServerManagerActions = DevServerManagerActions;

//# sourceMappingURL=interactiveActions.js.map