"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _config = require("@expo/config");
var _assert = _interopRequireDefault(require("assert"));
var Log = _interopRequireWildcard(require("../../log"));
var _fileNotifier = require("../../utils/FileNotifier");
var _rudderstackClient = require("../../utils/analytics/rudderstackClient");
var AndroidDebugBridge = _interopRequireWildcard(require("../platforms/android/adb"));
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
const devServers = [];
const BUNDLERS = {
    webpack: ()=>require("./webpack/WebpackBundlerDevServer").WebpackBundlerDevServer
    ,
    metro: ()=>require("./metro/MetroBundlerDevServer").MetroBundlerDevServer
};
class DevServerManager {
    constructor(projectRoot, options){
        this.projectRoot = projectRoot;
        this.options = options;
        this.projectPrerequisites = [];
        this.watchBabelConfig();
    }
    watchBabelConfig() {
        const notifier = new _fileNotifier.FileNotifier(this.projectRoot, [
            "./babel.config.js",
            "./babel.config.json",
            "./.babelrc.json",
            "./.babelrc",
            "./.babelrc.js", 
        ]);
        notifier.startObserving();
        return notifier;
    }
    /** Lazily load and assert a project-level prerequisite. */ async ensureProjectPrerequisiteAsync(PrerequisiteClass) {
        let prerequisite1 = this.projectPrerequisites.find((prerequisite)=>prerequisite instanceof PrerequisiteClass
        );
        if (!prerequisite1) {
            prerequisite1 = new PrerequisiteClass(this.projectRoot);
            this.projectPrerequisites.push(prerequisite1);
        }
        await prerequisite1.assertAsync();
    }
    /**
   * Sends a message over web sockets to all connected devices,
   * does nothing when the dev server is not running.
   *
   * @param method name of the command. In RN projects `reload`, and `devMenu` are available. In Expo Go, `sendDevCommand` is available.
   * @param params extra event info to send over the socket.
   */ broadcastMessage(method, params) {
        devServers.forEach((server)=>{
            server.broadcastMessage(method, params);
        });
    }
    /** Get the port for the dev server (either Webpack or Metro) that is hosting code for React Native runtimes. */ getNativeDevServerPort() {
        var ref;
        const server1 = devServers.find((server)=>server.isTargetingNative()
        );
        var _port;
        return (_port = (ref = server1 == null ? void 0 : server1.getInstance()) == null ? void 0 : ref.location.port) != null ? _port : null;
    }
    /** Get the first server that targets web. */ getWebDevServer() {
        const server2 = devServers.find((server)=>server.isTargetingWeb()
        );
        return server2 != null ? server2 : null;
    }
    getDefaultDevServer() {
        // Return the first native dev server otherwise return the first dev server.
        const server3 = devServers.find((server)=>server.isTargetingNative()
        );
        const defaultServer = server3 != null ? server3 : devServers[0];
        (0, _assert).default(defaultServer, "No dev servers are running");
        return defaultServer;
    }
    async ensureWebDevServerRunningAsync() {
        const [server4] = devServers.filter((server)=>server.isTargetingWeb()
        );
        if (server4) {
            return;
        }
        Log.debug("Starting webpack dev server");
        return this.startAsync([
            {
                type: "webpack",
                options: this.options
            }, 
        ]);
    }
    /** Start all dev servers. */ async startAsync(startOptions) {
        const { exp  } = (0, _config).getConfig(this.projectRoot);
        var _sdkVersion;
        (0, _rudderstackClient).logEvent("Start Project", {
            sdkVersion: (_sdkVersion = exp.sdkVersion) != null ? _sdkVersion : null
        });
        // Start all dev servers...
        for (const { type , options  } of startOptions){
            const BundlerDevServerClass = await BUNDLERS[type]();
            const server = new BundlerDevServerClass(this.projectRoot, !!(options == null ? void 0 : options.devClient));
            await server.startAsync(options != null ? options : this.options);
            devServers.push(server);
        }
        return exp;
    }
    /** Stop all servers including ADB. */ async stopAsync() {
        await Promise.allSettled([
            // Stop all dev servers
            ...devServers.map((server)=>server.stopAsync()
            ),
            // Stop ADB
            AndroidDebugBridge.getServer().stopAsync(), 
        ]);
    }
}
exports.DevServerManager = DevServerManager;

//# sourceMappingURL=DevServerManager.js.map