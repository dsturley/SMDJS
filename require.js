/*jslint browser:true*/
(function (context) {
	'use strict';

	var LEADING_DOTSLASH = /^\.\//;

	/**
	 * Trimmed-down CommonJS module for _importing/exporting_ modules.
	 *
	 * @param  {String} name The name of the module
	 * @return {Object}      The module's exports
	 */
	function require(name) {
		name = name.replace(LEADING_DOTSLASH, '');

		var mod = require.modules[name];

		if (!mod) {
			throw new Error('require: failed to require `' + name + '`');
		}

		if (!mod.exports) {
			mod.exports = {};
			// @todo pass in module
			// @todo require.main ?
			mod(require, mod.exports);
		}

		return mod.exports;

	}

	/**
	 * Namespace for all modules
	 * @type {Object}
	 */
	require.modules = {};

	/**
	 * Register/define a module
	 *
	 * @param  {String}    name The module's name
	 * @param  {Mixed|Any} mod  The module
	 */
	function define(name, mod) {
		if (typeof name === 'function') {
			return name(require, {}, {});
		}
		name = name.replace(LEADING_DOTSLASH, '');
		require.modules[name] = mod;
	}

	context.define = define;


}(this));