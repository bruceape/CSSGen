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

	PS.subscribe('textShadowChange', function() {
		var output = '/* This is the CSS we\'re working with! */ \r\n\r\n';

		//update values
		$('.field').val(function(){
			var currentDOM = $(this),
				object = currentDOM.data('cssObject'),
				property = currentDOM.data('cssProperty');
			return window[object][property];
		});
		
		//update demo object
		$('#ts-preview').css('text-shadow', textShadow.theCss());

		//update copy object
		output += 'text-shadow: ' + textShadow.theCss() + ';\r\n';
		$('#ts-code').val(output);
	});

	return textShadow;
});
