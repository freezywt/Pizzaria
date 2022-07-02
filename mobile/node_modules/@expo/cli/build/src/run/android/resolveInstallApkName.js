"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.resolveInstallApkNameAsync = resolveInstallApkNameAsync;
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var Log = _interopRequireWildcard(require("../../log"));
var _adb = require("../../start/platforms/android/adb");
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
async function resolveInstallApkNameAsync(device, { appName , buildType , flavors , apkVariantDirectory  }) {
    const availableCPUs = await (0, _adb).getDeviceABIsAsync(device);
    availableCPUs.push(_adb.DeviceABI.universal);
    Log.debug("Supported ABIs: " + availableCPUs.join(", "));
    Log.debug("Searching for APK: " + apkVariantDirectory);
    // Check for cpu specific builds first
    for (const availableCPU of availableCPUs){
        const apkName = getApkFileName(appName, buildType, flavors, availableCPU);
        const apkPath = _path.default.join(apkVariantDirectory, apkName);
        Log.debug("Checking for APK at:", apkPath);
        if (_fs.default.existsSync(apkPath)) {
            return apkName;
        }
    }
    // Otherwise use the default apk named after the variant: app-debug.apk
    const apkName = getApkFileName(appName, buildType, flavors);
    const apkPath = _path.default.join(apkVariantDirectory, apkName);
    Log.debug("Checking for fallback APK at:", apkPath);
    if (_fs.default.existsSync(apkPath)) {
        return apkName;
    }
    return null;
}
function getApkFileName(appName, buildType, flavors, cpuArch) {
    let apkName = `${appName}-`;
    if (flavors) {
        apkName += flavors.reduce((rest, flavor)=>`${rest}${flavor}-`
        , "");
    }
    if (cpuArch) {
        apkName += `${cpuArch}-`;
    }
    apkName += `${buildType}.apk`;
    return apkName;
}

//# sourceMappingURL=resolveInstallApkName.js.map