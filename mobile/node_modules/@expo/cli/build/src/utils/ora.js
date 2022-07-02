"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getAllSpinners = getAllSpinners;
exports.ora = ora;
exports.logNewSection = logNewSection;
var _chalk = _interopRequireDefault(require("chalk"));
var _ora = _interopRequireDefault(require("ora"));
var _env = require("./env");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
// eslint-disable-next-line no-console
const logReal = console.log;
// eslint-disable-next-line no-console
const infoReal = console.info;
// eslint-disable-next-line no-console
const warnReal = console.warn;
// eslint-disable-next-line no-console
const errorReal = console.error;
const runningSpinners = [];
function getAllSpinners() {
    return runningSpinners;
}
function ora(options1) {
    const inputOptions = typeof options1 === "string" ? {
        text: options1
    } : options1 || {};
    const disabled = _env.env.CI || _env.env.EXPO_DEBUG;
    const spinner = (0, _ora).default({
        // Ensure our non-interactive mode emulates CI mode.
        isEnabled: !disabled,
        // In non-interactive mode, send the stream to stdout so it prevents looking like an error.
        stream: disabled ? process.stdout : process.stderr,
        ...inputOptions
    });
    const oraStart = spinner.start.bind(spinner);
    const oraStop = spinner.stop.bind(spinner);
    const oraStopAndPersist = spinner.stopAndPersist.bind(spinner);
    const logWrap = (method, args)=>{
        oraStop();
        method(...args);
        spinner.start();
    };
    const wrapNativeLogs = ()=>{
        // eslint-disable-next-line no-console
        console.log = (...args)=>logWrap(logReal, args)
        ;
        // eslint-disable-next-line no-console
        console.info = (...args)=>logWrap(infoReal, args)
        ;
        // eslint-disable-next-line no-console
        console.warn = (...args)=>logWrap(warnReal, args)
        ;
        // eslint-disable-next-line no-console
        console.error = (...args)=>logWrap(errorReal, args)
        ;
        runningSpinners.push(spinner);
    };
    const resetNativeLogs = ()=>{
        // eslint-disable-next-line no-console
        console.log = logReal;
        // eslint-disable-next-line no-console
        console.info = logReal;
        // eslint-disable-next-line no-console
        console.warn = warnReal;
        // eslint-disable-next-line no-console
        console.error = errorReal;
        const index = runningSpinners.indexOf(spinner);
        if (index >= 0) {
            runningSpinners.splice(index, 1);
        }
    };
    spinner.start = (text)=>{
        wrapNativeLogs();
        return oraStart(text);
    };
    spinner.stopAndPersist = (options)=>{
        const result = oraStopAndPersist(options);
        resetNativeLogs();
        return result;
    };
    spinner.stop = ()=>{
        const result = oraStop();
        resetNativeLogs();
        return result;
    };
    // Always make the central logging module aware of the current spinner
    // Log.setSpinner(spinner);
    return spinner;
}
function logNewSection(title) {
    const spinner = ora(_chalk.default.bold(title));
    // Prevent the spinner from clashing with debug logs
    spinner.start();
    return spinner;
}

//# sourceMappingURL=ora.js.map