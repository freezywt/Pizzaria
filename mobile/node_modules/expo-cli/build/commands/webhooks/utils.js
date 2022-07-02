"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateSecret = generateSecret;
exports.setupAsync = setupAsync;
exports.validateSecret = validateSecret;

function _config() {
  const data = require("@expo/config");

  _config = function () {
    return data;
  };

  return data;
}

function _assert() {
  const data = _interopRequireDefault(require("assert"));

  _assert = function () {
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

function _crypto() {
  const data = _interopRequireDefault(require("crypto"));

  _crypto = function () {
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

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const SECRET_MIN_LENGTH = 16;
const SECRET_MAX_LENGTH = 1000;

function validateSecret({
  secret
}) {
  if (secret) {
    (0, _assert().default)(secret.length >= SECRET_MIN_LENGTH && secret.length < SECRET_MAX_LENGTH, `--secret: should be ${SECRET_MIN_LENGTH}-${SECRET_MAX_LENGTH} characters long`);
    return secret;
  }

  return null;
}

function generateSecret() {
  // Create a 60 characters long secret from 30 random bytes.
  const randomSecret = _crypto().default.randomBytes(30).toString('hex');

  _log().default.log(_chalk().default.underline('Webhook signing secret:'));

  _log().default.log(randomSecret);

  return randomSecret;
}

async function setupAsync(projectRoot) {
  var _exp$owner;

  const {
    exp
  } = (0, _config().getConfig)(projectRoot, {
    skipSDKVersionRequirement: true
  });
  const {
    slug
  } = exp;

  if (!slug) {
    throw new (_CommandError().default)(_CommandError().ErrorCodes.MISSING_SLUG, `expo.slug is not defined in ${(0, _config().findConfigFile)(projectRoot).configName}`);
  }

  const user = await _xdl().UserManager.ensureLoggedInAsync();

  const client = _xdl().ApiV2.clientForUser(user);

  const experienceName = `@${(_exp$owner = exp.owner) !== null && _exp$owner !== void 0 ? _exp$owner : user.username}/${exp.slug}`;

  try {
    const projects = await client.getAsync('projects', {
      experienceName
    });

    if (projects.length === 0) {
      throw projectNotFoundError(experienceName);
    }

    const project = projects[0];
    return {
      experienceName,
      project,
      client
    };
  } catch (error) {
    if (error.code === 'EXPERIENCE_NOT_FOUND') {
      throw projectNotFoundError(experienceName);
    } else {
      throw error;
    }
  }
}

function projectNotFoundError(experienceName) {
  return new (_CommandError().default)(_CommandError().ErrorCodes.PROJECT_NOT_FOUND, `Project ${experienceName} not found. The project is created the first time you run \`expo publish\` or build the project (https://docs.expo.dev/distribution/building-standalone-apps/).`);
}
//# sourceMappingURL=utils.js.map