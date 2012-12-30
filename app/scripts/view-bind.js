define(['jquery'], function($, CSSObject, PS) {

	'use strict';
	$(document).ready(function() {
		var isTouchSupported = 'ontouchstart' in window,
			startEvent = isTouchSupported ? 'touchstart' : 'mousedown',
			moveEvent = isTouchSupported ? 'touchmove' : 'mousemove',
			endEvent = isTouchSupported ? 'touchend' : 'mouseup';

		$('.increment').on(endEvent, function(e){
			e.preventDefault();
			var currentDOM = $(this),
				object = currentDOM.data('cssObject'),
				property = currentDOM.data('cssProperty');

			window[object].increment(property);
		});

		$('.decrement').on(endEvent, function(e){
			e.preventDefault();
			var currentDOM = $(this),
				object = currentDOM.data('cssObject'),
				property = currentDOM.data('cssProperty');

			window[object].decrement(property);
		});

		$('.field').on('input', function() {
			var currentDOM = $(this),
				object = currentDOM.data('cssObject'),
				property = currentDOM.data('cssProperty');

			window[object].set(property, currentDOM.val());
		});

		$('.slider').on('change', function() {
			var currentDOM = $(this),
				object = currentDOM.data('cssObject'),
				property = currentDOM.data('cssProperty');

			window[object].set(property, currentDOM.val());
		});

		$('.onoff-switch').on(startEvent, function() {
			var object = $(this).data('cssObject');
			window[object].toggleLinked();
		});

		$('.unit-switch').on(startEvent, function() {
			var object = $(this).data('cssObject');
			window[object].toggleUnit();
		});

		$('.inset-switch').on(startEvent, function() {
			var object = $(this).data('cssObject');
			window[object].toggleInset();
		});

		$('.copy-button').on(startEvent, function(e) {
			e.preventDefault();
			$('.copy-field').trigger('click');
		});
	});
});