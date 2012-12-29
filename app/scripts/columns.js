define(['jquery','css-object', 'pubsub'], function($, CSSObject, PS) {
	'use strict';
	
	var columns =  new CSSObject('columns', {
		count: 0,
		gap: 0,
		// units: 'pixels',
		theCss: function(){
			var unit;
			unit = 'px';
			
			return {
				count: String(this.count),
				gap: this.gap + unit
			};
		}
	});

	$('#col-count-increment').on('mousedown', function(e) {
		e.preventDefault();
		columns.increment('count');
	});
	$('#col-count-decrement').on('mousedown', function(e) {
		e.preventDefault();
		columns.decrement('count');
	});

	$('#col-gap-increment').on('mousedown', function(e) {
		e.preventDefault();
		columns.increment('gap');
	});
	$('#col-gap-decrement').on('mousedown', function(e) {
		e.preventDefault();
		columns.decrement('gap');
	});

	$('#col-count-field').on('change', function() {
		columns.set('count', $('#col-count-field').val());
	});
	$('#col-gap-field').on('change', function() {
		columns.set('gap', $('#col-gap-field').val());
	});

	$('#col-copy-button').on('mousedown', function(e) {
		e.preventDefault();
		$('.copy-field').trigger('click');
	});

	PS.subscribe('columnsChange', function() {
		var output = '/* This is the CSS we\'re working with! */ \r\n\r\n';

		//update values
		$('#col-count-field').val(columns.count);
		$('#col-gap-field').val(columns.gap);
		
		//update demo columns
		$('#col-preview').css('column-gap', columns.theCss().gap);
		$('#col-preview').css('column-count', columns.theCss().count);

		//update copy object
		output += '-moz-column-count: ' + columns.theCss().count + ';\r\n';
		output += '-webkit-column-count: ' + columns.theCss().count + ';\r\n';
		output += 'column-count: ' + columns.theCss().count + ';\r\n';
		output += '-moz-column-gap: ' + columns.theCss().gap + ';\r\n';
		output += '-webkit-column-gap: ' + columns.theCss().gap + ';\r\n';
		output += 'column-gap: ' + columns.theCss().gap + ';\r\n';
		$('#col-code').val(output);
	});

	return columns;
});
