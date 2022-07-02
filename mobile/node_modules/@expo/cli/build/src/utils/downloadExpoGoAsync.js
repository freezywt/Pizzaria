"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.downloadExpoGoAsync = downloadExpoGoAsync;
var _getUserState = require("@expo/config/build/getUserState");
var _path = _interopRequireDefault(require("path"));
var _progress = _interopRequireDefault(require("progress"));
var _getVersions = require("../api/getVersions");
var Log = _interopRequireWildcard(require("../log"));
var _downloadAppAsync = require("./downloadAppAsync");
var _errors = require("./errors");
var _profile = require("./profile");
var _progress1 = require("./progress");
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
const platformSettings = {
    ios: {
        versionsKey: "iosClientUrl",
        getFilePath: (filename)=>_path.default.join((0, _getUserState).getExpoHomeDirectory(), "ios-simulator-app-cache", `${filename}.app`)
        ,
        shouldExtractResults: true
    },
    android: {
        versionsKey: "androidClientUrl",
        getFilePath: (filename)=>_path.default.join((0, _getUserState).getExpoHomeDirectory(), "android-apk-cache", `${filename}.apk`)
        ,
        shouldExtractResults: false
    }
};
async function downloadExpoGoAsync(platform, { url , sdkVersion  }) {
    const { getFilePath , versionsKey , shouldExtractResults  } = platformSettings[platform];
    const bar = new _progress.default("Downloading the Expo Go app [:bar] :percent :etas", {
        width: 64,
        total: 100,
        clear: true,
        complete: "=",
        incomplete: " "
    });
    // TODO: Auto track progress
    (0, _progress1).setProgressBar(bar);
    if (!url) {
        if (!sdkVersion) {
            throw new _errors.CommandError(`Unable to determine which Expo Go version to install (platform: ${platform})`);
        }
        const versions = await (0, _getVersions).getReleasedVersionsAsync();
        const version = versions[sdkVersion];
        Log.debug(`Installing Expo Go version for SDK ${sdkVersion} at URL: ${version[versionsKey]}`);
        url = version[versionsKey];
    }
    const filename = _path.default.parse(url).name;
    try {
        const outputPath = getFilePath(filename);
        Log.debug(`Downloading Expo Go from "${url}" to "${outputPath}".`);
        Log.debug(`The requested copy of Expo Go might already be cached in: "${(0, _getUserState).getExpoHomeDirectory()}". You can disable the cache with EXPO_NO_CACHE=1`);
        await (0, _profile).profile(_downloadAppAsync.downloadAppAsync)({
            url,
            // Save all encrypted cache data to `~/.expo/expo-go`
            cacheDirectory: "expo-go",
            outputPath,
            extract: shouldExtractResults,
            onProgress ({ progress  }) {
                if (bar) {
                    bar.tick(1, progress);
                }
            }
        });
        return outputPath;
    } finally{
        bar.terminate();
        (0, _progress1).setProgressBar(null);
    }
}

//# sourceMappingURL=downloadExpoGoAsync.js.map