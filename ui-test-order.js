const kDefaultRoute = require('./ui-behaviour.js').OLSKControllerRoutes().shift();

describe('AppMain_Order', function () {
	
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
				return browser.click(AppCreateButton);
			});

			before(function () {
				return browser.fill(AppCreateField, response);
			});
			
			before(function () {
				return browser.click(AppCreateButton);
			});

		});

		it('places recent at the top', function () {
			browser.assert.text(AppMessage, items.reverse().join(''));
		});
	
	});

	context('update', function () {

		before(function () {
			return browser.click(`${ AppMessage }:nth-of-type(2)`);
		});
		
		before(function () {
			return browser.fill(AppMessageUpdateField, itemUpdate);
		});
		
		before(function () {
			return browser.click(AppMessageUpdateButton);
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
			return browser.click(AppCreateButton);
		});

		before(function () {
			return browser.fill(AppCreateField, item);
		});
		
		before(function () {
			return browser.click(AppCreateButton);
		});

		it('places recent at the top', function () {
			browser.assert.text(`${ AppMessage }:nth-of-type(1)`, [item, itemUpdate].join
				(''));
		});
	
	});
	
});
