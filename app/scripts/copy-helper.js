define(['jquery'], function($) {
	'use strict';

	$(document).ready(function(){
		function copyHelper() {
			$(this).select();
			var offset = $(this).offset();
			$('#copy-helper').html(function(){
				if (window.navigator.platform === 'MacIntel' || window.navigator.platform === 'MacPPC') {
					return '&#8984;+C to Copy';
				} else {
					return 'CTRL+C to Copy';
				}
			}).css({
				left: offset.left,
				top: offset.top
			}).clearQueue().stop().fadeIn().delay(1000).fadeOut(200);
		}

		$('.copy-text-field').on('click', copyHelper);
		$('.copy-field').on('click', copyHelper);
	});
});