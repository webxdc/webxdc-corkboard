const kDefaultRoute = require('./ui-behaviour.js').OLSKControllerRoutes().shift();

Object.entries({
	AppHeading: '.AppHeading',
	AppCreateField: '#AppCreateField',
	AppCreateButton: '.AppCreateButton',
	AppMessage: '.AppMessage',
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

	it('hides AppMessage', function () {
		browser.assert.elements(AppMessage, 0);
	});

	it('shows AppIdentity', function () {
		browser.assert.elements(AppIdentity, 1);
	});

	context('submit empty', function () {

		before(function () {
			return browser.click(AppCreateButton);
		});
		
		it('hides AppMessage', function () {
			browser.assert.elements(AppMessage, 0);
		});
	
	});

	context('submit filled', function () {

		before(function () {
			return browser.fill(AppCreateField, Math.random().toString());
		});
		
		before(function () {
			return browser.click(AppCreateButton);
		});
		
		it('shows AppMessage', function () {
			browser.assert.elements(AppMessage, 1);
		});
	
	});
	
});
