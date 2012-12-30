define(['jquery','css-object', 'pubsub'], function($, CSSObject, PS) {
	'use strict';
	
	var borderRadius = new CSSObject('borderRadius', {
		topLeft: 0,
		topRight: 0,
		bottomLeft: 0,
		bottomRight: 0,
		linked: false,
		units: 'pixels',
		theCss: function(){
			var unit;
			if (this.units === 'pixels') {
				unit = 'px';
			} else if (this.units === 'percent') {
				unit = '%';
			}
			if (this.linked === true) {
				return this.topLeft + unit;
			} else {
				return this.topLeft + unit + ' ' + this.topRight + unit + ' ' + this.bottomRight + unit + ' ' + this.bottomLeft + unit;
			}
		}
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

	$('.onoff-switch').on('click', function() {
		var object = $(this).data('cssObject');
		window[object].toggleLinked();
	});

	$('.unit-switch').on('click', function() {
		var object = $(this).data('cssObject');
		window[object].toggleUnit();
	});

	$('.copy-button').on('mousedown', function(e) {
		e.preventDefault();
		$('.copy-field').trigger('click');
	});

	PS.subscribe('borderRadiusChange', function() {
		var output = '/* This is the CSS we\'re working with! */ \r\n\r\n';

		if (borderRadius.linked === true) {
			borderRadius.topRight = borderRadius.topLeft;
			borderRadius.bottomRight = borderRadius.topLeft;
			borderRadius.bottomLeft = borderRadius.topLeft;

			$('.increment:not(#br-tl-increment)').addClass('disabled-increment');
			$('.decrement:not(#br-tl-decrement)').addClass('disabled-decrement');
			$('.field:not(#br-tl-field)').addClass('disabled-field').prop('disabled', true);

		} else {
			$('.increment:not(#br-tl-increment)').removeClass('disabled-increment');
			$('.decrement:not(#br-tl-decrement)').removeClass('disabled-decrement');
			$('.field:not(#br-tl-field)').removeClass('disabled-field').prop('disabled', false);
		}

		//update values
		$('.field').val(function(){
			var currentDOM = $(this),
				object = currentDOM.data('cssObject'),
				property = currentDOM.data('cssProperty');
			return window[object][property];
		});
		
		//update demo object
		$('#br-preview').css('border-radius', borderRadius.theCss());

		//update copy object
		output += 'border-radius: ' + borderRadius.theCss() + ';\r\n';
		$('#br-code').val(output);

	});

	return borderRadius;
});

