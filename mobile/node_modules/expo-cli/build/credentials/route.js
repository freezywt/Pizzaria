"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CredentialsManager = void 0;
exports.runCredentialsManager = runCredentialsManager;
exports.runCredentialsManagerStandalone = runCredentialsManagerStandalone;

function _promise() {
  const data = require("../commands/utils/promise");

  _promise = function () {
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

function _Select() {
  const data = require("./views/Select");

  _Select = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

async function runCredentialsManagerStandalone(ctx, startView) {
  const manager = new CredentialsManager(ctx, startView, new (_Select().AskQuit)());
  await manager.run();
}

async function runCredentialsManager(ctx, startView) {
  const manager = new CredentialsManager(ctx, startView, new (_Select().DoQuit)());
  return await manager.run();
}

class CredentialsManager {
  constructor(ctx, startView, quit) {
    _defineProperty(this, "_ctx", void 0);

    _defineProperty(this, "_mainView", void 0);

    _defineProperty(this, "_currentView", void 0);

    _defineProperty(this, "_quit", void 0);

    CredentialsManager._manager = this;
    this._ctx = ctx;
    this._mainView = startView;
    this._currentView = startView;
    this._quit = quit;
  }

  static get() {
    if (!CredentialsManager._manager) {
      throw new Error('Credential Manager has not been initialized yet');
    }

    return CredentialsManager._manager;
  }

  async run() {
    while (true) {
      try {
        this._currentView = (await this._currentView.open(this._ctx)) || (await this._quit.runAsync(this._mainView));
      } catch (error) {
        // View quit normally, exit normally
        if (error instanceof _Select().QuitError) {
          return null;
        } // View encountered error


        if (this._quit instanceof _Select().DoQuit) {
          // propagate error up
          throw error;
        } else {
          // fallback to interactive Quit View
          _log().default.log(error);

          await (0, _promise().sleep)(1000);
          this._currentView = await this._quit.runAsync(this._mainView);
        }
      }
    }
  }

  changeMainView(view) {
    this._mainView = view;
  }

}

exports.CredentialsManager = CredentialsManager;

_defineProperty(CredentialsManager, "_manager", void 0);
//# sourceMappingURL=route.js.map