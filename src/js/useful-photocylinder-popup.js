/*
	Source:
	van Creij, Maurice (2018). "useful-photocylinder.js: Displays a cylindrical projection of a panoramic image.", version 20180102, http://www.woollymittens.nl/.

	License:
	This work is licensed under a Creative Commons Attribution 3.0 Unported License.
*/

// create the constructor if needed
var useful = useful || {};
useful.Photocylinder = useful.Photocylinder || function() {};

// extend the constructor
useful.Photocylinder.prototype.Popup = function(parent) {

	"use strict";

	// PROPERTIES

	this.parent = parent;
	this.config = parent.config;

	// METHODS

	this.show = function() {
		var config = this.config;
		// if the popup doesn't exist
		if (!config.popup) {
			// create a container for the popup
			config.popup = document.createElement('figure');
			config.popup.className = (config.container === document.body)
				? 'photocylinder-popup photocylinder-popup-fixed photocylinder-popup-passive'
				: 'photocylinder-popup photocylinder-popup-passive';
			// add a close gadget
			this.addCloser();
			// add a locator gadget
			this.addLocator();
			// add the popup to the document
			config.container.appendChild(config.popup);
			// reveal the popup when ready
			setTimeout(this.onShow.bind(this), 0);
		}
	};

	this.hide = function() {
		var config = this.config;
		// if there is a popup
		if (config.popup) {
			// unreveal the popup
			config.popup.className = config.popup.className.replace(/-active/gi, '-passive');
			// and after a while
			var _this = this;
			setTimeout(function() {
				// remove it
				config.container.removeChild(config.popup);
				// remove its reference
				config.popup = null;
				// ask the parent to self destruct
				_this.parent.destroy();
			}, 500);
		}
	};

	this.addCloser = function() {
		var config = this.config;
		// build a close gadget
		var closer = document.createElement('a');
		closer.className = 'photocylinder-closer';
		closer.innerHTML = 'x';
		closer.href = '#close';
		// add the close event handler
		closer.addEventListener('click', this.onHide.bind(this));
		closer.addEventListener('touchstart', this.onHide.bind(this));
		// add the close gadget to the image
		config.popup.appendChild(closer);
	};

	this.addLocator = function(url) {
		var config = this.config;
		// only add if a handler was specified
		if (config.located) {
			// build the geo marker icon
			var locator = document.createElement('a');
			locator.className = 'photocylinder-locator';
			locator.innerHTML = 'Show on a map';
			locator.href = '#map';
			// add the event handler
			locator.addEventListener('click', this.onLocate.bind(this));
			locator.addEventListener('touchstart', this.onLocate.bind(this));
			// add the location marker to the image
			config.popup.appendChild(locator);
		}
	};

	// EVENTS

	this.onShow = function() {
		var config = this.config;
		// show the popup
		config.popup.className = config.popup.className.replace(/-passive/gi, '-active');
		// trigger the closed event if available
		if (config.opened) {
			config.opened(config.element);
		}
	};

	this.onHide = function(evt) {
		var config = this.config;
		// cancel the click
		evt.preventDefault();
		// close the popup
		this.hide();
		// trigger the closed event if available
		if (config.closed) {
			config.closed(config.element);
		}
	};

	this.onLocate = function(evt) {
		var config = this.config;
		// cancel the click
		evt.preventDefault();
		// trigger the located event if available
		if (config.located) {
			config.located(config.element);
		}
	};

};

// return as a require.js module
if (typeof module !== 'undefined') {
	exports = module.exports = useful.Photocylinder.Popup;
}
