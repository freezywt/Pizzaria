"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "PromptType", {
  enumerable: true,
  get: function () {
    return _prompts().PromptType;
  }
});
exports.autoCompleteAsync = autoCompleteAsync;
exports.confirmAsync = confirmAsync;
exports.default = prompt;
exports.promptEmailAsync = promptEmailAsync;
exports.selectAsync = selectAsync;
exports.toggleConfirmAsync = toggleConfirmAsync;

function _commander() {
  const data = _interopRequireDefault(require("commander"));

  _commander = function () {
    return data;
  };

  return data;
}

function _prompts() {
  const data = _interopRequireWildcard(require("prompts"));

  _prompts = function () {
    return data;
  };

  return data;
}

function _CommandError() {
  const data = _interopRequireWildcard(require("../CommandError"));

  _CommandError = function () {
    return data;
  };

  return data;
}

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// NOTE(brentvatne): we don't use strikethrough anywhere in expo-cli currently,
// and prompts doesn't give us control over disabled styles (1), so until we
// open a PR to prompts to make it more extensible in this regard we can just
// have strikethrough make text grey instead through monkey-patching it.
//
// (1): https://github.com/terkelg/prompts/blob/972fbb2d43c7b1ee5058800f441daaf51f2c240f/lib/elements/select.js#L152-L154
const color = require('kleur');

color.strikethrough = color.gray;

function prompt(questions, {
  nonInteractiveHelp,
  ...options
} = {}) {
  questions = Array.isArray(questions) ? questions : [questions];

  if (_commander().default.nonInteractive && questions.length !== 0) {
    let message = `Input is required, but Expo CLI is in non-interactive mode.\n`;

    if (nonInteractiveHelp) {
      message += nonInteractiveHelp;
    } else {
      const question = questions[0];
      const questionMessage = typeof question.message === 'function' ? question.message(undefined, {}, question) : question.message;
      message += `Required input:\n${(questionMessage || '').trim().replace(/^/gm, '> ')}`;
    }

    throw new (_CommandError().default)('NON_INTERACTIVE', message);
  }

  return (0, _prompts().default)(questions, {
    onCancel() {
      throw new (_CommandError().AbortCommandError)();
    },

    ...options
  });
} // todo: replace this workaround, its still selectable by the cursor
// see: https://github.com/terkelg/prompts/issues/254


prompt.separator = title => ({
  title,
  disabled: true,
  value: undefined
});

/**
 * Create an auto complete list that can be searched and cancelled.
 *
 * @param questions
 * @param options
 */
async function autoCompleteAsync(questions, options) {
  const {
    value
  } = await prompt({
    limit: 11,

    suggest(input, choices) {
      const regex = new RegExp(input, 'i');
      return choices.filter(choice => regex.test(choice.title));
    },

    ...questions,
    name: 'value',
    type: 'autocomplete'
  }, options);
  return value !== null && value !== void 0 ? value : null;
}
/**
 * Create a selection list that can be cancelled.
 *
 * @param questions
 * @param options
 */


async function selectAsync(questions, options) {
  const {
    value
  } = await prompt({
    limit: 11,
    ...questions,

    // @ts-ignore: onRender not in the types
    onRender() {
      if (this.firstRender) {
        // Ensure the initial state isn't on a disabled item.
        while (this.choices[this.cursor].disabled) {
          this.cursor++;
          if (this.cursor > this.choices.length - 1) break;
        }

        this.fire(); // Without this, the value will be `0` instead of a string.

        this.value = (this.choices[this.cursor] || {}).value; // Support up arrow and `k` key -- no looping

        this.up = () => {
          let next = this.cursor;

          while (true) {
            if (next <= 0) break;
            next--;
            if (!this.choices[next].disabled) break;
          }

          if (!this.choices[next].disabled && next !== this.cursor) {
            this.moveCursor(next);
            this.render();
          } else {
            this.bell();
          }
        }; // Support down arrow and `j` key -- no looping


        this.down = () => {
          let next = this.cursor;

          while (true) {
            if (next >= this.choices.length - 1) break;
            next++;
            if (!this.choices[next].disabled) break;
          }

          if (!this.choices[next].disabled && next !== this.cursor) {
            this.moveCursor(next);
            this.render();
          } else {
            this.bell();
          }
        }; // Support tab -- looping


        this.next = () => {
          let next = this.cursor;
          let i = 0;

          while (i < this.choices.length) {
            i++;
            next = (next + 1) % this.choices.length;
            if (!this.choices[next].disabled) break;
          }

          if (!this.choices[next].disabled) {
            this.moveCursor(next);
            this.render();
          } else {
            // unexpected
            this.bell();
          }
        };
      }
    },

    name: 'value',
    type: 'select'
  }, options);
  return value !== null && value !== void 0 ? value : null;
}
/**
 * Create a standard yes/no confirmation that can be cancelled.
 *
 * @param questions
 * @param options
 */


async function confirmAsync(questions, options) {
  const {
    value
  } = await prompt({
    initial: true,
    ...questions,
    name: 'value',
    type: 'confirm'
  }, options);
  return value !== null && value !== void 0 ? value : null;
}
/**
 * Create a more dynamic yes/no confirmation that can be cancelled.
 *
 * @param questions
 * @param options
 */


async function toggleConfirmAsync(questions, options) {
  const {
    value
  } = await prompt({
    active: 'yes',
    inactive: 'no',
    ...questions,
    name: 'value',
    type: 'toggle'
  }, options);
  return value !== null && value !== void 0 ? value : null;
}
/**
 * Prompt the user for an email address.
 *
 * @param questions
 * @param options
 */


async function promptEmailAsync(questions, options) {
  const {
    value
  } = await prompt({
    type: 'text',
    format: value => value.trim(),
    validate: value => /.+@.+/.test(value) ? true : "That doesn't look like a valid email.",
    ...questions,
    name: 'value'
  }, options);
  return value.trim();
}
//# sourceMappingURL=prompts.js.map