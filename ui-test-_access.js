const kDefaultRoute = require('./ui-behaviour.js').OLSKControllerRoutes().shift();

Object.entries({
	AppHeading: '.AppHeading',
	AppCreate: '.AppCreate',
	AppCreateField: '#AppCreateField',
	AppCreateButton: '.AppCreateButton',
	AppItems: '#AppItems',
	AppBoard: '.AppBoard',
	AppBoardName: '.AppBoardName',
	AppMessage: '.AppMessage',
	AppMessageUpdateField: '.AppMessageUpdateField',
	AppMessageUpdateButton: '.AppMessageUpdateButton',
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

	it('shows AppItems', function () {
		browser.assert.elements(AppItems, 1);
	});

	it('hides AppBoard', function () {
		browser.assert.elements(AppBoard, 0);
	});

	it('hides AppBoardName', function () {
		browser.assert.elements(AppBoardName, 0);
	});

	it('hides AppMessage', function () {
		browser.assert.elements(AppMessage, 0);
	});

	it('hides AppMessageUpdateField', function() {
		browser.assert.elements(AppMessageUpdateField, 0);
	});

	it('hides AppMessageUpdateButton', function () {
		browser.assert.elements(AppMessageUpdateButton, 0);
	});

	it('shows AppIdentity', function () {
		browser.assert.elements(AppIdentity, 1);
	});

	context('submit empty', function () {

		before(function () {
			return browser.click(AppCreateButton);
		});

		it('hides AppBoard', function () {
			browser.assert.elements(AppBoard, 0);
		});

		it('hides AppBoardName', function () {
			browser.assert.elements(AppBoardName, 0);
		});
		
		it('hides AppMessage', function () {
			browser.assert.elements(AppMessage, 0);
		});

		it('hides AppMessageUpdateField', function() {
			browser.assert.elements(AppMessageUpdateField, 0);
		});

		it('hides AppMessageUpdateButton', function () {
			browser.assert.elements(AppMessageUpdateButton, 0);
		});
	
	});

	context('submit filled', function () {

		before(function () {
			return browser.fill(AppCreateField, Math.random().toString());
		});
		
		before(function () {
			return browser.click(AppCreateButton);
		});

		it('shows AppBoard', function () {
			browser.assert.elements(AppBoard, 1);
		});

		it('shows AppBoardName', function () {
			browser.assert.elements(AppBoardName, 1);
		});

		it('shows AppMessage', function () {
			browser.assert.elements(AppMessage, 1);
		});

		it('hides AppMessageUpdateField', function() {
			browser.assert.elements(AppMessageUpdateField, 0);
		});

		it('hides AppMessageUpdateButton', function () {
			browser.assert.elements(AppMessageUpdateButton, 0);
		});
	
	});

	context('edit', function () {

		before(function () {
			return browser.click(AppMessage);
		});
		
		it('shows AppMessage', function () {
			browser.assert.elements(AppMessage, 1);
		});

		it('shows AppMessageUpdateField', function() {
			browser.assert.elements(AppMessageUpdateField, 1);
		});

		it('shows AppMessageUpdateButton', function () {
			browser.assert.elements(AppMessageUpdateButton, 1);
		});
	
	});

	context('edit empty', function () {

		before(function () {
			return browser.fill(AppMessageUpdateField, '');
		});
		
		before(function () {
			return browser.click(AppMessageUpdateButton);
		});

		it('hides AppBoardName', function () {
			browser.assert.elements(AppBoardName, 0);
		});

		it('hides AppBoard', function () {
			browser.assert.elements(AppBoard, 0);
		});

		it('hides AppMessage', function () {
			browser.assert.elements(AppMessage, 0);
		});

		it('hides AppMessageUpdateField', function() {
			browser.assert.elements(AppMessageUpdateField, 0);
		});

		it('hides AppMessageUpdateButton', function () {
			browser.assert.elements(AppMessageUpdateButton, 0);
		});
	
	});

	after(function () {
		return browser.evaluate('window.clearXdcStorage()');
	});
	
});
