const mod = {

	OLSKControllerRoutes () {
		return [{
			OLSKRoutePath: '/#name=MainDevice&addr=MainDevice@local.host',
			OLSKRouteMethod: 'get',
			OLSKRouteSignature: 'AppMainRoute',
			OLSKRouteFunction (req, res, next) {
				return res.render(require('path').join(__dirname, 'index.html'));
			},
		}, {
			OLSKRoutePath: '/#name=PeerDevice&addr=PeerDevice@local.host',
			OLSKRouteMethod: 'get',
			OLSKRouteSignature: 'AppPeerRoute',
			OLSKRouteFunction (req, res, next) {
				return res.render(require('path').join(__dirname, 'index.html'));
			},
		}];
	},

	// VALUE

	ValueMessagesAdd (inputData) {
		mod.InterfaceMessageAdd(inputData);
	},

	// INTERFACE

	InterfaceMessageAdd (inputData) {
		const element = document.createElement('div');
		element.classList.add('AppMessage');
		element.innerHTML = inputData.msg;
		window.AppBoard.appendChild(element);
	},

	// CONTROL

	ControlCreate (inputData) {
		if (!inputData.trim().length) {
			return;
		}

		mod._ControlSend({
			guid: Date.now().toString(36),
			author: window.webxdc.selfName,
			address: window.webxdc.selfAddr,
	    msg: inputData,
	  });

		window.AppCreateField.value = '';
	},

	_ControlSend (payload) {
		info = window.webxdc.selfName + ' updated the board';
		window.webxdc.sendUpdate({
	    payload,
	    info,
		}, info);
	},

	// MESSAGE

	MessageDidArrive (inputData) {
		mod.ValueMessagesAdd(inputData.payload);
	},

	// SETUP

	_SetupMethods () {
		return Object.keys(mod).filter(function (e) {
			return e.match(/^Setup/);
		});
	},

	SetupListener () {
		window.webxdc.setUpdateListener(mod.MessageDidArrive);
	},

	SetupIdentity() {
		window.AppIdentity.innerHTML = 'this is ' + window.webxdc.selfName;
	},

	// LIFECYCLE

	LifecyclePageDidLoad () {
		return mod._SetupMethods().forEach(function (e) {
			return mod[e]();
		});
	},
};

if (typeof module !== 'undefined') {
	module.exports = mod;
}

AppBehaviour = mod;
