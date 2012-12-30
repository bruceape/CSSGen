define(['jquery'], function($, CSSObject, PS) {

	'use strict';
	$(document).ready(function() {

		$('.increment').on('touchstart', function(e){
			e.preventDefault();
			var currentDOM = $(this),
				object = currentDOM.data('cssObject'),
				property = currentDOM.data('cssProperty');

			window[object].increment(property);
		});

		$('.decrement').on('touchstart', function(e){
			e.preventDefault();
			var currentDOM = $(this),
				object = currentDOM.data('cssObject'),
				property = currentDOM.data('cssProperty');

			window[object].decrement(property);
		});

		$('.increment').on('mousedown', function(e){
			e.preventDefault();
			var currentDOM = $(this),
				object = currentDOM.data('cssObject'),
				property = currentDOM.data('cssProperty');

			window[object].increment(property);
		});

		$('.decrement').on('mousedown', function(e){
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

		$('.onoff-switch').on('click', function() {
			var object = $(this).data('cssObject');
			window[object].toggleLinked();
		});

		$('.unit-switch').on('click', function() {
			var object = $(this).data('cssObject');
			window[object].toggleUnit();
		});

		$('.inset-switch').on('click', function() {
			var object = $(this).data('cssObject');
			window[object].toggleInset();
		});

		$('.copy-button').on('click', function(e) {
			e.preventDefault();
			$('.copy-field').trigger('click');
		});
	});
});