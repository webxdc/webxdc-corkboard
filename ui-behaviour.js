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

	AppPayloadIsUpdated (inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('ErrorInputNotValid');
		}

		return inputData.updated === true;
	},

	AppPayloadIsDeleted (inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('ErrorInputNotValid');
		}

		return inputData.msg === '';
	},

	// DATA

	DataPayload (msg, options) {
		return Object.assign({
			guid: Date.now().toString(36),
			author: window.webxdc.selfName,
			address: window.webxdc.selfAddr,
	  }, options, {
	  	msg,
	  });
	},

	// INTERFACE

	InterfaceAdd (inputData) {
		const element = document.createElement(inputData.address === window.webxdc.selfAddr ? 'button' : 'div');
		element.classList.add('AppMessage');
		element.id = inputData.guid;

		if (!window[inputData.address]) {
			const board = document.createElement('div');
			board.classList.add('AppBoard');
			board.id = inputData.address;
			board.innerHTML = `<span class="AppBoardName">${ inputData.author }</span>`;

			window.AppItems.appendChild(board);
		}

		window[inputData.address].appendChild(element);
		
		mod._InterfacePopulate(element, inputData);
	},

	InterfaceUpdate (inputData) {
		mod._InterfacePopulate(window[inputData.guid], inputData);
	},

	_InterfacePopulate (element, payload) {
		element.innerHTML = payload.msg;

		if (payload.address === window.webxdc.selfAddr) {
			element.onclick = function () {
				element.style.display = 'none';

				window[payload.address].classList.add('AppBoardEditing')

				const form = document.createElement('form');
				form.classList.add('AppUpdate');
				form.classList.add('AppMessageForm');
				form.id = element.id + '-form'
				form.innerHTML = `
				<input class="AppMessageUpdateField AppMessageField" type="text" value="${ payload.msg }" autofocus required />
				<input class="AppMessageUpdateButton AppMessageButton" type="submit" value="Update" />`;
				form.onsubmit = function () {
					event.preventDefault();

					const response = document.querySelector(`#${ element.id }-form .AppMessageUpdateField`).value;
					form.remove();

					if (!response.trim().length) {
						return mod.ControlDelete(payload);
					}

					element.style.display = '';

					mod.ControlUpdate(response, payload);
				};

				window[payload.address].insertBefore(form, element.nextElementSibling);
			};
		}

		window[payload.address].insertBefore(element, window[payload.address].childNodes[1]);

		window.AppItems.insertBefore(window[payload.address], window.AppItems.childNodes[0]);
	},

	InterfaceDelete (inputData) {
		window[inputData.guid].remove();

		if (window[inputData.address].childElementCount <= 1) {
			window[inputData.address].remove();
		}
	},

	// CONTROL

	ControlCreate (inputData) {
		if (!inputData.trim().length) {
			return;
		}

		mod._ControlJournal(mod.DataPayload(inputData));

		window.AppCreateField.value = '';
	},

	ControlUpdate (msg, options) {
		mod._ControlJournal(mod.DataPayload(msg, Object.assign(options, {
			updated: true,
		})));
	},

	ControlDelete (inputData) {
		mod._ControlJournal(mod.DataPayload('', inputData));
	},

	_ControlJournal (payload) {
		info = window.webxdc.selfName + ' updated the board';
		window.webxdc.sendUpdate({
	    payload,
	    info,
		}, info);
	},

	// MESSAGE

	MessageDidArrive (inputData) {
		(function(payload) {
			if (mod.AppPayloadIsDeleted(payload)) {
				return mod.InterfaceDelete(payload);
			}

			if (mod.AppPayloadIsUpdated(payload)) {
				return mod.InterfaceUpdate(payload);
			}

			return mod.InterfaceAdd(payload);
		})(inputData.payload);
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
