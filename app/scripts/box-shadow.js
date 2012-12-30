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

	PS.subscribe('boxShadowChange', function() {
		var output = '/* This is the CSS we\'re working with! */ \r\n\r\n';

		//update values
		$('.field, .slider').val(function(){
			var currentDOM = $(this),
				object = currentDOM.data('cssObject'),
				property = currentDOM.data('cssProperty');
			return window[object][property];
		});
		
		//update demo object
		$('#bs-preview').css('box-shadow', boxShadow.theCss());

		//update copy object
		output += '-webkit-box-shadow: ' + boxShadow.theCss() + ';\r\n';
		output += 'box-shadow: ' + boxShadow.theCss() + ';\r\n';
		$('#bs-code').val(output);
	});

	return boxShadow;
});
