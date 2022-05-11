const kDefaultRoute = require('./ui-behaviour.js').OLSKControllerRoutes().pop();

describe('APRVitrine_Misc', function () {
	
	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('sets lang', function() {
		browser.assert.attribute('html', 'lang', 'en');
	});

	it('sets title', function() {
		browser.assert.text('title', 'webxdc-bulletin');
	});

	it('sets encoding', function () {
		browser.assert.attribute('meta[http-equiv="Content-Type"]', 'content', 'text/html; charset=utf-8');
	});

	it('sets viewport', function () {
		browser.assert.attribute('meta[name="viewport"]', 'content', 'width=device-width');
	});

	describe('AppHeading', function test_AppHeading () {
		
		it('sets text', function () {
			browser.assert.text(AppHeading, 'webxdc-bulletin');
		});
		
	});

	describe('AppCreateField', function test_AppCreateField () {
		
		it('sets type', function () {
			browser.assert.attribute(AppCreateField, 'type', 'text');
		});
		
		it('sets placeholder', function () {
			browser.assert.attribute(AppCreateField, 'placeholder', 'Message');
		});
		
		it('sets autofocus', function () {
			browser.assert.attribute(AppCreateField, 'autofocus', '');
		});
		
	});

	describe('AppCreateButton', function test_AppCreateButton () {
		
		it('sets type', function () {
			browser.assert.attribute(AppCreateButton, 'type', 'submit');
		});
		
		it('sets value', function () {
			browser.assert.attribute(AppCreateButton, 'value', 'Create');
		});
		
	});

	describe('AppIdentity', function test_AppIdentity () {
		
		it('sets value', function () {
			browser.assert.text(AppIdentity, 'this is device0');
		});
		
	});
	
});
