const mod = {

	OLSKControllerRoutes () {
		return [{
			OLSKRoutePath: '/#name=MainDevice&addr=MainDevice@local.host',
			OLSKRouteMethod: 'get',
			OLSKRouteSignature: 'AppMainRoute',
			OLSKRouteFunction (req, res, next) {
				return res.render(require('path').join(__dirname, 'index.html'));
			},
		}];
	},

	// VALUE

	ValueMessagesAdd (inputData) {
		const target = document.createElement('div');
		target.classList.add('AppMessage')
		target.innerHTML = inputData.msg;
		window.AppBoard.appendChild(target);
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
		info = window.webxdc.selfName + ' updated the bulletin';
		window.webxdc.sendUpdate({
	    payload,
	    info,
		}, info);
	},

	// MESSAGE

	MessageDidArrive (inputData) {
		mod.ValueMessagesAdd(inputData);
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
