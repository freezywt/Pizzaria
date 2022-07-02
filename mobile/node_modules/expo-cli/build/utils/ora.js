"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logNewSection = logNewSection;
exports.ora = ora;

function _chalk() {
  const data = _interopRequireDefault(require("chalk"));

  _chalk = function () {
    return data;
  };

  return data;
}

function _commander() {
  const data = _interopRequireDefault(require("commander"));

  _commander = function () {
    return data;
  };

  return data;
}

function _ora() {
  const data = _interopRequireDefault(require("ora"));

  _ora = function () {
    return data;
  };

  return data;
}

function _log() {
  const data = _interopRequireDefault(require("../log"));

  _log = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-next-line no-console
const logReal = console.log; // eslint-disable-next-line no-console

const infoReal = console.info; // eslint-disable-next-line no-console

const warnReal = console.warn; // eslint-disable-next-line no-console

const errorReal = console.error;
/**
 * A custom ora spinner that sends the stream to stdout in CI, non-TTY, or expo's non-interactive flag instead of stderr (the default).
 *
 * @param options
 * @returns
 */

function ora(options) {
  const inputOptions = typeof options === 'string' ? {
    text: options
  } : options || {};

  const disabled = _commander().default.nonInteractive || _log().default.isDebug;

  const spinner = (0, _ora().default)({
    // Ensure our non-interactive mode emulates CI mode.
    isEnabled: !disabled,
    // In non-interactive mode, send the stream to stdout so it prevents looking like an error.
    stream: disabled ? process.stdout : process.stderr,
    ...inputOptions
  });
  const oraStart = spinner.start.bind(spinner);
  const oraStop = spinner.stop.bind(spinner);
  const oraStopAndPersist = spinner.stopAndPersist.bind(spinner);

  const logWrap = (method, args) => {
    oraStop();
    method(...args);
    spinner.start();
  };

  const wrapNativeLogs = () => {
    // eslint-disable-next-line no-console
    console.log = (...args) => logWrap(logReal, args); // eslint-disable-next-line no-console


    console.info = (...args) => logWrap(infoReal, args); // eslint-disable-next-line no-console


    console.warn = (...args) => logWrap(warnReal, args); // eslint-disable-next-line no-console


    console.error = (...args) => logWrap(errorReal, args);
  };

  const resetNativeLogs = () => {
    // eslint-disable-next-line no-console
    console.log = logReal; // eslint-disable-next-line no-console

    console.info = logReal; // eslint-disable-next-line no-console

    console.warn = warnReal; // eslint-disable-next-line no-console

    console.error = errorReal;
  };

  spinner.start = text => {
    wrapNativeLogs();
    return oraStart(text);
  };

  spinner.stopAndPersist = options => {
    const result = oraStopAndPersist(options);
    resetNativeLogs();
    return result;
  };

  spinner.stop = () => {
    const result = oraStop();
    resetNativeLogs();
    return result;
  }; // Always make the central logging module aware of the current spinner


  _log().default.setSpinner(spinner);

  return spinner;
}
/**
 * Create a unified section spinner.
 *
 * @param title
 * @returns
 */


function logNewSection(title) {
  const spinner = ora(_chalk().default.bold(title)); // Prevent the spinner from clashing with debug logs

  spinner.start();
  return spinner;
}
//# sourceMappingURL=ora.js.map