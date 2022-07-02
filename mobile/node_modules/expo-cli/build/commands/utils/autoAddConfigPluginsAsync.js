"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.autoAddConfigPluginsAsync = autoAddConfigPluginsAsync;
exports.getNamedPlugins = getNamedPlugins;

function _pluginResolver() {
  const data = require("@expo/config-plugins/build/utils/plugin-resolver");

  _pluginResolver = function () {
    return data;
  };

  return data;
}

function _prebuildConfig() {
  const data = require("@expo/prebuild-config");

  _prebuildConfig = function () {
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

function _modifyConfigAsync() {
  const data = require("./modifyConfigAsync");

  _modifyConfigAsync = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Resolve if a package has a config plugin.
 * For sanity, we'll only support config plugins that use the `app.config.js` entry file,
 * this is because a package like `lodash` could be a "valid" config plugin and break the prebuild process.
 *
 * @param projectRoot
 * @param packageName
 * @returns
 */
function packageHasConfigPlugin(projectRoot, packageName) {
  try {
    const info = (0, _pluginResolver().resolveConfigPluginFunctionWithInfo)(projectRoot, packageName);

    if (info.isPluginFile) {
      return info.plugin;
    }
  } catch {}

  return false;
}

function getNamedPlugins(plugins) {
  const namedPlugins = [];

  for (const plugin of plugins) {
    try {
      // @ts-ignore
      const [normal] = (0, _pluginResolver().normalizeStaticPlugin)(plugin);

      if (typeof normal === 'string') {
        namedPlugins.push(normal);
      }
    } catch {// ignore assertions
    }
  }

  return namedPlugins;
}

const autoPlugins = (0, _prebuildConfig().getAutoPlugins)();

async function autoAddConfigPluginsAsync(projectRoot, exp, packages) {
  _log().default.debug('Checking config plugins...');

  const currentPlugins = exp.plugins || [];
  const normalized = getNamedPlugins(currentPlugins);

  _log().default.debug(`Existing plugins: ${normalized.join(', ')}`);

  const plugins = packages.filter(pkg => {
    if (normalized.includes(pkg)) {
      // already included in plugins array
      return false;
    } // Check if the package has a valid plugin. Must be a well-made plugin for it to work with this.


    const plugin = packageHasConfigPlugin(projectRoot, pkg);

    _log().default.debug(`Package "${pkg}" has plugin: ${!!plugin}` + (plugin ? ` (args: ${plugin.length})` : ''));

    if (autoPlugins.includes(pkg)) {
      _log().default.debug(`Package "${pkg}" is an auto plugin, skipping...`);

      return false;
    }

    return !!plugin;
  });
  await (0, _modifyConfigAsync().attemptAddingPluginsAsync)(projectRoot, exp, plugins);
}
//# sourceMappingURL=autoAddConfigPluginsAsync.js.map