"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authenticateAsync = authenticateAsync;
exports.getRequestContext = getRequestContext;

function _appleUtils() {
  const data = require("@expo/apple-utils");

  _appleUtils = function () {
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

function _CommandError() {
  const data = require("../CommandError");

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

function _prompts() {
  const data = require("../utils/prompts");

  _prompts = function () {
    return data;
  };

  return data;
}

function _resolveCredentials() {
  const data = require("./resolveCredentials");

  _resolveCredentials = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const APPLE_IN_HOUSE_TEAM_TYPE = 'in-house';

function getRequestContext(authCtx) {
  var _authCtx$authState;

  (0, _assert().default)((_authCtx$authState = authCtx.authState) === null || _authCtx$authState === void 0 ? void 0 : _authCtx$authState.context, 'Apple request context must be defined');
  return authCtx.authState.context;
}

async function loginAsync(userCredentials = {}, options) {
  // First try login with cookies JSON
  if (userCredentials.cookies) {
    const session = await _appleUtils().Auth.loginWithCookiesAsync(userCredentials); // If the session isn't valid, continue to the other authentication methods.
    // Use `loginWithCookiesAsync` for a less resilient flow.

    if (session) {
      return session;
    }
  } // Resolve the user credentials, optimizing for password-less login.


  const {
    username,
    password
  } = await (0, _resolveCredentials().resolveCredentialsAsync)(userCredentials);
  (0, _assert().default)(username); // Clear data

  _appleUtils().Auth.resetInMemoryData();

  try {
    // Attempt to rehydrate the session.
    const restoredSession = await _appleUtils().Auth.tryRestoringAuthStateFromUserCredentialsAsync({
      username,
      providerId: userCredentials.providerId,
      teamId: userCredentials.teamId
    }, options);

    if (restoredSession) {
      // Completed authentication!
      return {
        password,
        ...restoredSession
      };
    }

    return await loginWithUserCredentialsAsync({
      username,
      password,
      providerId: userCredentials.providerId,
      teamId: userCredentials.teamId
    });
  } catch (error) {
    if (error instanceof _appleUtils().InvalidUserCredentialsError) {
      _log().default.error(error.message); // Remove the invalid password so it isn't automatically used...


      await (0, _resolveCredentials().deletePasswordAsync)({
        username
      });

      if (await (0, _prompts().toggleConfirmAsync)({
        message: 'Would you like to try again?'
      })) {
        // Don't pass credentials back or the method will throw
        return loginAsync({
          teamId: userCredentials.teamId,
          providerId: userCredentials.providerId
        }, options);
      } else {
        throw new (_CommandError().AbortCommandError)();
      }
    }

    throw error;
  }
}

async function loginWithUserCredentialsAsync({
  username,
  password,
  teamId,
  providerId
}) {
  // Start a new login flow
  const newSession = await _appleUtils().Auth.loginWithUserCredentialsAsync({
    username,
    // If the session couldn't be restored, then prompt for the password (also check if it's stored in the keychain).
    password: password || (await (0, _resolveCredentials().promptPasswordAsync)({
      username
    })),
    providerId,
    teamId
  }); // User cancelled or something.

  (0, _assert().default)(newSession, 'An unexpected error occurred while completing authentication'); // Success!

  return newSession;
}

async function authenticateAsync(options = {}) {
  // help keep apple login visually apart from the other operations.
  _log().default.addNewLineIfNone();

  try {
    const authState = await loginAsync({
      username: options.appleId,
      cookies: options.cookies,
      teamId: options.teamId
    }, {
      // TODO: Provide a way to disable this for users who want to mix and match teams / providers.
      autoResolveProvider: true
    }); // Currently, this is resolved once, inside the apple-utils package.

    const teamId = authState.context.teamId; // Get all of the teams to resolve the rest of the user data.
    // TODO: optimize this step.

    const teams = await _appleUtils().Teams.getTeamsAsync();
    const team = teams.find(team => team.teamId === teamId);
    (0, _assert().default)(team, `Your account is not associated with Apple Team with ID: ${teamId}`); // Get the JSON cookies in the custom YAML format used by Fastlane

    const fastlaneSession = _appleUtils().Session.getSessionAsYAML();

    return {
      appleId: authState.username,
      appleIdPassword: authState.password,
      team: formatTeam(team),
      // Can be used to restore the auth state using apple-utils.
      authState,
      // Defined for legacy usage in Turtle V1 or any other places where Fastlane is used in the servers.
      fastlaneSession
    };
  } catch (error) {
    if (error.message === 'ABORTED') {
      process.exit(1);
    }

    _log().default.log(_chalk().default.red('Authentication with Apple Developer Portal failed!'));

    throw error;
  }
}

function formatTeam({
  teamId,
  name,
  type
}) {
  return {
    id: teamId,
    name: `${name} (${type})`,
    inHouse: type.toLowerCase() === APPLE_IN_HOUSE_TEAM_TYPE
  };
}
//# sourceMappingURL=authenticate.js.map