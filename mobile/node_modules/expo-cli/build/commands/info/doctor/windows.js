"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.warnUponCmdExe = warnUponCmdExe;

function _chalk() {
  const data = require("chalk");

  _chalk = function () {
    return data;
  };

  return data;
}

function _child_process() {
  const data = require("child_process");

  _child_process = function () {
    return data;
  };

  return data;
}

function _util() {
  const data = require("util");

  _util = function () {
    return data;
  };

  return data;
}

// I deliberately use `execFile` instead of `spawn`, because I expect the output of known format always.
const execFileAsync = (0, _util().promisify)(_child_process().execFile);
/**
 * Windows only. On any other platform (including WSL on Windows) it's no-op.
 *
 * Checks whether the script is executed from `cmd.exe` and if positive suggests using other terminals.
 */

async function warnUponCmdExe() {
  if (process.platform !== 'win32') {
    return;
  } // we're on Windows & we want to suggest using PowerShell instead of CMD


  await (async () => {
    // https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/tasklist
    const {
      stdout,
      stderr
    } = await execFileAsync('tasklist', ['/nh', '/fo', 'csv', '/fi', `PID eq ${process.ppid}`], {
      windowsHide: true
    });

    if (!stdout.startsWith('') || stderr !== '') {
      // Message upon no command output or wrong input is printed without '"" and results are printed with them.
      // console.log(stdout);
      // console.log(stderr);
      return;
    }

    const [parentProcessName] = stdout.match(/(?<=^").*?(?=",)/) || [''];

    if (parentProcessName.toLowerCase().includes('cmd.exe')) {
      // eslint-disable-next-line no-console
      console.warn((0, _chalk().yellow)('WARNING: We recommend using PowerShell or Bash via WSL 2 for development with expo-cli on Windows. You may encounter issues using cmd.exe.\n'));
    }
  })();
}
//# sourceMappingURL=windows.js.map