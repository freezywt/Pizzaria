"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectPlatform = exports.SelectIosExperience = exports.SelectAndroidExperience = exports.QuitError = exports.DoQuit = exports.AskQuit = void 0;

function _assert() {
  const data = _interopRequireDefault(require("assert"));

  _assert = function () {
    return data;
  };

  return data;
}

function _prompts() {
  const data = _interopRequireWildcard(require("../../utils/prompts"));

  _prompts = function () {
    return data;
  };

  return data;
}

function _list() {
  const data = require("../actions/list");

  _list = function () {
    return data;
  };

  return data;
}

function _route() {
  const data = require("../route");

  _route = function () {
    return data;
  };

  return data;
}

function androidView() {
  const data = _interopRequireWildcard(require("./AndroidCredentials"));

  androidView = function () {
    return data;
  };

  return data;
}

function iosDistView() {
  const data = _interopRequireWildcard(require("./IosDistCert"));

  iosDistView = function () {
    return data;
  };

  return data;
}

function iosProvisionigProfileView() {
  const data = _interopRequireWildcard(require("./IosProvisioningProfile"));

  iosProvisionigProfileView = function () {
    return data;
  };

  return data;
}

function iosPushView() {
  const data = _interopRequireWildcard(require("./IosPushCredentials"));

  iosPushView = function () {
    return data;
  };

  return data;
}

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class SelectPlatform {
  async open(ctx) {
    const {
      platform
    } = await (0, _prompts().default)({
      type: 'select',
      name: 'platform',
      message: 'Select platform',
      choices: ['ios', 'android'].map(value => ({
        value,
        title: value
      })),
      optionsPerPage: 20
    });
    const view = platform === 'ios' ? new SelectIosExperience() : new SelectAndroidExperience();

    _route().CredentialsManager.get().changeMainView(view);

    return view;
  }

}

exports.SelectPlatform = SelectPlatform;

class SelectIosExperience {
  async open(ctx) {
    var _ref;

    const accountName = (_ref = ctx.hasProjectContext ? ctx.manifest.owner : undefined) !== null && _ref !== void 0 ? _ref : ctx.user.username;
    const iosCredentials = await ctx.ios.getAllCredentials(accountName);
    await (0, _list().displayIosCredentials)(iosCredentials);
    const projectSpecificActions = ctx.hasProjectContext ? [{
      value: 'use-existing-push-ios',
      title: 'Use existing Push Notifications Key in current project'
    }, {
      value: 'use-existing-dist-ios',
      title: 'Use existing Distribution Certificate in current project'
    } // {
    //   value: 'current-remove-push-ios',
    //   name: 'Remove Push Notifactions credentials for current project',
    // },
    // {
    //   value: 'current-remove-dist-ios',
    //   name: 'Remove Distribution Certificate for current project',
    // },
    // {
    //   value: 'current-remove-app-ios',
    //   name: 'Remove all credentials for current project',
    // },
    ] : [];
    const {
      action
    } = await (0, _prompts().default)({
      type: 'select',
      name: 'action',
      message: 'What do you want to do?',
      choices: [...projectSpecificActions, {
        value: 'remove-provisioning-profile',
        title: 'Remove Provisioning Profile'
      }, {
        value: 'create-ios-push',
        title: 'Add new Push Notifications Key'
      }, {
        value: 'remove-ios-push',
        title: 'Remove Push Notification credentials'
      }, {
        value: 'update-ios-push',
        title: 'Update Push Notifications Key'
      }, {
        value: 'create-ios-dist',
        title: 'Add new Distribution Certificate'
      }, {
        value: 'remove-ios-dist',
        title: 'Remove Distribution Certificate'
      }, {
        value: 'update-ios-dist',
        title: 'Update Distribution Certificate'
      }],
      optionsPerPage: 20
    });
    return this.handleAction(ctx, accountName, action);
  }

