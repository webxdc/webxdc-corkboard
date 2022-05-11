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
	const itemUpdate = Math.random().toString();

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
		
		before(function () {
			return browser.OLSKPrompt(function () {
				return browser.click(`${ AppMessage }:nth-of-type(2)`);
			}, function (dialog) {
				return Object.assign(dialog, {
					response: itemUpdate,
				});
			});
		});

		it('places recent at the top', function () {
			browser.assert.text(AppMessage, [itemUpdate, items[0], items[2]].join(''));
		});
	
	});

	context('alternate board update', function () {

		const item = Math.random().toString();
		
		before(function() {
			return browser.OLSKVisit(require('./ui-behaviour.js').OLSKControllerRoutes().pop());
		});

		before(function () {
			return browser.OLSKPrompt(function () {
				return browser.click(AppCreateButton);
			}, function (dialog) {
				return Object.assign(dialog, {
					response: item,
				});
			});
		});

		it('places recent at the top', function () {
			browser.assert.text(`${ AppMessage }:nth-of-type(1)`, [item, itemUpdate].join
				(''));
		});
	
	});
	
});
