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

	PS.subscribe('columnsChange', function() {
		var output = '/* This is the CSS we\'re working with! */ \r\n\r\n';

		//update values
		$('.field').val(function(){
			var currentDOM = $(this),
				object = currentDOM.data('cssObject'),
				property = currentDOM.data('cssProperty');
			return window[object][property];
		});
		
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
