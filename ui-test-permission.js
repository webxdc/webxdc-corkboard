const kDefaultRoute = require('./ui-behaviour.js').OLSKControllerRoutes().shift();

describe('APRVitrine_Permission', function () {
	
	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	context('self', function () {
		
		before(function () {
			return browser.OLSKPrompt(function () {
				return browser.click(AppCreateButton);
			}, function (dialog) {
				return Object.assign(dialog, {
					response: Math.random().toString(),
				});
			});
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
