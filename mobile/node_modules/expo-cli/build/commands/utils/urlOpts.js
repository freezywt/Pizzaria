"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _qrcodeTerminal() {
  const data = _interopRequireDefault(require("qrcode-terminal"));

  _qrcodeTerminal = function () {
    return data;
  };

  return data;
}

function _xdl() {
  const data = require("xdl");

  _xdl = function () {
    return data;
  };

  return data;
}

function _CommandError() {
  const data = _interopRequireWildcard(require("../../CommandError"));

  _CommandError = function () {
    return data;
  };

  return data;
}

function _log() {
  const data = _interopRequireDefault(require("../../log"));

  _log = function () {
    return data;
  };

  return data;
}

function _schemes() {
  const data = require("../run/utils/schemes");

  _schemes = function () {
    return data;
  };

  return data;
}

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addOptions(program) {
  program.option('--dev-client', 'Experimental: Starts the bundler for use with the expo-development-client').option('--scheme <scheme>', 'Custom URI protocol to use with a development build').option('-a, --android', 'Opens your app in Expo Go on a connected Android device').option('-i, --ios', 'Opens your app in Expo Go in a currently running iOS simulator on your computer').option('-w, --web', 'Opens your app in a web browser').option('-m, --host [mode]', 'lan (default), tunnel, localhost. Type of host to use. "tunnel" allows you to view your link on other networks').option('--tunnel', 'Same as --host tunnel').option('--lan', 'Same as --host lan').option('--localhost', 'Same as --host localhost');
}

async function optsAsync(projectRoot, options) {
  const opts = await _xdl().ProjectSettings.readAsync(projectRoot);

  if ([options.host, options.lan, options.localhost, options.tunnel].filter(i => i).length > 1) {
    throw new (_CommandError().default)('BAD_ARGS', 'Specify at most one of --host, --tunnel, --lan, and --localhost');
  }

  opts.hostType = 'lan';

  if (options.offline) {
    // TODO: maybe let people know that we will force localhost with offline?
    _xdl().ConnectionStatus.setIsOffline(true);

    opts.hostType = 'localhost';
  }

  if (options.host) {
    opts.hostType = options.host;
  } else if (options.tunnel) {
    opts.hostType = 'tunnel';
  } else if (options.lan) {
    opts.hostType = 'lan';
  } else if (options.localhost) {
    opts.hostType = 'localhost';
  }

  if (typeof options.scheme === 'string') {
    var _options$scheme;

    // Use the custom scheme
    opts.scheme = (_options$scheme = options.scheme) !== null && _options$scheme !== void 0 ? _options$scheme : null;
  } else if (options.devClient) {
    // Attempt to find the scheme or warn the user how to setup a custom scheme
    opts.scheme = await (0, _schemes().getOptionalDevClientSchemeAsync)(projectRoot);
  } else if (!options.devClient && (0, _xdl().isDevClientPackageInstalled)(projectRoot)) {
    opts.scheme = await (0, _schemes().getOptionalDevClientSchemeAsync)(projectRoot);
  } else {
    // Ensure this is reset when users don't use `--scheme`, `--dev-client` and don't have the `expo-dev-client` package installed.
    opts.scheme = null;
  }

  await _xdl().ProjectSettings.setAsync(projectRoot, opts);
  return opts;
}

function printQRCode(url) {
  _qrcodeTerminal().default.generate(url, {
    small: true
  }, code => _log().default.log(code));
}

async function handleMobileOptsAsync(projectRoot, options) {
  const results = await Promise.all([(async () => {
    if (options.android) {
      if (options.webOnly) {
        return await _xdl().Android.openWebProjectAsync({
          projectRoot
        });
      } else {
        var _options$devClient;

        return await _xdl().Android.openProjectAsync({
          projectRoot,
          devClient: (_options$devClient = options.devClient) !== null && _options$devClient !== void 0 ? _options$devClient : false
        });
      }
    }

    return null;
  })(), (async () => {
    if (options.ios) {
      if (options.webOnly) {
        return await _xdl().Simulator.openWebProjectAsync({
          projectRoot,
          shouldPrompt: false
        });
      } else {
        var _options$devClient2;

        return await _xdl().Simulator.openProjectAsync({
          projectRoot,
          devClient: (_options$devClient2 = options.devClient) !== null && _options$devClient2 !== void 0 ? _options$devClient2 : false,
          shouldPrompt: false
        });
      }
    }

    return null;
  })(), (async () => {
    if (options.web) {
      return await _xdl().Webpack.openAsync(projectRoot);
    }

    return null;
  })()]);
  const errors = results.reduce((prev, curr) => {
    if (curr && !curr.success) {
      return prev.concat([curr.error]);
    }

    return prev;
  }, []).filter(Boolean);

  if (errors.length) {
    // ctrl+c
    const isEscapedError = errors.some(error => error === 'escaped');

    if (isEscapedError) {
      throw new (_CommandError().AbortCommandError)();
    } else {
      if (typeof errors[0] === 'string') {
        // Throw the first error
        throw new (_CommandError().default)(errors[0]);
      }

      throw errors[0];
    }
  }

  return !!options.android || !!options.ios;
}

var _default = {
  addOptions,
  handleMobileOptsAsync,
  printQRCode,
  optsAsync
};
exports.default = _default;
//# sourceMappingURL=urlOpts.js.map