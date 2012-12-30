define(['jquery'], function($) {
	'use strict';

	$(document).ready(function(){
		$('.snippet-header').on('click', function(){
			$(this).next().slideToggle();
		});

		$('.copy-link').on('click', function(){
			$(this).next().trigger('click');
		});
	});
});
