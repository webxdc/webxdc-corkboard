const kDefaultRoute = require('./ui-behaviour.js').OLSKControllerRoutes().shift();

describe('AppMain_Permission', function () {
	
	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	context('self', function () {
		
		before(function () {
			return browser.click(AppCreateButton);
		});

		before(function () {
			return browser.fill(AppCreateField, Math.random().toString());
		});
		
		before(function () {
			return browser.click(AppCreateButton);
		});

		it('creates button', function () {
			browser.assert.deepEqual(browser.query(AppMessage).tagName, 'BUTTON');
		});

	});

	context('other', function () {
		
		before(function() {
			return browser.OLSKVisit(require('./ui-behaviour.js').OLSKControllerRoutes().pop());
		});

		it('creates button', function () {
			browser.assert.deepEqual(browser.query(AppMessage).tagName, 'DIV');
		});

	});
	
});
