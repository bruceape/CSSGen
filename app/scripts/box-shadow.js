define(['jquery','css-object', 'pubsub'], function($, CSSObject, PS) {
	'use strict';
	
	var boxShadow = new CSSObject('boxShadow', {
		inset: false,
		x: 0,
		y: 0,
		blur: 0,
		spread: 0,
		color: 'rgba(0,0,0,1)',
		theCss: function() {
			if (this.inset === false) {
				return this.x + 'px ' + this.y + 'px ' + this.blur + 'px ' + this.spread + 'px ' + this.color;
			} else if (this.inset === true) {
				return 'inset ' + this.x + 'px ' + this.y + 'px ' + this.blur + 'px ' + this.spread + 'px ' + this.color;
			}
		}
	});

	$('#bs-x-increment').on('mousedown', function(e) {
		e.preventDefault();
		boxShadow.increment('x');
	});
	$('#bs-y-increment').on('mousedown', function(e) {
		e.preventDefault();
		boxShadow.increment('y');
	});
	$('#bs-blur-increment').on('mousedown', function() {
		boxShadow.increment('blur');
	});
	$('#bs-spread-increment').on('mousedown', function() {
		boxShadow.increment('spread');
	});



	$('#bs-x-decrement').on('mousedown', function(e) {
		e.preventDefault();
		boxShadow.decrement('x');
	});
	$('#bs-y-decrement').on('mousedown', function(e) {
		e.preventDefault();
		boxShadow.decrement('y');
	});
	$('#bs-blur-decrement').on('mousedown', function(e) {
		e.preventDefault();
		boxShadow.decrement('blur');
	});
	$('#bs-spread-decrement').on('mousedown', function(e) {
		e.preventDefault();
		boxShadow.decrement('spread');
	});

	$('#bs-x-field').on('input', function() {
		boxShadow.set('x', $('#bs-x-field').val());
	});
	$('#bs-y-field').on('input', function() {
		boxShadow.set('y', $('#bs-y-field').val());
	});
	$('#bs-blur-field').on('input', function() {
		boxShadow.set('blur', $('#bs-blur-field').val());
	});
	$('#bs-spread-field').on('input', function() {
		boxShadow.set('spread', $('#bs-spread-field').val());
	});

	$('#bs-insettoggle').on('click', function() {
		boxShadow.toggleInset();
	});

	$('#bs-blur').on('change', function(){
		boxShadow.set('blur', $('#bs-blur').val());
	});

	$('#bs-spread').on('change', function(){
		boxShadow.set('spread', $('#bs-spread').val());
	});

	$('#bs-copy-button').on('mousedown', function(e) {
		e.preventDefault();
		$('.copy-field').trigger('click');
	});

	PS.subscribe('boxShadowChange', function() {
		var output = '/* This is the CSS we\'re working with! */ \r\n\r\n';

		//update values
		$('#bs-x-field').val(boxShadow.x);
		$('#bs-y-field').val(boxShadow.y);
		$('#bs-blur-field').val(boxShadow.blur);
		$('#bs-blur').val(boxShadow.blur);
		$('#bs-spread-field').val(boxShadow.spread);
		$('#bs-spread').val(boxShadow.spread);
		
		//update demo object
		$('#bs-preview').css('box-shadow', boxShadow.theCss());

		//update copy object
		output += '-webkit-box-shadow: ' + boxShadow.theCss() + ';\r\n';
		output += 'box-shadow: ' + boxShadow.theCss() + ';\r\n';
		$('#bs-code').val(output);
	});

	return boxShadow;
});
