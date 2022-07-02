"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.resolvePackageManager = resolvePackageManager;
exports.installNodeDependenciesAsync = installNodeDependenciesAsync;
var PackageManager = _interopRequireWildcard(require("@expo/package-manager"));
var _chalk = _interopRequireDefault(require("chalk"));
var _fs = _interopRequireDefault(require("fs"));
var _jsYaml = _interopRequireDefault(require("js-yaml"));
var _path = _interopRequireDefault(require("path"));
var _semver = _interopRequireDefault(require("semver"));
var Log = _interopRequireWildcard(require("../log"));
var _env = require("./env");
var _errors = require("./errors");
var _ora = require("./ora");
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
function resolvePackageManager(options) {
    let packageManager = "npm";
    if (options.yarn || !options.npm && PackageManager.shouldUseYarn()) {
        packageManager = "yarn";
    } else {
        packageManager = "npm";
    }
    if (options.install) {
        Log.log(packageManager === "yarn" ? `🧶 Using Yarn to install packages. ${_chalk.default.dim("Pass --npm to use npm instead.")}` : "\uD83D\uDCE6 Using npm to install packages.");
    }
    return packageManager;
}
async function installNodeDependenciesAsync(projectRoot, packageManager, flags = {}) {
    var _silent;
    // Default to silent unless debugging.
    const isSilent = (_silent = flags.silent) != null ? _silent : !_env.env.EXPO_DEBUG;
    if (flags.clean && packageManager !== "yarn") {
        // This step can take a couple seconds, if the installation logs are enabled (with EXPO_DEBUG) then it
        // ends up looking odd to see "Installing JavaScript dependencies" for ~5 seconds before the logs start showing up.
        const cleanJsDepsStep = (0, _ora).logNewSection("Cleaning JavaScript dependencies");
        const time = Date.now();
        // nuke the node modules
        // TODO: this is substantially slower, we should find a better alternative to ensuring the modules are installed.
        await _fs.default.promises.rm("node_modules", {
            recursive: true,
            force: true
        });
        cleanJsDepsStep.succeed(`Cleaned JavaScript dependencies ${_chalk.default.gray(Date.now() - time + "ms")}`);
    }
    const installJsDepsStep = (0, _ora).logNewSection("Installing JavaScript dependencies");
    try {
        const time = Date.now();
        await installNodeDependenciesInternalAsync(projectRoot, packageManager, {
            silent: isSilent
        });
        installJsDepsStep.succeed(`Installed JavaScript dependencies ${_chalk.default.gray(Date.now() - time + "ms")}`);
    } catch  {
        const message = `Something went wrong installing JavaScript dependencies, check your ${packageManager} logfile or run ${_chalk.default.bold(`${packageManager} install`)} again manually.`;
        installJsDepsStep.fail(_chalk.default.red(message));
        // TODO: actually show the error message from the package manager! :O
        throw new _errors.SilentError(message);
    }
}
async function installNodeDependenciesInternalAsync(projectRoot, packageManager, flags) {
    const options = {
        cwd: projectRoot,
        silent: flags.silent
    };
    if (packageManager === "yarn") {
        const yarn = new PackageManager.YarnPackageManager(options);
        const version = await yarn.versionAsync();
        const nodeLinker = await yarn.getConfigAsync("nodeLinker");
        if (_semver.default.satisfies(version, ">=2.0.0-rc.24") && nodeLinker !== "node-modules") {
            const yarnRc = _path.default.join(projectRoot, ".yarnrc.yml");
            let yamlString = "";
            try {
                yamlString = _fs.default.readFileSync(yarnRc, "utf8");
            } catch (error) {
                if (error.code !== "ENOENT") {
                    throw error;
                }
            }
            const config = yamlString ? _jsYaml.default.safeLoad(yamlString) : {};
            // @ts-ignore
            config.nodeLinker = "node-modules";
            !flags.silent && Log.warn(`Yarn v${version} detected, enabling experimental Yarn v2 support using the node-modules plugin.`);
            !flags.silent && Log.log(`Writing ${yarnRc}...`);
            _fs.default.writeFileSync(yarnRc, _jsYaml.default.safeDump(config));
        }
        await yarn.installAsync();
    } else {
        await new PackageManager.NpmPackageManager(options).installAsync();
    }
}

//# sourceMappingURL=nodeModules.js.map