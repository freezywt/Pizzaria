"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PushKeyManager = void 0;
exports.isPushKey = isPushKey;

function _appleUtils() {
  const data = require("@expo/apple-utils");

  _appleUtils = function () {
    return data;
  };

  return data;
}

function _chalk() {
  const data = _interopRequireDefault(require("chalk"));

  _chalk = function () {
    return data;
  };

  return data;
}

function _dateformat() {
  const data = _interopRequireDefault(require("dateformat"));

  _dateformat = function () {
    return data;
  };

  return data;
}

function _CommandError() {
  const data = _interopRequireDefault(require("../CommandError"));

  _CommandError = function () {
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

function _ora() {
  const data = require("../utils/ora");

  _ora = function () {
    return data;
  };

  return data;
}

function _authenticate() {
  const data = require("./authenticate");

  _authenticate = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function isPushKey(obj) {
  return obj.apnsKeyP8 && typeof obj.apnsKeyP8 === 'string' && obj.apnsKeyId && typeof obj.apnsKeyId === 'string' && obj.teamId && typeof obj.teamId === 'string';
}

const {
  MaxKeysCreatedError
} = _appleUtils().Keys;

const APPLE_KEYS_TOO_MANY_GENERATED_ERROR = `
You can have only ${_chalk().default.underline('two')} Apple Keys generated on your Apple Developer account.
Please revoke the old ones or reuse existing from your other apps.
Please remember that Apple Keys are not application specific!
`;

async function listPushKeysAsync(authCtx) {
  const spinner = (0, _ora().ora)(`Fetching Apple push keys`).start();

  try {
    const context = (0, _authenticate().getRequestContext)(authCtx);
    const keys = await _appleUtils().Keys.getKeysAsync(context);
    spinner.succeed(`Fetched Apple push keys`);
    return keys;
  } catch (error) {
    spinner.fail(`Failed to fetch Apple push keys`);
    throw error;
  }
}

async function createPushKeyAsync(authCtx, name = `Expo Push Notifications Key ${(0, _dateformat().default)('yyyymmddHHMMss')}`) {
  const spinner = (0, _ora().ora)(`Creating Apple push key`).start();

  try {
    const context = (0, _authenticate().getRequestContext)(authCtx);
    const key = await _appleUtils().Keys.createKeyAsync(context, {
      name,
      isApns: true
    });
    const apnsKeyP8 = await _appleUtils().Keys.downloadKeyAsync(context, {
      id: key.id
    });
    spinner.succeed(`Created Apple push key`);
    return {
      apnsKeyId: key.id,
      apnsKeyP8,
      teamId: authCtx.team.id,
      teamName: authCtx.team.name
    };
  } catch (err) {
    var _err$rawDump;

    spinner.fail('Failed to create Apple push key');
    const resultString = (_err$rawDump = err.rawDump) === null || _err$rawDump === void 0 ? void 0 : _err$rawDump.resultString;

    if (err instanceof MaxKeysCreatedError || resultString && resultString.match(/maximum allowed number of Keys/)) {
      throw new (_CommandError().default)(APPLE_KEYS_TOO_MANY_GENERATED_ERROR);
    }

    throw err;
  }
}

async function revokePushKeyAsync(authCtx, ids) {
  const name = `Apple push key${(ids === null || ids === void 0 ? void 0 : ids.length) === 1 ? '' : 's'}`;
  const spinner = (0, _ora().ora)(`Revoking ${name}`).start();

  try {
    const context = (0, _authenticate().getRequestContext)(authCtx);
    await Promise.all(ids.map(id => _appleUtils().Keys.revokeKeyAsync(context, {
      id
    })));
    spinner.succeed(`Revoked ${name}`);
  } catch (error) {
    _log().default.error(error);

    spinner.fail(`Failed to revoke ${name}`);
    throw error;
  }
}

class PushKeyManager {
  constructor(appleCtx) {
    _defineProperty(this, "ctx", void 0);

    this.ctx = appleCtx;
  }

  async list() {
    return listPushKeysAsync(this.ctx);
  }

  async create(name) {
    return createPushKeyAsync(this.ctx, name);
  }

  async revoke(ids) {
    return revokePushKeyAsync(this.ctx, ids);
  }

  format({
    id,
    name
  }) {
    return `${name} - ID: ${id}`;
  }

}

exports.PushKeyManager = PushKeyManager;
//# sourceMappingURL=pushKey.js.map