"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.xcrunAsync = xcrunAsync;
var _spawnAsync = _interopRequireDefault(require("@expo/spawn-async"));
var _chalk = _interopRequireDefault(require("chalk"));
var Log = _interopRequireWildcard(require("../../../log"));
var _errors = require("../../../utils/errors");
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
async function xcrunAsync(args, options) {
    Log.debug("Running: xcrun " + args.join(" "));
    try {
        return await (0, _spawnAsync).default("xcrun", args.filter(Boolean), options);
    } catch (e) {
        throwXcrunError(e);
    }
}
function throwXcrunError(e) {
    var ref;
    if (isLicenseOutOfDate(e.stdout) || isLicenseOutOfDate(e.stderr)) {
        throw new _errors.CommandError("XCODE_LICENSE_NOT_ACCEPTED", "Xcode license is not accepted. Please run `sudo xcodebuild -license`.");
    } else if ((ref = e.stderr) == null ? void 0 : ref.includes("not a developer tool or in PATH")) {
        throw new _errors.CommandError("SIMCTL_NOT_AVAILABLE", `You may need to run ${_chalk.default.bold("sudo xcode-select -s /Applications/Xcode.app")} and try again.`);
    }
    // Attempt to craft a better error message...
    if (Array.isArray(e.output)) {
        e.message += "\n" + e.output.join("\n").trim();
    } else if (e.stderr) {
        e.message += "\n" + e.stderr;
    }
    throw e;
}
function isLicenseOutOfDate(text) {
    if (!text) {
        return false;
    }
    const lower = text.toLowerCase();
    return lower.includes("xcode") && lower.includes("license");
}

//# sourceMappingURL=xcrun.js.map