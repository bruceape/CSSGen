define(['jquery'], function($) {
	'use strict';

	$(document).ready(function(){
		var isTouchSupported = 'ontouchstart' in window,
			startEvent = isTouchSupported ? 'touchstart' : 'mousedown',
			moveEvent = isTouchSupported ? 'touchmove' : 'mousemove',
			endEvent = isTouchSupported ? 'touchend' : 'mouseup';

		$('.snippet-header').on(endEvent, function(){
			$(this).next().slideToggle();
		});

		$('.copy-link').on(endEvent, function(){
			$(this).next().trigger('click');
		});
	});
});
