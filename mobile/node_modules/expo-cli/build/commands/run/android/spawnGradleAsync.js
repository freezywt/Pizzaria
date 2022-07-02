"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assembleAsync = assembleAsync;
exports.installAsync = installAsync;
exports.spawnGradleAsync = spawnGradleAsync;

function _spawnAsync() {
  const data = _interopRequireDefault(require("@expo/spawn-async"));

  _spawnAsync = function () {
    return data;
  };

  return data;
}

function _path() {
  const data = _interopRequireDefault(require("path"));

  _path = function () {
    return data;
  };

  return data;
}

function _CommandError() {
  const data = require("../../../CommandError");

  _CommandError = function () {
    return data;
  };

  return data;
}

function _log() {
  const data = _interopRequireDefault(require("../../../log"));

  _log = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function upperFirst(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function formatGradleArguments(cmd, {
  appName,
  variant,
  tasks = [cmd + upperFirst(variant)]
}) {
  return appName ? tasks.map(task => `${appName}:${task}`) : tasks;
}

function resolveGradleWPath(androidProjectPath) {
  return _path().default.join(androidProjectPath, process.platform === 'win32' ? 'gradlew.bat' : 'gradlew');
}

function getPortArg(port) {
  return `-PreactNativeDevServerPort=${port}`;
}

async function assembleAsync({
  androidProjectPath,
  variant,
  port,
  appName
}) {
  const task = formatGradleArguments('assemble', {
    variant,
    appName
  });
  const args = [...task, // ignore linting errors
  '-x', 'lint', // ignore tests
  '-x', 'test', '--configure-on-demand'];
  if (port) args.push(getPortArg(port)); // Generate a profile under `/android/app/build/reports/profile`

  if (_log().default.isProfiling) args.push('--profile');
  return await spawnGradleAsync(androidProjectPath, {
    port,
    args
  });
}

async function installAsync({
  androidProjectPath,
  variant,
  appName,
  port
}) {
  const args = formatGradleArguments('install', {
    variant,
    appName
  });
  return await spawnGradleAsync(androidProjectPath, {
    port,
    args
  });
}

async function spawnGradleAsync(projectRoot, {
  port,
  args
}) {
  const gradlew = resolveGradleWPath(projectRoot);
  if (port) args.push(getPortArg(port));

  _log().default.debug(`  ${gradlew} ${args.join(' ')}`);

  try {
    return await (0, _spawnAsync().default)(gradlew, args, {
      cwd: projectRoot,
      stdio: 'inherit'
    });
  } catch (error) {
    // User aborted the command with ctrl-c
    if (error.status === 130) {
      // Fail silently
      throw new (_CommandError().AbortCommandError)();
    }

    throw error;
  }
}
//# sourceMappingURL=spawnGradleAsync.js.map