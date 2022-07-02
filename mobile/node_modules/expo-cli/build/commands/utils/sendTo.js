"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.askForSendToAsync = askForSendToAsync;
exports.getRecipient = getRecipient;
exports.sendUrlAsync = sendUrlAsync;

function _chalk() {
  const data = _interopRequireDefault(require("chalk"));

  _chalk = function () {
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

function _log() {
  const data = _interopRequireDefault(require("../../log"));

  _log = function () {
    return data;
  };

  return data;
}

function _ora() {
  const data = require("../../utils/ora");

  _ora = function () {
    return data;
  };

  return data;
}

function _prompts() {
  const data = require("../../utils/prompts");

  _prompts = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function askForSendToAsync() {
  const cachedValue = await _xdl().UserSettings.getAsync('sendTo', null);

  _log().default.nested("Enter an email address and we'll send a link");

  const recipient = await (0, _prompts().promptEmailAsync)({
    message: `Email address`,
    initial: cachedValue !== null && cachedValue !== void 0 ? cachedValue : undefined
  }, {
    nonInteractiveHelp: 'Please specify email address with --send-to.'
  });
  await _xdl().UserSettings.mergeAsync({
    sendTo: recipient
  });
  return recipient;
}

async function getRecipient(sendTo) {
  let recipient = '';

  if (sendTo) {
    if (typeof sendTo !== 'boolean') {
      recipient = sendTo;
    } else {
      recipient = await _xdl().UserSettings.getAsync('sendTo', null);
    }

    if (!recipient) {
      return await askForSendToAsync();
    }
  }

  return recipient;
}

async function sendUrlAsync(url, recipient) {
  const email = _chalk().default.bold(recipient);

  const spinner = (0, _ora().ora)(`Sending URL to ${email}`).start();

  try {
    const result = await _xdl().Exp.sendAsync(recipient, url);
    spinner.succeed(`Sent URL to ${email}`);
    return result;
  } catch (e) {
    spinner.fail(`Failed to email ${email}: ${e.message}`);
  }
}
//# sourceMappingURL=sendTo.js.map