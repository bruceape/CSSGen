define(['jquery', 'pubsub'], function($, PS) {
	'use strict';
	
	var CSSObject = function(newName, properties){
		if ( this instanceof CSSObject ) {
			this.name = newName;
			for (var property in properties) {
			this[property] = properties[property];
			}
			return this;
		} else {
			throw {name: 'Problem', message: 'Probably did not use "new"'};
		}
	};

	CSSObject.prototype.increment = function(prop) {
		this[prop]++;
		PS.publish(this.name + 'Change');
		return this;
	};

	CSSObject.prototype.decrement = function(prop) {
		this[prop]--;
		PS.publish(this.name + 'Change');
		return this;
	};

	CSSObject.prototype.toggleInset = function() {
		if (this.inset === false) {
			this.inset = true;
		} else if (this.inset === true) {
			this.inset = false;
		}
		PS.publish(this.name + 'Change');
		PS.publish('insetToggle');
		return this;
	};

	CSSObject.prototype.toggleUnit = function() {
		if (this.units === 'pixels') {
			this.units = 'percent';
		} else if (this.units === 'percent') {
			this.units = 'pixels';
		}
		PS.publish(this.name + 'Change');
		PS.publish('unitsToggle');
		return this;
	};

	CSSObject.prototype.toggleLinked = function() {
		if (this.linked === true) {
			this.linked = false;
		} else if (this.linked === false) {
			this.linked = true;
		}
		PS.publish(this.name + 'Change');
		PS.publish('linkedToggle');
		return this;
	};

	CSSObject.prototype.set = function(prop, value) {
		this[prop] = value;
		PS.publish(this.name + 'Change');
		return this;
	};

	return CSSObject;
});
