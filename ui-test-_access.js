const kDefaultRoute = require('./ui-behaviour.js').OLSKControllerRoutes().shift();

Object.entries({
	AppHeading: '.AppHeading',
	AppCreateButton: '.AppCreateButton',
	AppItems: '#AppItems',
	AppBoard: '.AppBoard',
	AppBoardName: '.AppBoardName',
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
	
	});

	context('submit filled', function () {

		before(function () {
			return browser.OLSKPrompt(function () {
				return browser.click(AppCreateButton);
			}, function (dialog) {
				return Object.assign(dialog, {
					response: Math.random().toString(),
				});
			});
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
	
	});

	context('edit empty', function () {

		before(function () {
			return browser.OLSKPrompt(function () {
				return browser.click(AppMessage);
			}, function (dialog) {
				return Object.assign(dialog, {
					response: '',
				});
			});
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
	
	});

	after(function () {
		return browser.evaluate('window.clearXdcStorage()');
	});
	
});
