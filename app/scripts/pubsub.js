define(['jquery'], function($) {
	'use strict';
	
	var o = $({});

	$.publish = function(){
		o.trigger.apply(o, arguments);
	};

	$.subscribe = function(){
		o.on.apply(o, arguments);
	};

	$.unsubscribe = function() {
		o.off.apply(o, arguments);
	};

	return $;
});