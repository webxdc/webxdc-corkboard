const kDefaultRoute = require('./ui-behaviour.js').OLSKControllerRoutes().shift();

describe('APRVitrine_Order', function () {
	
	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	const items = [
		Math.random().toString(),
		Math.random().toString(),
		Math.random().toString(),
	];

	context('create', function () {
		
		items.forEach(function (response) {
			
			before(function () {
				return browser.OLSKPrompt(function () {
					return browser.click(AppCreateButton);
				}, function (dialog) {
					return Object.assign(dialog, {
						response,
					});
				});
			});

		});

		it('places recent at the top', function () {
			browser.assert.text(AppMessage, items.reverse().join(''));
		});
	
	});

	context('update', function () {

		const item = Math.random().toString();
		
		before(function () {
			return browser.OLSKPrompt(function () {
				return browser.click(`${ AppMessage }:nth-child(2)`);
			}, function (dialog) {
				return Object.assign(dialog, {
					response: item,
				});
			});
		});

		it('places recent at the top', function () {
			browser.assert.text(AppMessage, [item, items[0], items[2]].join(''));
		});
	
	});
	
});
