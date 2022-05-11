const kDefaultRoute = require('./ui-behaviour.js').OLSKControllerRoutes().pop();

Object.entries({
	AppHeading: '.AppHeading',
	AppCreateField: '#AppCreateField',
	AppCreateButton: '.AppCreateButton',
	AppIdentity: '#AppIdentity',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('APRVitrine_Access', function () {
	
	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('shows AppHeading', function () {
		browser.assert.elements(AppHeading, 1);
	});

	it('shows AppCreateField', function() {
		browser.assert.elements(AppCreateField, 1);
	});

	it('shows AppCreateButton', function () {
		browser.assert.elements(AppCreateButton, 1);
	});

	it('shows AppIdentity', function () {
		browser.assert.elements(AppIdentity, 1);
	});
	
});
