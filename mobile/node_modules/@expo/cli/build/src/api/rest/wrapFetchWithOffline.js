"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.wrapFetchWithOffline = wrapFetchWithOffline;
var Log = _interopRequireWildcard(require("../../log"));
var _settings = require("../settings");
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
function wrapFetchWithOffline(fetchFunction) {
    return async function fetchWithOffline(url, options = {}) {
        if (_settings.APISettings.isOffline) {
            Log.debug("[fetch] Offline: Skipping network request: " + url);
            options.timeout = 1;
        }
        return fetchFunction(url, options);
    };
}

//# sourceMappingURL=wrapFetchWithOffline.js.map