"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _configPlugins = require("@expo/config-plugins");
var _plist = _interopRequireDefault(require("@expo/plist"));
var _fs = _interopRequireDefault(require("fs"));
var _appIdResolver = require("../AppIdResolver");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
class AppleAppIdResolver extends _appIdResolver.AppIdResolver {
    constructor(projectRoot){
        super(projectRoot, "ios", "ios.bundleIdentifier");
    }
    async hasNativeProjectAsync() {
        try {
            return !!_configPlugins.IOSConfig.Paths.getAppDelegateFilePath(this.projectRoot);
        } catch  {
            return true;
        }
    }
    async resolveAppIdFromNativeAsync() {
        // Check xcode project
        try {
            const bundleId = _configPlugins.IOSConfig.BundleIdentifier.getBundleIdentifierFromPbxproj(this.projectRoot);
            if (bundleId) {
                return bundleId;
            }
        } catch  {}
        // Check Info.plist
        try {
            const infoPlistPath = _configPlugins.IOSConfig.Paths.getInfoPlistPath(this.projectRoot);
            const data = await _plist.default.parse(_fs.default.readFileSync(infoPlistPath, "utf8"));
            if (data.CFBundleIdentifier && !data.CFBundleIdentifier.startsWith("$(")) {
                return data.CFBundleIdentifier;
            }
        } catch  {}
        return null;
    }
}
exports.AppleAppIdResolver = AppleAppIdResolver;

//# sourceMappingURL=AppleAppIdResolver.js.map