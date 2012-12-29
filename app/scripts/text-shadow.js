define(['jquery','css-object', 'pubsub'], function($, CSSObject, PS) {
	'use strict';
	
	var textShadow = new CSSObject('textShadow', {
		x: 0,
		y: 0,
		blur: 0,
		color: 'rgba(0,0,0,1)',
		theCss: function() {
			return this.x + 'px ' + this.y + 'px ' + this.blur + 'px ' + this.color;
		}
	});

	$('#ts-x-increment').on('mousedown', function(e) {
		e.preventDefault();
		textShadow.increment('x');
	});
	$('#ts-y-increment').on('mousedown', function(e) {
		e.preventDefault();
		textShadow.increment('y');
	});
	$('#ts-blur-increment').on('mousedown', function(e) {
		e.preventDefault();
		textShadow.increment('blur');
	});


	$('#ts-x-decrement').on('mousedown', function(e) {
		e.preventDefault();
		textShadow.decrement('x');
	});
	$('#ts-y-decrement').on('mousedown', function(e) {
		e.preventDefault();
		textShadow.decrement('y');
	});
	$('#ts-blur-decrement').on('mousedown', function(e) {
		e.preventDefault();
		textShadow.decrement('blur');
	});

	$('#ts-x-field').on('input', function() {
		textShadow.set('x', $('#ts-x-field').val());
	});
	$('#ts-y-field').on('input', function() {
		textShadow.set('y', $('#ts-y-field').val());
	});
	$('#ts-blur-field').on('input', function() {
		textShadow.set('blur', $('#ts-blur-field').val());
	});

	$('#ts-blur').on('change', function(){
		textShadow.set('blur', $('#ts-blur').val());
	});

	$('#ts-copy-button').on('mousedown', function(e) {
		e.preventDefault();
		$('.copy-field').trigger('click');
	});

	PS.subscribe('textShadowChange', function() {
		var output = '/* This is the CSS we\'re working with! */ \r\n\r\n';

		//update values
		$('#ts-x-field').val(textShadow.x);
		$('#ts-y-field').val(textShadow.y);
		$('#ts-blur-field').val(textShadow.blur);
		
		//update demo object
		$('#ts-preview').css('text-shadow', textShadow.theCss());

		//update copy object
		output += 'text-shadow: ' + textShadow.theCss() + ';\r\n';
		$('#ts-code').val(output);
	});

	return textShadow;
});