  getAppLookupParamsFromContext(ctx) {
    var _ctx$manifest$ios;

    const projectName = ctx.manifest.slug;
    const accountName = ctx.projectOwner;
    const bundleIdentifier = (_ctx$manifest$ios = ctx.manifest.ios) === null || _ctx$manifest$ios === void 0 ? void 0 : _ctx$manifest$ios.bundleIdentifier;

    if (!bundleIdentifier) {
      throw new Error(`ios.bundleIdentifier need to be defined`);
    }

    return {
      accountName,
      projectName,
      bundleIdentifier
    };
  }

  handleAction(ctx, accountName, action) {
    switch (action) {
      case 'create-ios-push':
        return new (iosPushView().CreateAndAssignIosPush)(accountName);

      case 'update-ios-push':
        return new (iosPushView().UpdateIosPush)(accountName);

      case 'remove-ios-push':
        return new (iosPushView().RemoveIosPush)(accountName);

      case 'create-ios-dist':
        return new (iosDistView().CreateIosDist)(accountName);

      case 'update-ios-dist':
        return new (iosDistView().UpdateIosDist)(accountName);

      case 'remove-ios-dist':
        return new (iosDistView().RemoveIosDist)(accountName);

      case 'use-existing-push-ios':
        {
          const app = this.getAppLookupParamsFromContext(ctx);
          return new (iosPushView().UseExistingPushNotification)(app);
        }

      case 'use-existing-dist-ios':
        {
          const app = this.getAppLookupParamsFromContext(ctx);
          return new (iosDistView().UseExistingDistributionCert)(app);
        }

      case 'remove-provisioning-profile':
        return new (iosProvisionigProfileView().RemoveProvisioningProfile)(accountName);

      default:
        throw new Error('Unknown action selected');
    }
  }

}

exports.SelectIosExperience = SelectIosExperience;

class SelectAndroidExperience {
  constructor() {
    _defineProperty(this, "askAboutProjectMode", true);
  }

  async open(ctx) {
    if (ctx.hasProjectContext && this.askAboutProjectMode) {
      const experienceName = `@${ctx.projectOwner}/${ctx.manifest.slug}`;
      const runProjectContext = await (0, _prompts().confirmAsync)({
        message: `You are currently in a directory with ${experienceName} experience. Do you want to select it?`
      });

      if (runProjectContext) {
        (0, _assert().default)(ctx.manifest.slug, 'app.json slug field must be set');
        const view = new (androidView().ExperienceView)(experienceName);

        _route().CredentialsManager.get().changeMainView(view);

        return view;
      }
    }

    this.askAboutProjectMode = false;
    const credentials = await ctx.android.fetchAll();
    await (0, _list().displayAndroidCredentials)(Object.values(credentials));
    const {
      experienceName
    } = await (0, _prompts().default)({
      type: 'select',
      name: 'experienceName',
      message: 'Select application',
      choices: Object.values(credentials).map(cred => ({
        title: cred.experienceName,
        value: cred.experienceName
      })),
      optionsPerPage: 20
    });
    return new (androidView().ExperienceView)(experienceName);
  }

}

exports.SelectAndroidExperience = SelectAndroidExperience;

class QuitError extends Error {
  constructor() {
    super(); // Set the prototype explicitly.
    // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work

    Object.setPrototypeOf(this, QuitError.prototype);
  }

}

exports.QuitError = QuitError;

class DoQuit {
  async runAsync(mainpage) {
    throw new QuitError();
  }

}

exports.DoQuit = DoQuit;

class AskQuit {
  async runAsync(mainpage) {
    const {
      selected
    } = await (0, _prompts().default)({
      type: 'select',
      name: 'selected',
      message: 'Do you want to quit Credential Manager',
      choices: [{
        value: 'exit',
        title: 'Quit Credential Manager'
      }, {
        value: 'mainpage',
        title: 'Go back to experience overview.'
      }]
    });

    if (selected === 'exit') {
      process.exit(0);
    }

    return mainpage;
  }

}

exports.AskQuit = AskQuit;
//# sourceMappingURL=Select.js.map