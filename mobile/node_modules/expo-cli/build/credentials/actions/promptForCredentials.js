"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.askForUserProvided = askForUserProvided;
exports.getCredentialsFromUser = getCredentialsFromUser;

function _fsExtra() {
  const data = _interopRequireDefault(require("fs-extra"));

  _fsExtra = function () {
    return data;
  };

  return data;
}

function _once() {
  const data = _interopRequireDefault(require("lodash/once"));

  _once = function () {
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

function _untildify() {
  const data = _interopRequireDefault(require("untildify"));

  _untildify = function () {
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

function _prompts() {
  const data = _interopRequireDefault(require("../../utils/prompts"));

  _prompts = function () {
    return data;
  };

  return data;
}

function validators() {
  const data = _interopRequireWildcard(require("../../utils/validators"));

  validators = function () {
    return data;
  };

  return data;
}

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const EXPERT_PROMPT = (0, _once().default)(() => _log().default.warn(`
WARNING! In this mode, we won't be able to make sure that your credentials are valid.
Please double check that you're uploading valid files for your app otherwise you may encounter strange errors!

When building for IOS make sure you've created your App ID on the Apple Developer Portal, that your App ID
is in app.json as \`bundleIdentifier\`, and that the provisioning profile you
upload matches that Team ID and App ID.
`));

async function askForUserProvided(schema) {
  if (await willUserProvideCredentialsType(schema)) {
    EXPERT_PROMPT();
    return await getCredentialsFromUser(schema);
  }

  return null;
}

async function getCredentialsFromUser(credentialType) {
  const results = {};

  for (const field of credentialType.required) {
    var _credentialType$quest;

    results[field] = await askQuestionAndProcessAnswer(credentialType === null || credentialType === void 0 ? void 0 : (_credentialType$quest = credentialType.questions) === null || _credentialType$quest === void 0 ? void 0 : _credentialType$quest[field]);
  }

  return results;
}

async function willUserProvideCredentialsType(schema) {
  var _schema$provideMethod, _schema$provideMethod2, _schema$provideMethod3, _schema$provideMethod4, _schema$provideMethod5, _schema$provideMethod6;

  const {
    answer
  } = await (0, _prompts().default)({
    type: 'select',
    name: 'answer',
    message: (_schema$provideMethod = schema === null || schema === void 0 ? void 0 : (_schema$provideMethod2 = schema.provideMethodQuestion) === null || _schema$provideMethod2 === void 0 ? void 0 : _schema$provideMethod2.question) !== null && _schema$provideMethod !== void 0 ? _schema$provideMethod : `Will you provide your own ${schema.name}?`,
    choices: [{
      title: (_schema$provideMethod3 = schema === null || schema === void 0 ? void 0 : (_schema$provideMethod4 = schema.provideMethodQuestion) === null || _schema$provideMethod4 === void 0 ? void 0 : _schema$provideMethod4.expoGenerated) !== null && _schema$provideMethod3 !== void 0 ? _schema$provideMethod3 : 'Let Expo handle the process',
      value: false
    }, {
      title: (_schema$provideMethod5 = schema === null || schema === void 0 ? void 0 : (_schema$provideMethod6 = schema.provideMethodQuestion) === null || _schema$provideMethod6 === void 0 ? void 0 : _schema$provideMethod6.userProvided) !== null && _schema$provideMethod5 !== void 0 ? _schema$provideMethod5 : 'I want to upload my own file',
      value: true
    }]
  });
  return answer;
}

async function askQuestionAndProcessAnswer(definition) {
  const questionObject = buildQuestionObject(definition);
  const {
    input
  } = await (0, _prompts().default)(questionObject);
  return await processAnswer(definition, input);
}

function buildQuestionObject({
  type,
  question
}) {
  switch (type) {
    case 'string':
      return {
        type: 'text',
        name: 'input',
        message: question
      };

    case 'file':
      return {
        type: 'text',
        name: 'input',
        message: question,
        format: produceAbsolutePath,
        validate: validators().promptsExistingFile
      };

    case 'password':
      return {
        type: 'password',
        name: 'input',
        message: question,
        validate: validators().promptsNonEmptyInput
      };
  }
}

async function processAnswer({
  type,
  base64Encode
}, input) {
  if (type === 'file') {
    return _fsExtra().default.readFile(input, base64Encode ? 'base64' : 'utf8');
  } else {
    return input;
  }
}

function produceAbsolutePath(filePath) {
  const untildified = (0, _untildify().default)(filePath.trim());
  return !_path().default.isAbsolute(untildified) ? _path().default.resolve(untildified) : untildified;
}
//# sourceMappingURL=promptForCredentials.js.map