"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.parseVariadicArguments = parseVariadicArguments;
exports.resolveArgsAsync = resolveArgsAsync;
var Log = _interopRequireWildcard(require("../log"));
var _errors = require("../utils/errors");
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
function resolveOptions(options) {
    if (options.fix && options.check) {
        throw new _errors.CommandError("BAD_ARGS", "Specify at most one of: --check, --fix");
    }
    if (options.npm && options.yarn) {
        throw new _errors.CommandError("BAD_ARGS", "Specify at most one of: --npm, --yarn");
    }
    return {
        ...options
    };
}
function parseVariadicArguments(argv) {
    const variadic = [];
    const flags = {};
    for (const arg of argv){
        if (!arg.startsWith("-")) {
            variadic.push(arg);
        } else if (arg === "--") {
            break;
        } else {
            flags[arg] = true;
        }
    }
    // Everything after `--` that is not an option is passed to the underlying install command.
    const extras = [];
    const extraOperator = argv.indexOf("--");
    if (extraOperator > -1 && argv.length > extraOperator + 1) {
        const extraArgs = argv.slice(extraOperator + 1);
        if (extraArgs.includes("--")) {
            throw new _errors.CommandError("BAD_ARGS", "Unexpected multiple --");
        }
        extras.push(...extraArgs);
        Log.debug("Extra arguments: " + extras.join(", "));
    }
    Log.debug(`Parsed arguments (variadic: %O, flags: %O, extra: %O)`, variadic, flags, extras);
    return {
        variadic,
        flags,
        extras
    };
}
async function resolveArgsAsync(argv) {
    const { variadic , extras , flags  } = parseVariadicArguments(argv);
    assertUnexpectedObjectKeys([
        "--check",
        "--fix",
        "--npm",
        "--yarn"
    ], flags);
    return {
        // Variadic arguments like `npx expo install react react-dom` -> ['react', 'react-dom']
        variadic,
        options: resolveOptions({
            fix: !!flags["--fix"],
            check: !!flags["--check"],
            yarn: !!flags["--yarn"],
            npm: !!flags["--npm"]
        }),
        extras
    };
}
function assertUnexpectedObjectKeys(keys, obj) {
    const unexpectedKeys = Object.keys(obj).filter((key)=>!keys.includes(key)
    );
    if (unexpectedKeys.length > 0) {
        throw new _errors.CommandError("BAD_ARGS", `Unexpected: ${unexpectedKeys.join(", ")}`);
    }
}

//# sourceMappingURL=resolveOptions.js.map