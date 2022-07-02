"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.instantiateMetroAsync = instantiateMetroAsync;
var _metroCore = require("metro-core");
var _createDevServerMiddleware = require("../middleware/createDevServerMiddleware");
var _metroTerminalReporter = require("./MetroTerminalReporter");
var _resolveFromProject = require("./resolveFromProject");
async function instantiateMetroAsync(projectRoot, options) {
    let reportEvent;
    const Metro = (0, _resolveFromProject).importMetroFromProject(projectRoot);
    const ExpoMetroConfig = (0, _resolveFromProject).importExpoMetroConfigFromProject(projectRoot);
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
    const metroConfig = await ExpoMetroConfig.loadAsync(projectRoot, {
        reporter,
        ...options
    });
    const { middleware , attachToServer , // New
    websocketEndpoints , eventsSocketEndpoint , messageSocketEndpoint ,  } = (0, _createDevServerMiddleware).createDevServerMiddleware(projectRoot, {
        port: metroConfig.server.port,
        watchFolders: metroConfig.watchFolders
    });
    const customEnhanceMiddleware = metroConfig.server.enhanceMiddleware;
    // @ts-ignore can't mutate readonly config
    metroConfig.server.enhanceMiddleware = (metroMiddleware, server)=>{
        if (customEnhanceMiddleware) {
            metroMiddleware = customEnhanceMiddleware(metroMiddleware, server);
        }
        return middleware.use(metroMiddleware);
    };
    const server1 = await Metro.runServer(metroConfig, {
        // @ts-expect-error: TODO: Update the types.
        hmrEnabled: true,
        websocketEndpoints
    });
    if (attachToServer) {
        // Expo SDK 44 and lower
        const { messageSocket , eventsSocket  } = attachToServer(server1);
        reportEvent = eventsSocket.reportEvent;
        return {
            server: server1,
            middleware,
            messageSocket
        };
    } else {
        // RN +68 -- Expo SDK +45
        reportEvent = eventsSocketEndpoint.reportEvent;
        return {
            server: server1,
            middleware,
            messageSocket: messageSocketEndpoint
        };
    }
}

//# sourceMappingURL=instantiateMetro.js.map