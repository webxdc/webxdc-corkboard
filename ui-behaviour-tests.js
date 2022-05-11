const { throws, rejects, deepEqual } = require('assert');

const mod = require('./ui-behaviour.js');

describe('AppPayloadIsDeleted', function test_AppPayloadIsDeleted() {

	it('throws if not object', function () {
		throws(function () {
			mod.AppPayloadIsDeleted(null);
		}, /ErrorInputNotValid/);
	});

	it('returns false', function () {
		deepEqual(mod.AppPayloadIsDeleted({}), false);
	});

	it('returns true if msg empty', function () {
		deepEqual(mod.AppPayloadIsDeleted({
			msg: ''
		}), true);
	});

});
