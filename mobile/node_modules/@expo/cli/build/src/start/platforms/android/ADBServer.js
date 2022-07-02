"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _spawnAsync = _interopRequireDefault(require("@expo/spawn-async"));
var _childProcess = require("child_process");
var Log = _interopRequireWildcard(require("../../../log"));
var _errors = require("../../../utils/errors");
var _exit = require("../../../utils/exit");
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
const BEGINNING_OF_ADB_ERROR_MESSAGE = "error: ";
class ADBServer {
    isRunning = false;
    removeExitHook = ()=>{};
    /** Returns the command line reference to ADB. */ getAdbExecutablePath() {
        // https://developer.android.com/studio/command-line/variables
        // TODO: Add ANDROID_SDK_ROOT support as well https://github.com/expo/expo/pull/16516#discussion_r820037917
        if (process.env.ANDROID_HOME) {
            return `${process.env.ANDROID_HOME}/platform-tools/adb`;
        }
        return "adb";
    }
    /** Start the ADB server. */ async startAsync() {
        if (this.isRunning) {
            return false;
        }
        // clean up
        this.removeExitHook = (0, _exit).installExitHooks(()=>{
            if (this.isRunning) {
                this.stopAsync();
            }
        });
        const adb = this.getAdbExecutablePath();
        const result = await this.resolveAdbPromise((0, _spawnAsync).default(adb, [
            "start-server"
        ]));
        const lines = result.stderr.trim().split(/\r?\n/);
        const isStarted = lines.includes("* daemon started successfully");
        this.isRunning = isStarted;
        return isStarted;
    }
    /** Kill the ADB server. */ async stopAsync() {
        Log.debug("Stopping ADB server");
        if (!this.isRunning) {
            Log.debug("ADB server is not running");
            return false;
        }
        this.removeExitHook();
        try {
            await this.runAsync([
                "kill-server"
            ]);
            return true;
        } catch (error) {
            Log.error("Failed to stop ADB server: " + error.message);
            return false;
        } finally{
            Log.debug("Stopped ADB server");
            this.isRunning = false;
        }
    }
    /** Execute an ADB command with given args. */ async runAsync(args) {
        // TODO: Add a global package that installs adb to the path.
        const adb = this.getAdbExecutablePath();
        await this.startAsync();
        Log.debug([
            adb,
            ...args
        ].join(" "));
        const result = await this.resolveAdbPromise((0, _spawnAsync).default(adb, args));
        return result.output.join("\n");
    }
    /** Get ADB file output. Useful for reading device state/settings. */ async getFileOutputAsync(args) {
        // TODO: Add a global package that installs adb to the path.
        const adb = this.getAdbExecutablePath();
        await this.startAsync();
        const results = await this.resolveAdbPromise((0, _childProcess).execFileSync(adb, args, {
            encoding: "latin1",
            stdio: "pipe"
        }));
        Log.debug("[ADB] File output:\n", results);
        return results;
    }
    /** Formats error info. */ async resolveAdbPromise(promise) {
        try {
            return await promise;
        } catch (error) {
            // User pressed ctrl+c to cancel the process...
            if (error.signal === "SIGINT") {
                throw new _errors.AbortCommandError();
            }
            // TODO: Support heap corruption for adb 29 (process exits with code -1073740940) (windows and linux)
            let errorMessage = (error.stderr || error.stdout || error.message).trim();
            if (errorMessage.startsWith(BEGINNING_OF_ADB_ERROR_MESSAGE)) {
                errorMessage = errorMessage.substring(BEGINNING_OF_ADB_ERROR_MESSAGE.length);
            }
            error.message = errorMessage;
            throw error;
        }
    }
}
exports.ADBServer = ADBServer;

//# sourceMappingURL=ADBServer.js.map