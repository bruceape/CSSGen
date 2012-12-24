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

	$('#br-tr-increment').on('mousedown', function(e) {
		e.preventDefault();
		borderRadius.increment('topRight');
	});
	$('#br-br-increment').on('mousedown', function(e) {
		e.preventDefault();
		borderRadius.increment('bottomRight');
	});
	$('#br-tl-increment').on('mousedown', function(e) {
		e.preventDefault();
		borderRadius.increment('topLeft');
	});
	$('#br-bl-increment').on('mousedown', function(e) {
		e.preventDefault();
		borderRadius.increment('bottomLeft');
	});

	$('#br-tr-decrement').on('mousedown', function(e) {
		e.preventDefault();
		borderRadius.decrement('topRight');
	});
	$('#br-br-decrement').on('mousedown', function(e) {
		e.preventDefault();
		borderRadius.decrement('bottomRight');
	});
	$('#br-tl-decrement').on('mousedown', function(e) {
		e.preventDefault();
		borderRadius.decrement('topLeft');
	});
	$('#br-bl-decrement').on('mousedown', function(e) {
		e.preventDefault();
		borderRadius.decrement('bottomLeft');
	});

	$('#br-tl-field').on('input', function() {
		borderRadius.set('topLeft', $('#br-tl-field').val());
	});
	$('#br-bl-field').on('input', function() {
		borderRadius.set('bottomLeft', $('#br-bl-field').val());
	});
	$('#br-tr-field').on('input', function() {
		borderRadius.set('topRight', $('#br-tr-field').val());
	});
	$('#br-br-field').on('input', function() {
		borderRadius.set('bottomRight', $('#br-br-field').val());
	});

	$('#br-unittoggle').on('click', function() {
		borderRadius.toggleUnit();

	});
	$('#br-linked').on('click', function() {
		borderRadius.toggleLinked();
	});

	$('#br-copy-button').on('mousedown', function(e) {
		e.preventDefault();
		var offset = $('#br-code').offset();
		$('#br-code').select();
		$('#copy-helper').css({
			left: offset.left,
			top: offset.top
		}).clearQueue().stop().fadeIn().delay(1000).fadeOut(200);
	});
	$('#br-code').on('click', function() {
		$(this).select();
		var offset = $(this).offset();
		$('#copy-helper').css({
			left: offset.left,
			top: offset.top
		}).clearQueue().stop().fadeIn().delay(1000).fadeOut(200);
	});

	PS.subscribe('borderRadiusChange', function() {
		var output = '/* This is the CSS we\'re working with! */ \r\n\r\n';

		if (borderRadius.linked === true) {
			borderRadius.topRight = borderRadius.topLeft;
			borderRadius.bottomRight = borderRadius.topLeft;
			borderRadius.bottomLeft = borderRadius.topLeft;

			$('#br-tr-decrement').addClass('disabled-decrement');
			$('#br-br-decrement').addClass('disabled-decrement');
			$('#br-bl-decrement').addClass('disabled-decrement');
			$('#br-tr-increment').addClass('disabled-increment');
			$('#br-br-increment').addClass('disabled-increment');
			$('#br-bl-increment').addClass('disabled-increment');

			$('#br-tr-field').addClass('disabled-field').prop('disabled', true);
			$('#br-br-field').addClass('disabled-field').prop('disabled', true);
			$('#br-bl-field').addClass('disabled-field').prop('disabled', true);
		} else {
			$('#br-tr-decrement').removeClass('disabled-decrement');
			$('#br-br-decrement').removeClass('disabled-decrement');
			$('#br-bl-decrement').removeClass('disabled-decrement');
			$('#br-tr-increment').removeClass('disabled-increment');
			$('#br-br-increment').removeClass('disabled-increment');
			$('#br-bl-increment').removeClass('disabled-increment');

			$('#br-tr-field').removeClass('disabled-field').prop('disabled', false);
			$('#br-br-field').removeClass('disabled-field').prop('disabled', false);
			$('#br-bl-field').removeClass('disabled-field').prop('disabled', false);
		}

		//update values
		$('#br-tr-field').val(borderRadius.topRight);
		$('#br-tl-field').val(borderRadius.topLeft);
		$('#br-br-field').val(borderRadius.bottomRight);
		$('#br-bl-field').val(borderRadius.bottomLeft);
		
		//update demo object
		$('#br-preview').css('border-radius', borderRadius.theCss());

		//update copy object
		output += 'border-radius: ' + borderRadius.theCss() + ';\r\n';
		$('#br-code').val(output);

		//check if linked
	});

	return borderRadius;
});

