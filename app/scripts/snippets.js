define(['jquery'], function($) {
	'use strict';

	$(document).ready(function(){

		$('.snippet-header').on('touchstart', function(e){
			e.preventDefault();
			$(this).next().slideToggle();
		});

		$('.snippet-header').on('click', function(){
			$(this).next().slideToggle();
		});

		$('.copy-link').on('click', function(){
			$(this).next().trigger('click');
		});
	});
});
