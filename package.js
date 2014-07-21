Package.describe ({
  name: 'layer-methods',
  summary: 'A collection of server side methods for interacting with layer.com services.'
});

Npm.depends ({
  'fibers':'1.0.1'
});

Package.on_use (function (api) {
  /* Use or imply other packages.

   * Example:
   *  api.use('ui', 'client');
   *  api.use('iron-router', ['client', 'server']);
   */

  /*
   * Add files that should be used with this
   * package.
   */
  api.add_files ('layer-methods.js', ['server']);
  api.add_files ('server/methods/createUser.js', ['server']);
  api.add_files ('server/methods/deleteUser.js', ['server']);

  /*
   * Export global symbols.
   *
   * Example:
   *  api.export('GlobalSymbol');
   */
  api.export ('LayerApi');
});

Package.on_test (function (api) {
  api.use ('layer-methods');
  api.use ('tinytest');

  api.add_files ('layer-methods_tests.js');
});
